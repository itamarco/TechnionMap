var http = require("http");
var url = require( "url" );
var queryString = require( "querystring" );


http.createServer(function(request, response) {
	d("Got request");

	// parses the request url
	var theUrl = url.parse( request.url );
		
	// gets the query part of the URL and parses it creating an object
	d("Query: " + theUrl.query);
	var json = queryString.parse( theUrl.query );

	d("request json:");
	d(json);
	
	var res = {
		"a" : "ok",
		"userID" : "shkimzi"
	};
	d("response json:");
	d(res);
	response.setHeader('Content-Type', 'application/json');
	response.end(json.callback+'('+JSON.stringify(res)+')');
}).listen(8888);

function d(txt){
	console.log(txt)
};