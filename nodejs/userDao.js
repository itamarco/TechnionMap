var mongojs = require("./mongo")
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////


exports.userLogin = function(user, callback){
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