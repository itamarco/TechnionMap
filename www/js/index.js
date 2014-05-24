
var app = {
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


var EventsBus =  {
    elem: "events-root",
    init: function(){
        this.elem = document.getElementById(elem);
        this.events['userLocationUpdate'] = new Event('userLocationUpdate');
        this.events['facebookLogedIn'] = new Event('facebookLogedIn');
    
    },
    events: {},
    trigger: function(eventName){
        this.elem.dispatchEvent(events.eventName); 
    },
    subscribe: function(eventName, callback){
        this.elem.addEventListener(eventName, callback ,false);
    }
};



var GeoLocation = {
    campus_lng: 35.2264997,
    campus_lat: 31.654524800000003,
    get : function() {
        log.info("fetching geolocation");
        navigator.geolocation.getCurrentPosition(this.onSuccsess, this.onError);
    },
    onSuccsess : function(pos) {
        /*
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + pos.coords.latitude              + '<br />' +
                            'Longitude: '          + pos.coords.longitude             + '<br />' +
                            'Altitude: '           + pos.coords.altitude              + '<br />' +
                            'Accuracy: '           + pos.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + pos.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + pos.coords.heading               + '<br />' +
                            'Speed: '              + pos.coords.speed                 + '<br />' +
                            'Timestamp: '          +                                   pos.timestamp          + '<br />';
                            
        */              
        //data with map 
            
            position.lng = pos.coords.longitude;
            position.lat = pos.coords.latitude;

            EventsBus.trigger('userLocationUpdate');
            log.info(position.lat);

            var text = "<div>Latitude: " + pos.coords.latitude + 
                        "<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" + 
                        "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
            $("#cur_position").html(text);
            
            initMap();
            
            // var mapwidth = $(window).width();//parseInt($('#map').css("width"), 10);  // remove 'px' from width value
            // var mapheight = 180;//parseInt($('#map').css("height"), 10);
            // //$('img#map').css('visibility','visible');
            // $('img#map').attr('src', "http://maps.googleapis.com/maps/api/staticmap?center=" + 
            //     pos.coords.latitude + "," + pos.coords.longitude + 
            //     "&zoom=13&size=" + mapwidth + "x" + mapheight + "&maptype=roadmap&markers=color:green%7C" +
            //     pos.coords.latitude + "," + pos.coords.longitude + "&sensor=false");

    },
    onError : function(error) {
        log.error('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
};

var server = {
    host: "127.0.0.1",
    responseJson: {},
    request: function(jsonRequest, callBack){
        //this.ajaxCall(jsonRequest,callBack);
        callBack(jsonRequest);
    },
    ajaxCall: function(jsonRequest, callBack){
        $.ajax({
           type: 'POST',
            url: this.host,
            data: jsonRequest, 
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'jsonp',
            jsonpCallback: 'jsonParser',
            success: callBack,
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    alert('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found. [404]');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error.\n' + jqXHR.responseText);
                }
            }
        });
    },

    getData: function(){

    }
};