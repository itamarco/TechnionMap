var mongojs = require("mongojs");
Q = require('q');
/////////////////////////////////////////////////////////
var mongoUrl = "nodejs:technionMap@localhost:27017/";
var dbName = "users";
var Collections = ["users"];
/////////////////////////////////////////////////////////
var db = mongojs.connect(mongoUrl + dbName, Collections);
/////////////////////////////////////////////////////////

exports.find = function(token){
    var dfd = Q.defer();
    db.users.find(token, function(err, data) {
            if( err ){
                   dfd.reject("error");
            } else if (!data || data.length === 0){
                   dfd.resolve("No data found");	
            } 
            else {
                dfd.resolve(data);
            }
    });
    return dfd.promise;
};


exports.insert = function(data){
    db.users.insert(data);
};

exports.update = function(condition, data){
    db.users.update(
        condition,
        data,
        { upsert: true } // insert of not exist
      );
};

exports.multiUpdate = function(condition, data){
    db.users.update(
        condition,
        data,
        {   
            upsert: true,
            multi: true 
        }
      );
}

exports.k = function(p){
	for (i=0;i<100000000;i++){
		if(i == 99999999){
			return p;
		}
	}
}



exports.asyn = function (s) {
  var deferred = Q.defer();
  d("in async");
  setTimeout(function() {
    deferred.resolve(s+1);
  }, 2000);

  return deferred.promise;
}

exports.remove = function(query){
    db.users.remove(query);
}
function d(txt){
	console.log(txt)
};








//exports.find_n_response = function(token, responser){
//	db.users.find(token, function(err, data) {
//		if( err ){
//			responser.sendJson("error");
//		} else if (!data){
//			responser.sendJson("No data found");	
//		} 
//		else {
//			responser.sendJson(data);
//		}
//	});
//};