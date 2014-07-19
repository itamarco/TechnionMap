//////////////////////////////////////////////////////
var db = require("./mongo");
Q = require('q');
//////////////////////////////////////////////////////

function getTimestamp(){
    return Math.floor(Date.now() / 1000);
}

exports.userLogin = function(user, callback){
    d(getTimestamp());
    db.find({userId: user.userId})
        .then(function(data){
            if(data === db.NO_DATA){
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



function d(txt){
	console.log(txt)
};