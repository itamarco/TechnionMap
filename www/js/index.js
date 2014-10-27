
var App = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('menubutton', this.onMenuButton, false);
        // document.addEventListener('backbutton', this.onBackButton, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        log.info('Received Event: ' + id);
    },
    onMenuButton: function() {
        $.mobile.navigate( "#menu" );
        $("#my_name").html(me.name);
        $("#my_mood").html(me.mood);
        $("#my_pic").html("<img src='"+ me.pic + "' width=100 height=100 />");
    },
    onBackButton: function() {
        navigator.app.exitApp();
    }

};


// var EventsBus =  {
//     elem: "events-root",
//     init: function(){
//         this.elem = document.getElementById(this.elem);
//         this.events['userLocationUpdate'] = new Event('userLocationUpdate');
//         this.events['facebookLogedIn'] = new Event('facebookLogedIn');
    
//     },
//     events: [],
//     trigger: function(eventName){
//         this.elem.dispatchEvent(this.events[eventName]); 
//     },
//     subscribe: function(eventName, callback){
//         this.elem.addEventListener(eventName, callback ,false);
//     }
// };



var GeoLocation = {
    campus_lat: 32.777522,
    campus_lng: 35.023138,
    get : function() {
        log.info("fetching geolocation");
        navigator.geolocation.watchPosition(this.onSuccsess, this.onError);
        // navigator.geolocation.getCurrentPosition(this.onSuccsess, this.onError);
    },
    onSuccsess : function(pos) {
        /*
                'Latitude: '           + pos.coords.latitude              + '<br />' +
                'Longitude: '          + pos.coords.longitude             + '<br />' +
                'Altitude: '           + pos.coords.altitude              + '<br />' +
                'Accuracy: '           + pos.coords.accuracy              + '<br />' +
                'Altitude Accuracy: '  + pos.coords.altitudeAccuracy      + '<br />' +
                'Heading: '            + pos.coords.heading               + '<br />' +
                'Speed: '              + pos.coords.speed                 + '<br />' +
                'Timestamp: '          + pos.timestamp                    + '<br />';
        */                  
        
        //data with map 
            
            position.lng = pos.coords.longitude;
            position.lat = pos.coords.latitude;

            // EventsBus.trigger('userLocationUpdate');

            var text = "<div>Latitude: " + pos.coords.latitude + 
                        "<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" + 
                        "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
            $("#cur_position").html(text);
            if(typeof me !== 'undefined'){
                me.loc = position;
                map.updateMarkers();
                server.updateUser(me, function(res){
                            d("Location update sent. " + res.msg);
                        });
            }         
            
    },
    onError : function(error) {
        log.error('[GeoLocation] code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        delete me.loc;
    }
};


function Server(){
    this.ip = "nssl-dev.technion.ac.il";
    this.port ="80";
    this.status = "up";
    this.setHost = function(ip, port){
        this.ip = ip;
        this.port = port;
    };
    this.updateUser = function(user,callback){
        var data = new Object();
        data.userId = user.id;
        data.name = user.name;
        data.picUrl = user.pic;
        data.mood = user.mood;
        data.location = user.loc;
        data.locationArea = user.locArea;

        this.request("upsertUser",data,callback);
    };
    this.updateFriends = function(user,friendsList,callback){
        var data = new Object();
        data.userId = user.id;
        data.friends = friendsList;
        this.request("upsertUserFriends",data,callback);
    };
    this.getFriends = function(user,callback){
        var data = new Object();
        data.userId = user.id;
        
        this.request("getFriends",data,callback);
    };
    this.request = function(fn,data,callback){
        var json = new Object();
        json.fn = fn;
        json.data = data;
        // d("Request: " + JSON.stringify(json));
        this.ajaxCall(json,callback);
    };
    this.connectionError = function(){
        log.error("[Server] Can not connect to server");
    };
    
    this.ajaxCall = function(jsonRequest, callBack){
        $.ajax({
           type: 'POST',
            url: 'http://' + this.ip + ":" + this.port,
            data: {d: JSON.stringify(jsonRequest)}, 
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'jsonp',
            success: callBack,
            timeout: 5000,
            error: function(x, t, m) {
                if(t==="timeout") {
                    server.status = "up";
                    log.error("Server is down!");
                }
            }
        });
    };

    this.checkServer = function(){
        var jsonRequest = new Object();
        jsonRequest.fn = "upsertUser";
        jsonRequest.data = me;
        $.ajax({
           type: 'POST',
            url: 'http://' + this.ip + ":" + this.port,
            data: {d: JSON.stringify(jsonRequest)}, 
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'jsonp',
            success: null,
            timeout: 5000,
            error: function(x, t, m) {
                if(t==="timeout") {
                    navigator.notification.alert(
                    'Could not connect to server',
                    null,
                    'Failure',
                        'ok'
                    );
                }
            }
        });  
    };
};






// this.set = function(property, value){
    //     var jsonRequest = {
    //         method: "set",
    //         userId: this.userId,
    //         property: property,
    //         value: value
    //     }
    //     this.ajaxCall(jsonRequest, function(res){
    //         d(res);
    //     });
    // };
    // this.get = function(property, callBack){
    //     var jsonRequest = {
    //         method: "POST",
    //         userId: this.userId,
    //         property: property
    //     }

    //     this.ajaxCall(jsonRequest, function(res){
    //         d(res);
    //     });

    //     respone = {
    //         status:"success",
    //         data: [
    //             {id: 698687482, loc: {lat: position.lat - 0.0012, lng: position.lng - 0.002}},
    //             {id: 554861654, loc: {lat: position.lat - 0.0002, lng: position.lng + 0.002}},
    //             {id: 749873231, loc:{lat: position.lat - 0.0004, lng: position.lng + 0.008}}
    //         ]
    //     };
    //     callBack(respone);
    // };