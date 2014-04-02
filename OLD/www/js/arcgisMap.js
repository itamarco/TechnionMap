 dojo.require("dijit.layout.BorderContainer");
      dojo.require("dijit.layout.ContentPane");
      dojo.require("esri.map");
      
      var map;
      
      function init() {
        map = new esri.Map("map",{
          basemap: "streets",
          center: [35.02249459272264, 32.77721395756172],// long, lat
          zoom: 18
        });
        

        dojo.connect(map, "onLoad", function(map) {
          //Add running route graphics once the map loads
          drawRoute();
          navigator.geolocation.getCurrentPosition(zoomToMyLocation, locationError);
          navigator.geolocation.watchPosition(myLocation, locationError);
        });

        dojo.connect(map, "onLoad", function() {
          dojo.connect(map.graphics, "onClick", function(e) {
            console.log("clicked a graphic: ", e.graphic, e.graphic.attributes.id);
          });
        });

        dojo.connect(map, "onLoad", function() {
          dojo.connect(map, "onClick", function(e) {
            console.log(e.mapPoint.getLongitude()+", "+e.mapPoint.getLatitude()+"<br/>");
          });
        });

        
      }


      function myLocation(location){
        var symbol = new esri.symbol.PictureMarkerSymbol("img/marker.png",32,32);
        var myPoint = new esri.geometry.Point(location.coords.longitude, location.coords.latitude);
        var graphic = new esri.Graphic(myPoint,symbol);
        map.graphics.add(graphic);

      }

      function zoomToMyLocation(location) {
        var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(location.coords.longitude, location.coords.latitude));    
        map.centerAndZoom(pt, 16);
      }

      function locationError(error) {
        switch (error.code) {
        case error.PERMISSION_DENIED:
          log.error("Location not provided");
          break;

        case error.POSITION_UNAVAILABLE:
          log.error("Current location not available");
          break;

        case error.TIMEOUT:
          log.error("Timeout");
          break;

        default:
          log.error("unknown error");
          break;
        }

      }

      function drawRoute() {
        /*
        var startSymbol = new esri.symbol.PictureMarkerSymbol("marker.png",32,32);
        var stopSymbol = new esri.symbol.PictureMarkerSymbol("marker.png",32,32);
        var infoSymbol = new esri.symbol.PictureMarkerSymbol("marker.png",32,32);
       
     
        //add a graphic for the running route start and stop locations
        var startPoint = new esri.geometry.Point(34.983333, 32.816667);       
        var stopPoint = new esri.geometry.Point(34.973333, 32.817667);             
        
        var attrib1 = {"id": "pic1"};
        var attrib2 = {"id": "pic2"};
        var pic1 = new esri.Graphic(startPoint,startSymbol,attrib1);
        var pic2 = new esri.Graphic(stopPoint,stopSymbol, attrib2);
        map.graphics.add(pic1);
        map.graphics.add(pic2);

        map.infoWindow.resize(110, 100);
        */
      };

      dojo.ready(init);