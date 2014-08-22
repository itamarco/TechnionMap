//////////////////////////////////////////////////////
var db = require("./mongo");
Q = require('q');
//////////////////////////////////////////////////////

function getTimestamp(){
    return Math.floor(Date.now() / 1000);
}

exports.userLogin = function(user, callback){
    db.find({userId: user.userId})
        .then(function(data){
            d(data);
            if(data === "No data found"){
                return db.insert(user);
            } else {
                return db.update(
                            {userId: user.userId},
                            {$set:
                               {location: user.location,
                                lastUpdate: getTimestamp()}}
                        );
            }
        })
//        .then()
        .then(function(data){callback("DB: User updated")})
        .catch(function(err){callback(err)})
        .done();
};

exports.updateFriendsList = function(friendsData, callback){
//  friendsData = {
//      userId: 1002,
//      list:[
//        10,12,14,16  
//      ]
//  };
  
  var uid = friendsData.userId;
  var friends = friendsData.list;
  
  db.update({"userId":uid}, {$pushAll:{"friends":friends}});
  
  callback('OK');
};

exports.findAll = function(callback){
    db.find({})
        .then(function(data){
            callback(data);
        });
}

exports.deleteAll = function(callback){
    db.remove({});
    callback("All records removed");
}
function d(txt){
	console.log(txt)
};