			// bounds of the desired area
			var allowedBounds = new google.maps.LatLngBounds(
			     new google.maps.LatLng( 32.778050, 35.020852 ), 
			     new google.maps.LatLng(32.776129, 35.024275)
			);
			
			var lastValidCenter;

			function initGmap(){

				var mapsEngineLayer = new google.maps.visualization.MapsEngineLayer({
				  mapId: '08097405334273999136-05414812628978701557',
				  layerKey: 'bldgs',
				  map: map,
				  clickable: true,
				  suppressInfoWindows: false
				});


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


				var ulman = new google.maps.LatLng(32.777522, 35.023138);

				var mapOptions = {
				zoom: 16,
				center: ulman
				};	

				map = new google.maps.Map(document.getElementById('mapDiv'),
				  mapOptions);				





			
				// var swNew = new google.maps.LatLng( 32.772556, 35.014608 );
				// var neNew = new google.maps.LatLng( 32.781748, 35.029956 );
				// var campusBounds = new google.maps.LatLngBounds( swNew, neNew );

				// var campusOverlay = new google.maps.GroundOverlay(
				// 	'img/campusMap.png',
				// 	campusBounds);

				// campusOverlay.setMap(map);









/////////////////////////////// YAKIR ////////////////////////////

				// var mapOptions = {
				//   center: new google.maps.LatLng(32.777522, 35.023138),
				//   zoom: 16
				// };
				// map = new google.maps.Map(document.getElementById('mapDiv'),
				//   mapOptions);

				// var mapsEngineLayer = new google.maps.visualization.MapsEngineLayer({
				//   mapId: '08097405334273999136-05414812628978701557',
				//   layerKey: 'bldgs',
				//   map: map,
				//   clickable: true,
				//   suppressInfoWindows: false
				// });
				
				// var styles = [
				// /*
				//  {
				// 	stylers: [
				// 	  { hue: "#00ffe6" },
				// 	  { saturation: -20 }
				// 	]
				//   },*/
				//   {
				// 	featureType: "all",
				// 	elementType: "labels",
				// 	stylers: [
				// 		{ visibility: "off" }
				// 	]
				//   }
				// ];
				// map.setOptions({styles: styles});
				
			}



			google.maps.Map.prototype.addPerson = function(user){
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

			google.maps.Map.prototype.updateMarkers = function(){
				this.removeMarkers();

				this.addPerson(me);
				for(var i in activeFriends){
					map.addPerson(activeFriends[i]);
				}
			};


			google.maps.Map.prototype.markerClick = function(user){
				log.info(user.name);
			}

			User.prototype.isValid = function(){
				if(typeof this.id === 'undefined')
					return false;
				if(typeof this.name === 'undefined')
					return false;
				if(typeof this.pic === 'undefined')
					return false;
				if(typeof this.loc === 'undefined')
					return false;
				if(typeof this.loc.lat === 'undefined')
					return false;
				if(typeof this.loc.lng === 'undefined')
					return false;

				return true;
			}
