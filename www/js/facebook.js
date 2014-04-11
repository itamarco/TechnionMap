
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
                  // FB.init({ appId: "381782658606958", nativeInterface: CDV.FB, useCachedDialogs: false });
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
      }
};
            