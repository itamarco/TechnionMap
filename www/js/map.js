			// bounds of the desired area
			var allowedBounds = new google.maps.LatLngBounds(
			     new google.maps.LatLng( 32.778050, 35.020852 ), 
			     new google.maps.LatLng(32.776129, 35.024275)
			);
			
			var lastValidCenter;

			var markers = [];

			var minZoomLevel = 17;
			function initGmap(){


/////////////////////////////// YAKIR ////////////////////////////

			// 	var mapsEngineLayer = new google.maps.visualization.MapsEngineLayer({
			// 	  mapId: '08097405334273999136-05414812628978701557',
			// 	  layerKey: 'bldgs',
			// 	  map: map,
			// 	  clickable: true,
			// 	  suppressInfoWindows: false
			// 	});

			// 	var mapOptions = {
			// 	  center: new google.maps.LatLng(32.777522, 35.023138),
			// 	  zoom: 16
			// 	};
			// 	map = new google.maps.Map(document.getElementById('mapDiv'),
			// 	  mapOptions);

			// 	var mapsEngineLayer = new google.maps.visualization.MapsEngineLayer({
			// 	  mapId: '08097405334273999136-05414812628978701557',
			// 	  layerKey: 'bldgs',
			// 	  map: map,
			// 	  clickable: true,
			// 	  suppressInfoWindows: false
			// 	});
				
			// 	var styles = [
			// 	/*
			// 	 {
			// 		stylers: [
			// 		  { hue: "#00ffe6" },
			// 		  { saturation: -20 }
			// 		]
			// 	  },*/
			// 	  {
			// 		featureType: "all",
			// 		elementType: "labels",
			// 		stylers: [
			// 			{ visibility: "off" }
			// 		]
			// 	  }
			// 	];
			// 	map.setOptions({styles: styles});
			

			//////////////////////////////////////////// yakir 3 //////////////

			  
			var mapOptions = {
			  center: new google.maps.LatLng(32.777522, 35.023138),
			  zoom: minZoomLevel
			};
			map = new google.maps.Map(document.getElementById('map-canvas'),
			  mapOptions);
			

			
			// bounds of the desired area
			var allowedBounds = new google.maps.LatLngBounds(
				 new google.maps.LatLng(32.772064, 35.014585), 
				 new google.maps.LatLng(32.782861, 35.030342)
			); 
			//32.772064, 35.014585 bl
			//32.783826, 35.014371 tl 
			//32.782861, 35.030342 tr
			//32.772252, 35.030428 br 
			var boundLimits = {
				maxLat : allowedBounds.getNorthEast().lat(),
				maxLng : allowedBounds.getNorthEast().lng(),
				minLat : allowedBounds.getSouthWest().lat(),
				minLng : allowedBounds.getSouthWest().lng()
			};

			var lastValidCenter = map.getCenter();
			var newLat, newLng;
			google.maps.event.addListener(map, 'center_changed', function() {
				center = map.getCenter();
				if (allowedBounds.contains(center)) {
					// still within valid bounds, so save the last valid position
					lastValidCenter = map.getCenter();
					return;
				}
				newLat = lastValidCenter.lat();
				newLng = lastValidCenter.lng();
				if(center.lng() > boundLimits.minLng && center.lng() < boundLimits.maxLng){
					newLng = center.lng();
				}
				if(center.lat() > boundLimits.minLat && center.lat() < boundLimits.maxLat){
					newLat = center.lat();
				}
				map.panTo(new google.maps.LatLng(newLat, newLng));
			});

			 // Limit the zoom level
			 google.maps.event.addListener(map, 'zoom_changed', function () {
				 if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
			 });

			var mapsEngineLayer1 = new google.maps.visualization.MapsEngineLayer({
			  mapId: '08097405334273999136-05414812628978701557',
			  layerKey: 'kislak',
			  map: map,
			  clickable: false,
			  suppressInfoWindows: true
			});
			
			var mapsEngineLayer2 = new google.maps.visualization.MapsEngineLayer({
			  mapId: '08097405334273999136-05414812628978701557',
			  layerKey: 'replaceBldgs',
			  map: map,
			  clickable: false,
			  suppressInfoWindows: true
			});
			
			var mapsEngineLayer2 = new google.maps.visualization.MapsEngineLayer({
			  mapId: '08097405334273999136-05414812628978701557',
			  layerKey: 'replaceSportsCenter',
			  map: map,
			  clickable: false,
			  suppressInfoWindows: true
			});
			

			var mapsEngineLayer3 = new google.maps.visualization.MapsEngineLayer({
			  mapId: '08097405334273999136-05414812628978701557',
			  layerKey: 'faculties',
			  map: map,
			  clickable: true,
			  suppressInfoWindows: false
			});
			
			var mapsEngineLayer4 = new google.maps.visualization.MapsEngineLayer({
			  mapId: '08097405334273999136-05414812628978701557',
			  layerKey: 'locations',
			  map: map,
			  clickable: true,
			  suppressInfoWindows: false
			});	
				
			var styles =[
		    {
		        "featureType": "poi.school",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "landscape.man_made",
		        "elementType": "geometry.stroke",
		        "stylers": [
		            {
		                "color": "#46629e"
		            },
		            {
		                "weight": 1
		            }
		        ]
		    },
		    {
		        "featureType": "landscape.man_made",
		        "elementType": "geometry.fill",
		        "stylers": [
		            {
		                "invert_lightness": true
		            },
		            {
		                "hue": "#002bff"
		            },
		            {
		                "saturation": -50
		            },
		            {
		                "gamma": 6.49
		            }
		        ]
		    },
		    {
		        "elementType": "labels.text",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "poi.park",
		        "elementType": "labels.icon",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "poi.sports_complex",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "poi.business",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
			        ]
			    }
			];
			map.setOptions({styles: styles});
  	
		}

////////////////////////////////////////////////////////////////////////////
///////////////////////////     Extend       ///////////////////////////////
////////////////////////////////////////////////////////////////////////////

			google.maps.Map.prototype.addPerson = function(user){
				if(!user.isValid()){
					return;
				}

				var pos = user.loc;

				user.pic = "http://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/1024px-Smiley.svg.png";
				d(pos.lat);
				d(pos.lng);
				var marker = new google.maps.Marker({
				    position: pos,
				    title:user.name,
				    icon: {
						url: user.pic,
						scaledSize: {
							width: 50,
							height: 50
						}
					}
				});

				markers.push(marker);
				marker.addListener('click', function(){
					markerClick(user);
				});
				marker.setMap(this);
			}

			google.maps.Map.prototype.updateMarkers = function(){
				for (var i = 0; i < markers.length; i++) {
				    markers[i].setMap(null);
				}
				markers = [];


				this.addPerson(me);
				for(var i in activeFriends){
					map.addPerson(activeFriends[i]);
				}
			};


			function markerClick(user){
				alert(user.name);
			}

