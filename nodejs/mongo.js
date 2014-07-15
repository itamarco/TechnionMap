var mongojs = require("mongojs");
Q = require('q');
/////////////////////////////////////////////////////////
var mongoUrl = "nodejs:technionMap@localhost:27017/";
var dbName = "users";
var Collections = ["users"];
/////////////////////////////////////////////////////////
var db = mongojs.connect(mongoUrl + dbName, Collections);
/////////////////////////////////////////////////////////



exports.find = function(token, callback){
    var dfd = Q.deffered();
    db.users.find(token, function(err, data) {
            if( err ){
                    dfd.reject("error");
            } else if (!data){
                    dfd.reject("No data found");	
            } 
            else {
                dfd.response(data);
            }
    });
    return dfd.promise;
};

exports.find_n_response = function(token, responser){
	db.users.find(token, function(err, data) {
		if( err ){
			responser.sendJson("error");
		} else if (!data){
			responser.sendJson("No data found");	
		} 
		else {
			responser.sendJson(data);
		}
	});
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



exports.doSomethingAsync = function (s) {
  var deferred = Q.defer();

  setTimeout(function() {
    deferred.resolve(s);
  }, 2000);

  return deferred.promise;
}

function d(txt){
	console.log(txt)
};