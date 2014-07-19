var http = require("http");
var url = require( "url" );
var queryString = require( "querystring" );
var dao = require("./userDao.js");

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
    
    d("Got request " + reqNumber++);

    // parses the request url
    var theUrl = url.parse( request.url );

    // gets the query part of the URL and parses it creating an object
    var requestJson = queryString.parse( theUrl.query );

    var responser = new Responser(response, requestJson.callback)


    var u1 = {
            userId: 1122,
            picUrl: "No pic baby",
            location : {
                    lat: 000,
                    lng: 321
            },
            lastUpdate: 146,
            friends: []
    };
    
    var u2 = {
        userId: '1008',
        picUrl: 'facebook pic url',
        location : {
                lat: 12,
                lng: 14
        },
        lastUpdate: 78092,
        friends: []
    }
    dao.userLogin(u1, function(data){
        responser.sendJson(data);
    });
//    dao.asyn(1).
//        then(dao.asyn).
//        then(function(dd){
//            if (dd == 4){
//                return dao.asyn(dd+5);
//            } else {
//                return 12;
//            }
//        }).
//        then(function(data){
//            d(data);
//            d("after data");
//            responser.sendJson(data);
//        }).
//            catch(function(data){responser.sendJson("ERROR")}).done();

    var res = {
            "a" : "ok",
            "userID" : "shkimzi"
    };
    //responser.sendJson(res);


}).listen(8888);



function d(txt){
	console.log(txt)
};