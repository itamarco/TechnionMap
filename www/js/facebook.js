
//These are the notifications that are displayed to the user through pop-ups if the above JS files does not exist in the same directory-->

if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

FB.Event.subscribe('auth.login', function(response) {
                   alert('auth.login event');
                   });

FB.Event.subscribe('auth.logout', function(response) {
                   alert('auth.logout event');
                   });


var facebook = {
      init:function() {
            try {
                  FB.init({ appId: "381782658606958", nativeInterface: CDV.FB, useCachedDialogs: false });
                  log.info("facebook inited");
            } catch (e) {
                  alert(e);
            }
      },


      login: function() {
          FB.login(
                   function(response) {
                   if (response.session) {
                   alert('logged in');
                   } else {
                   alert('not logged in');
                   }
                   },
                   { scope: "email" }
                   );
      },

      getLoginStatus: function () {
                FB.getLoginStatus(function(response) {
                                  if (response.status == 'connected') {
                                  alert('logged in');
                                  } else {
                                  alert('not logged in');
                                  }
                                  });
      },
      me: function () {
        var friendIDs = [];
      var fdata;
          FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
                 if (response.error) {
                 alert(JSON.stringify(response.error));
                 } else {
                 var data = document.getElementById('data');
       fdata=response.data;
       log.info("fdata: "+fdata);
                 response.data.forEach(function(item) {
                                       var d = document.createElement('div');
                                       d.innerHTML = "<img src="+item.picture+"/>"+item.name;
                                       data.appendChild(d);
                                       });
                 }
    var friends = response.data;
    log.info(friends.length); 
    for (var k = 0; k < friends.length && k < 200; k++) {
          var friend = friends[k];
          var index = 1;

          friendIDs[k] = friend.id;
          //friendsInfo[k] = friend;
    }
    log.info("friendId's: "+friendIDs);
                 });
      }
};
            