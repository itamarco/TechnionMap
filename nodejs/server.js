var http = require("http");
var url = require( "url" );
var queryString = require( "querystring" );
var dao = require("./mongo.js");
Q = require('q');


var reqNumber = 1;
var Responser = function(responseObj, wrapper){
		this.response = responseObj;
		this.wrapper = wrapper;
		this.sendJson = function(json){
			this.response.setHeader('Content-Type', 'application/json');
			this.response.end(wrapper+'('+JSON.stringify(json)+')');
		};
};

http.createServer(function(request, response) {
    
//    var dfd = jQuery.Deferred();
//    function callback(data){
//        dfd.resolve(data);
//    }
//    
//    function resp(data){
//        response.setHeader('Content-Type', 'application/json');
//	response.end(wrapper+'('+JSON.stringify(data)+')');
//    }
//    
//    $.when(dfd).then(resp);






    dao.insert("a","b");
    d("Got request " + reqNumber++);

    // parses the request url
    var theUrl = url.parse( request.url );

    // gets the query part of the URL and parses it creating an object
    var requestJson = queryString.parse( theUrl.query );

    var responser = new Responser(response, requestJson.callback)

//    Q.nfcall(dao.find, {}, "a", responser)
//    .then(function(data) {      
//        d(data);
//        dao.find({},"b",resopnser);
//       
//    }).then(function(data) {      
//        d(data);
//        dao.find({},"c",resopnser);
//       
//       
//    })
//    .fail(function(err) {
//        console.error('Error received:', err);
//    })
//    .done();
    dao.doSomethingAsync("aa").then(function(data){
        d(data);
        d("after data");
        responser.sendJson("the end!");
    });
    d("the end");
    
    
    
//    dao.find_n_response({},responser);
    var res = {
            "a" : "ok",
            "userID" : "shkimzi"
    };
    //responser.sendJson(res);


}).listen(8888);



function d(txt){
	console.log(txt)
};