var http = require("http"),
	url = require( "url" ),
    fs = require('fs'),
	queryString = require( "querystring" ),
	router = require('router');
var techDB = require('mongoDB-native-TechnionMap');

var msecToUTC = 3*3600000;
var httpListenPort = 3000;
var sockets= [];
var debugMode = false;
var adminPass = "1122";
var listeningFlag = false;
var shutdownFlag = false;

/***AUX. FUNCTIONS***/

function pr(txt){
	console.log(txt)
};

function formatDate() {
  var now = new Date();
  var d = new Date(now.getTime()+msecToUTC);
  var dd = d.getUTCDate();
  if ( dd < 10 ) dd = '0' + dd;
  var mm = d.getUTCMonth()+1;
  if ( mm < 10 ) mm = '0' + mm;
  var yy = d.getUTCFullYear() % 100;
  if ( yy < 10 ) yy = '0' + yy;
  var hh = d.getUTCHours();
  if ( hh < 10 ) hh = '0' + hh;
  var nn = d.getUTCMinutes();
  if ( nn < 10 ) nn = '0' + nn;
  var ss = d.getUTCSeconds();
  if ( ss < 10 ) ss = '0' + ss;
  return dd+'.'+mm+'.'+yy+'-'+hh+':'+nn+':'+ss
}

function concatColonArray(array){
	var outStr="";
	for (i = 0; i < array.length; i++){
		outStr=outStr.concat(array[i],":");
	}
	return outStr.substring(0,outStr.length-1);
}

var Responser = function(responseObj, wrapper){
		this.response = responseObj;
		this.wrapper = wrapper;
		this.sendJson = function(json){
			this.response.setHeader('Content-Type', 'application/json');
			this.response.end(wrapper+'('+JSON.stringify(json)+')');
		};
};

function errHandler(error){
	switch(error.msg){
		case "couldntSpawn":
			pr('Node.js: '+formatDate()+": Dameon couldn't be spawned. Terminating server.");
			sigintFunctionNODB();
		break;
		case "dameonClosed":
			if (!shutdownFlag){
				pr('Node.js: '+formatDate()+': Dameon exited. Terminating server.');
				sigintFunctionNODB();			
			}
		break;
		case "dameonNeedsRepair":
			pr('Node.js: '+formatDate()+': Attempt to repair by running: node app repair ');
			sigintFunctionNODB();
		break;
		case "couldntListen":
			pr('Node.js: '+formatDate()+": Couldn't listen on port "+httpListenPort+". Terminating server.");
			sigintFunction();
		break;
		case "couldntConnect":
			if (!shutdownFlag){
				pr("Node.js: "+formatDate()+": "+concatColonArray(error.data));
				pr("Node.js: "+formatDate()+": Couldn't Connect to MongoDB. Check DB path on launch. Exiting...");
				sigintFunction();
			}
		break;
		case "couldntUpdate":
			pr("Node.js: "+formatDate()+": Couldn't update: "+concatColonArray(error.data));
		break;
		case "couldntSearch":
			pr("Node.js: "+formatDate()+": Couldn't search: "+concatColonArray(error.data));
		break;
		case "couldntDelete":
			pr("Node.js: "+formatDate()+": Couldn't delete: "+concatColonArray(error.data));
		break;
		case "couldntReset":
			pr("Node.js: "+formatDate()+': '+concatColonArray(error.data));
			pr("Node.js: "+formatDate()+": Couldn't reset DB. Attempt manually. Exiting...");
			sigintFunction();
		break;	
	}
};
//initializing mongoDB daemon and connection using command-line arguments
function initDB (cb){
	//DON'T USE nodemon (or other script monitor) to launch app as it hide launch arguments
	//interfering with this switch and the connection string	
	var argVarray= [];
	if (process.argv[process.argv.length-1] == 'repair') {
		techDB.mongoRepair();
	}else{ 
		if (process.argv[process.argv.length-1] == 'debug') {
			argVarray = process.argv.slice(2,process.argv.length-1);
			debugMode = true;
			techDB.debugMode=true;
			pr("**** DEBUG MODE ACTIVE ****");
		}
		else argVarray = process.argv.slice(2,process.argv.length);
		techDB.init(argVarray,errHandler,cb);
		}
};

/***ROUTES***/
var route = router();
//Simple html for promoted user and Admin. use
route.get('/Utility', function(request, response) {
	pr('Node.js: '+formatDate()+": Utility access by IP: "+request.connection.remoteAddress);
	fs.readFile('./views/utility.html',function(error,data){ 
		if (error) pr('Node.js: '+formatDate()+": Can't read Utility HTML: "+error);
		else { response.writeHead(200, {"Content-Type": "text/html"});
			   response.end(data); 
		}
	});
});

//core functionally of TechnionMap server
route.get('/', function(request, response) {
	// parses the request url to get query data (parse again) (1)
	//create callback object to override same-origin limitations (2)
	// handle the requested action/data
	var theUrl,req,responser;
	var reqJson = { fn: 'unparsed'}; //initial value to avoid switch-case failure
	try { //parsing exceptions from various sources
		theUrl = url.parse( request.url ); //1
		req = queryString.parse( theUrl.query );
		responser = new Responser(response, req.callback)
		reqJson = JSON.parse(req.d);
	} catch (e){
		pr('Node.js: '+formatDate()+ ': ERROR: '+e);
		pr('Node.js: '+formatDate()+ ': parsing error by ip '+request.connection.remoteAddress);
		response.writeHead(406,{"Content-Type": "text/html"}); // HTTP error code for "Not Acceptable"
		response.end('Parsing Error');
	}
	switch(reqJson.fn){
		case 'isUp':	
			responser.sendJson({status:"ok"});
		break;
		case 'upsertUser':	
			pr('Node.js: '+formatDate()+ ': login by user '+reqJson.data.userId);
			techDB.upsertUser(reqJson.data, function(err,result){
				if (err) {
					errHandler(err);
					responser.sendJson(err);
				}else responser.sendJson(result);
			});
		break;
		case 'upsertUserFriends':	
			pr('Node.js: '+formatDate()+ ': update friends by user '+reqJson.data.userId);
			techDB.upsertUserFriends(reqJson.data, function(err,result){
				if (err) {
					errHandler(err);
					responser.sendJson(err);
				}else {
					if (debugMode) pr(reqJson.data.userId+' found '+result.data.length+ ' friends');
					responser.sendJson(result);
					}
			});
		break;
		case 'getFriends':  
			pr('Node.js: '+formatDate()+ ': get friends by user '+reqJson.data.userId);
			techDB.getFriends(reqJson.data, function(err,result){
				if (err) {
					errHandler(err);
					responser.sendJson(err);
				}else{
					if (debugMode) pr(reqJson.data.userId+' found '+result.data.length+ ' friends');
					responser.sendJson(result);
					}
			});
		break;
		case 'upsertPromoted': 
			pr('Node.js: '+formatDate()+ ': promoted login by '+reqJson.data.userId);
			techDB.upsertPromoted(reqJson.data, function(err,result){
				if (err) {
					errHandler(err);
					responser.sendJson(err);
				}else responser.sendJson(result);
			});
		break;
		case 'deleteUser':
			if (reqJson.data.pass == adminPass) {
			pr('Node.js: '+formatDate()+ ': delete by '+request.connection.remoteAddress);
			techDB.deleteUser(reqJson.data, function(err,result){
				if (err) {
					errHandler(err);
					responser.sendJson(err);
				}else responser.sendJson(result);
			});
			}else responser.sendJson({status: "OK", msg: "wrong admin password"});
		break;
		case 'getAllUsers':	
			if (reqJson.data.pass == adminPass) {
			pr('Node.js: '+formatDate()+ ': all users query by '+request.connection.remoteAddress);
			techDB.getAllUsers(function(err,result){
				if (err) {
					errHandler(err);
					responser.sendJson(err);
				}else responser.sendJson(result);
			});
			}else responser.sendJson({status: "OK", msg: "wrong admin password"});
		break;
		case 'getAllPromUsers':
			if (reqJson.data.pass == adminPass) {
			pr('Node.js: '+formatDate()+ ': all promoted users query by '+request.connection.remoteAddress);
			techDB.getAllPromUsers(function(err,result){
				if (err) {
					errHandler(err);
					responser.sendJson(err);
				}else responser.sendJson(result);
			});
			}else responser.sendJson({status: "OK", msg: "wrong admin password"});
		break;
		case 'getUser':
			if (reqJson.data.pass == adminPass) {
			pr('Node.js: '+formatDate()+ ':  user query by '+request.connection.remoteAddress);
			techDB.getUser(reqJson.data, function(err,result){
				if (err) {
					errHandler(err);
					responser.sendJson(err);
				}else responser.sendJson(result);
			});
			}else responser.sendJson({status: "OK", msg: "wrong admin password"});
		break;
		case 'resetDB':	
			if (reqJson.data.pass == adminPass) {
			pr('Node.js: '+formatDate()+ ': db reset by '+request.connection.remoteAddress);
			techDB.resetDB(function(err,result){
				if (err) {
					errHandler(err);
					responser.sendJson(err);
				}else responser.sendJson(result);
			});
			}else responser.sendJson({status: "OK", msg: "wrong admin password"});
		break;					   
	};
});

//catch all other routes
route.get(function(request, response) {
	// called if no other get route matched
	response.writeHead(404,{"Content-Type": "text/html"});
	response.end('Page Not Found');
});

/***SERVER CONFIG***/
var server = http.createServer(route);

//socket handling for clear exit on server close
server.on('connection', function(socket) {
  sockets.push(socket);
});

server.on('close',function (){
		pr('Node.js: '+formatDate()+': ****** Shutting down server on port '+httpListenPort+' ******');
		listeningFlag=false;
	});
	
server.on('listening',function (){
		pr('Node.js: '+formatDate()+": Server ready on port "+httpListenPort);
		listeningFlag=true;
	});

function socketsDestroy(callback){
	if (debugMode) {pr("number of sockets open: " + sockets.length);}
	sockets.forEach(function(socket) {
		socket.destroy();
	  });
	 callback();
}

/***APP CONFIG***/
//handle process exit gracefully by close http server and mongoDB daemon
process.on('SIGINT', function() {
	pr('Node.js: '+formatDate()+': ****** Closing App ******');
	pr("SIGNL LISTENER");
	shutdownFlag=true;
	techDB.killDaemon(function(){
		if (listeningFlag) {
			socketsDestroy(function (){
					server.close();
					});
		}
	});
});
//sending 'SIGINT' to process causes unconditional exit. function meant to gracefully end process
function sigintFunction(){
	pr('Node.js: '+formatDate()+': ****** Closing App ******');
	pr("SIGNL FUNCTION");
	shutdownFlag=true;
	techDB.killDaemon(function(){
		if (listeningFlag) {
			socketsDestroy(function (){
					server.close();
					});
		}
	});
}
//same as above without handling daemon
function sigintFunctionNODB(){
	pr('Node.js: '+formatDate()+': ****** Closing App ******');
	shutdownFlag=true;
	if (listeningFlag) {
		socketsDestroy(function (){server.close()});
	}
}
		
/***EXECUTION***/
initDB(function() {	
		server.listen(httpListenPort,function (err){
			if (err) errHandler({status:"Failed", msg:"couldntListen",data:[]});
		});
});

