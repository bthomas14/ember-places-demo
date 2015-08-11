import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'results',
  map: null,
  markers: {},
  service: null,
  selectedMarker: null,
  infoWindow: null,

  didInsertElement: function() {
    console.log('largeMapView.didInsertElement called');

    // initialize geocoder & map, then call rerenderMap().
    // Don't set center for map, as this will be set based on array of latlngbounds
    this.set('infoWindow', new google.maps.InfoWindow());
    var mapOptions = {
      center: new google.maps.LatLng(-33.8668283734, 151.2064891821),
      zoom: 15,
      styles: [
        {
          stylers: [
            { visibility: 'simplified' }
          ]
        },
        {
          elementType: 'labels',
          stylers: [
            { visibility: 'off' }
          ]
        }
      ]
    };
    this.set('map', new google.maps.Map(this.$().get(0), mapOptions)); //save for future updates
    this.set('service', new google.maps.places.PlacesService(this.get('map')));

    //this.reRenderMap();

    // css styling for map
    this.$().css({
      display: "block",
      top: "18.75px",
      right: "12px"
    });
  },

  searchResults: function() {
    console.log('re-rendering map');
    var map = this.get('map');
    var locs = new Array();
    var that = this;

    var request = {
      bounds: map.getBounds(),
      keyword: this.get('query')
    };

    this.get('service').radarSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log("radarSearch successful!");
        var place = results[0];
        locs.push(place);
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
    return locs;
    // loop through each object in the array places, which was passed in with view
    /*this.places.forEach(function(place, i) {
      // call geocoder and when success call is returned, initiate code inside loop
      that.get('service').radarSearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log("radarSearch successful!");

          // pass in lat & lng from results array for each place location & push on to locs array
          var loc = new google.maps.LatLng(results[0].geometry.location.A, results[0].geometry.location.F);
          locs.push(loc);

          // Fit the latlng to map bounds
          bounds.extend(loc);
          map.fitBounds(bounds);

          // create a marker for the current place lat & lng
          var marker = new google.maps.Marker({
            position: loc,
            map: map,
            scrollwheel: false,
            draggable: false,
            title: place.get('name'),
            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          });

          // set markers array item with index = place id to current marker
          that.markers[place.get('id')] = marker;

          console.log("place " + i + ": " + place.get('name'));
        } else {
          console.log("Geocode was not successful for the following reason: " + status);
        }
      });
    });

    // Adjust zoom
    var zoom = map.getZoom();
    console.log("zoom is "+ zoom);
    map.setZoom(zoom > 12 ? 12 : zoom);

    // resize trigger: necessary?
    google.maps.event.trigger(map, 'resize');
    map.setZoom(map.getZoom());*/

  }.observes('query'),

  highlightMarker: function() {
    console.log('markerId ' + this.get('controller').get('selectedMarker') + ' was updated');
    // loop through markers array, and where id matches that of selectedMarker id
    // replace red marker with yellow. Otherwise, marker will be red
    for (var key in this.markers) {
      if (key === this.get('controller').get('selectedMarker')) {
        this.markers[key].set('icon', 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
      } else {
        this.markers[key].set('icon', 'https://maps.google.com/mapfiles/ms/icons/red-dot.png');
      }
    }
  }.observes('controller.selectedMarker') // watch for selectedMarker change on regionController

});
