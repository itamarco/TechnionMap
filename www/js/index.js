
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

var geoLocation = {
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
            var text = "<div>Latitude: " + pos.coords.latitude + 
                        "<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" + 
                        "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
            $("#cur_position").html(text);
            console.log(text);
            
            var mapwidth = $(window).width();//parseInt($('#map').css("width"), 10);  // remove 'px' from width value
            var mapheight = 180;//parseInt($('#map').css("height"), 10);
            //$('img#map').css('visibility','visible');
            $('img#map').attr('src', "http://maps.googleapis.com/maps/api/staticmap?center=" + 
                pos.coords.latitude + "," + pos.coords.longitude + 
                "&zoom=13&size=" + mapwidth + "x" + mapheight + "&maptype=roadmap&markers=color:green%7C" +
                pos.coords.latitude + "," + pos.coords.longitude + "&sensor=false");

    },
    onError : function(error) {
        $("#cur_position").html('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
};