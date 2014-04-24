
//These are the notifications that are displayed to the user through pop-ups if the above JS files does not exist in the same directory-->

if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) log.error('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') log.error('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') log.error('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

// FB.Event.subscribe('auth.login', function(response) {
// 										alert('auth.login event');
// 									 });

// FB.Event.subscribe('auth.logout', function(response) {
// 									 	alert('auth.logout event');
// 									 });


var facebook = {
	init:function() {
			try {
				FB.init({ appId: "381782658606958", nativeInterface: CDV.FB, useCachedDialogs: false });
				log.info("facebook inited");
			} catch (e) {
				log.error(e);
			}
	},


	login: function() {
			FB.login(
				function(response) {
					if (response.session) {
				 		log.info('logged to facebook');
					} 
					else {
						log.error('facebook login failed');
					}
				 },
				 { scope: "email" }
				 );
	},

	getLoginStatus: function () {
		FB.getLoginStatus(function(response) {
						if (response.status == 'connected') {
							alert('logged in');
						} 
						else {
							alert('not logged in');
						}
					});
	},
	
	friends: function () {
		alert("frieds");
		var friendIDs = [];
		var fdata;
			FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
						 if (response.error) {
						 	log.error(JSON.stringify(response.error));
						 }
						 else {
						 	var data = document.getElementById('data');
							var friends = response.data;
						 	response.data.forEach(function(item) {
						 			friendIDs.push(item.id)
									 // var d = document.createElement('div');
									 // d.innerHTML = "<img src="+item.picture+"/>"+item.name;
									 // data.appendChild(d);
									 });
						 }
			});
		return friendIDs;
	}
};
						