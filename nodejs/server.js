var http = require("http");
var url = require( "url" );
var queryString = require( "querystring" );
var dao = require("./dao.js");


http.createServer(function(request, response) {

	dao.find({}, function(data){
		data.forEach( function(user){
			d(user.name);
		});
	});

	d("Got request");

	// parses the request url
	var theUrl = url.parse( request.url );
		
	// gets the query part of the URL and parses it creating an object
	var json = queryString.parse( theUrl.query );
	
	
	var res = {
		"a" : "ok",
		"userID" : "shkimzi"
	};
	
	response.setHeader('Content-Type', 'application/json');
	response.end(json.callback+'('+JSON.stringify(res)+')');
}).listen(8888);

function d(txt){
	console.log(txt)
};