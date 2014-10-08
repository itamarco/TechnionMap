			// bounds of the desired area
			var allowedBounds = new google.maps.LatLngBounds(
			     new google.maps.LatLng( 32.778050, 35.020852 ), 
			     new google.maps.LatLng(32.776129, 35.024275)
			);
			
			var lastValidCenter;


			var minZoomLevel = 17;
			function initGmap(){



				// map = new GMaps({
				// 	el: '#mapDiv',
				// 	lat: position.lat,
				// 	lng: position.lng,
				// 	zoom:16
				// });

				// var swNew = new google.maps.LatLng( 32.775569, 35.020059 );
				// var neNew = new google.maps.LatLng(32.780134, 35.027484);
				// var boundsNew = new google.maps.LatLngBounds( swNew, neNew );

				// map.fitBounds( boundsNew ); 
				// lastValidCenter = map.getCenter();

				// google.maps.event.addListener(map, 'center_changed', function() {
				// 	d("center");
				//     if (allowedBounds.contains(map.getCenter())) {
				//         // still within valid bounds, so save the last valid position
				//         lastValidCenter = map.getCenter();
				//         return; 
				//     }

				//     // not valid anymore => return to last valid position
				//     map.panTo(lastValidCenter);
				// });
				
		

/////////////////////////////   goggle map //////////////////////////////////


				// var ulman = new google.maps.LatLng(32.777522, 35.023138);

				// var mapOptions = {
				// zoom: 16,
				// center: ulman
				// };	

				// map = new google.maps.Map(document.getElementById('mapDiv'),
				//   mapOptions);				





			
				// var swNew = new google.maps.LatLng( 32.772556, 35.014608 );
				// var neNew = new google.maps.LatLng( 32.781748, 35.029956 );
				// var campusBounds = new google.maps.LatLngBounds( swNew, neNew );

				// var campusOverlay = new google.maps.GroundOverlay(
				// 	'img/campusMap.png',
				// 	campusBounds);

				// campusOverlay.setMap(map);









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
	
	var mapsEngineLayer3 = new google.maps.visualization.MapsEngineLayer({
	  mapId: '08097405334273999136-05414812628978701557',
	  layerKey: 'kislak',
	  map: map,
	  clickable: true,
	  suppressInfoWindows: false
	});
	
	var mapsEngineLayer4 = new google.maps.visualization.MapsEngineLayer({
	  mapId: '08097405334273999136-05414812628978701557',
	  layerKey: 'replaceBldgs',
	  map: map,
	  clickable: true,
	  suppressInfoWindows: false
	});

	var mapsEngineLayer1 = new google.maps.visualization.MapsEngineLayer({
	  mapId: '08097405334273999136-05414812628978701557',
	  layerKey: 'faculties',
	  map: map,
	  clickable: true,
	  suppressInfoWindows: false
	});
	
	var mapsEngineLayer2 = new google.maps.visualization.MapsEngineLayer({
	  mapId: '08097405334273999136-05414812628978701557',
	  layerKey: 'locations',
	  map: map,
	  clickable: true,
	  suppressInfoWindows: false
	});

		 // This is the minimum zoom level that we'll allow
	
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

	var styles = [
				{
				"featureType": "poi.school",
				"stylers": [
				  { "visibility": "off" }
				]
			  },{
				"featureType": "landscape.man_made",
				"elementType": "geometry.fill",
				"stylers": [
				  { "visibility": "on" },
				 { "hue": "#002bff" }, 
				{ "saturation": -70 },
				{ "gamma": 0.32 }
				]
			  },{
				"elementType": "labels.text",
				"stylers": [
				  { "visibility": "off" }
				]
			  },{
				"featureType": "poi.park",
				"elementType": "labels.icon",
				"stylers": [
				  { "visibility": "off" }
				]
			  }
			];
	map.setOptions({styles: styles});
  	
			}



			google.maps.prototype.addPerson = function(user){
				log.info("UUUUUUUUUUUU");
				if(!user.isValid()){
					return;
				}
				this.addMarker({
					lat: user.loc.lat,
					lng: user.loc.lng,
					title: 'Lima',
					icon: {
						url: user.pic,
						scaledSize: {
							width: 50,
							height: 50
						}
					},
					//shadow: 'schools_maps.shadow.png',
					details: {
						database_id: 42,
						author: 'HPNeo'
					},
					click: function() {
						this.markerClick(user);
					}
				});
			}

			google.maps.prototype.updateMarkers = function(){
				log.info("UUUUUUUUUUUU");
				this.removeMarkers();

				this.addPerson(me);
				for(var i in activeFriends){
					map.addPerson(activeFriends[i]);
				}
			};


			google.maps.prototype.markerClick = function(user){
				log.info(user.name);
			}

