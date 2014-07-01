var mongojs = require("mongojs")
//////////////////////////////////////////////////////
var mongoUrl = "nodejs:technionMap@localhost:27017/";
var dbName = "users";
var Collections = ["users"];
//////////////////////////////////////////////////////

var db = mongojs.connect(mongoUrl + dbName, Collections);

function find(token, callback){
	db.users.find(token, function(err, data) {
		if( err || !data){
			d("No data found");	
		} 
		else {
			callback(data);
		}
	});
};



function d(txt){
	console.log(txt)
};