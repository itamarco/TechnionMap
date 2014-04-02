/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        log.status('app initiated');
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('offline', network.offlineEvent , false);
        document.addEventListener('online', network.onlineEvent , false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //geoLocation.get();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

var geoLocation = {
    get : function() {
        log.status("fetching geolocation");
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

var log = {
    logSelector : "#logData",
    
    status: function(text) {
        $(this.logSelector).append(text+"<br>");
    },
    error: function(text) {
        $(this.logSelector).append("Error: "+text+"<br>");
    },
    warning: function(text) {
        $(this.logSelector).append("Warning: "+text+"<br>");
    }
};

var debug= {
    logSelector : "#debug",
    
    status: function(text) {
        $(this.logSelector).append(text+"<br>");
    },
    error: function(text) {
        $(this.logSelector).append("Error: "+text+"<br>");
    },
    warning: function(text) {
        $(this.logSelector).append("Warning: "+text+"<br>");
    }
};

var network = {
    status : "offline",
    onlineEvent : function() {
        log.status("online");
        status = "online";
    },
    offlineEvent : function() {
        log.status("offline");
        status = "offline";
    },
    login: function(){
        log.status('Connection status: ' + status); 
        if(status == "online")
            $.mobile.changePage("#welcome");
        else
            $( "#noNetwork" ).popup( "open" );
    }
};

