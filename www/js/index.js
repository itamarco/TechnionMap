
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
    campus_lng: 35.2264997,
    campus_lat: 31.654524800000003,
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
                server.set({location: position});
            }         
            
    },
    onError : function(error) {
        log.error('[GeoLocation] code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        delete me.loc;
    }
};

function Server(userId){
    this.userId = userId;
    this.host = "http://localhost:8888";

    this.setHost = function(host){
        this.host = host;
    };
    this.set = function(property, value){
        var jsonRequest = {
            method: "set",
            userId: this.userId,
            property: property,
            value: value
        }
        this.ajaxCall(jsonRequest, function(res){
            d(res);
        });
    };
    this.get = function(property, callBack){
        var jsonRequest = {
            method: "POST",
            userId: this.userId,
            property: property
        }

        this.ajaxCall(jsonRequest, function(res){
            d(res);
        });

        respone = {
            status:"success",
            data: [
                {id: 698687482, loc: {lat: position.lat - 0.0012, lng: position.lng - 0.002}},
                {id: 554861654, loc: {lat: position.lat - 0.0002, lng: position.lng + 0.002}},
                {id: 749873231, loc:{lat: position.lat - 0.0004, lng: position.lng + 0.008}}
            ]
        };
        callBack(respone);
    };
    this.connectionError = function(){
        log.error("[Server] Can not connect to server");
    };
    
    this.ajaxCall = function(jsonRequest, callBack){
        $.ajax({
           type: 'POST',
            url: this.host,
            data: jsonRequest, 
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'jsonp',
            success: callBack,
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    d('Not connect. Verify Network.');
                } else if (jqXHR.status == 404) {
                    d('Requested page not found. [404]');
                } else if (jqXHR.status == 500) {
                    d('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    d('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    d('Time out error.');
                } else if (exception === 'abort') {
                    d('Ajax request aborted.');
                } else {
                    d('Uncaught Error.\n' + jqXHR.responseText);
                }
            }
        });
    };
};