import Ember from 'ember';
/* global google */

export default Ember.Component.extend({
  map: null,
  service: null,
  geocoder: null,
  autocomplete: null,
  resultList: null,
  latLng: null,

  didInsertElement: function() {
    console.log('largeMapView.didInsertElement called');

    // initialize geocoder & map, then call rerenderMap().
    // Don't set center for map, as this will be set based on array of latlngbounds
    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
    var map = new google.maps.Map($('#map-canvas')[0], {
      center: pyrmont,
      scrollWheel: false,
      zoom: 15
    });
    this.set('map', map);
    this.set('geocoder', new google.maps.Geocoder());
    this.set('service', new google.maps.places.PlacesService(map));

    // css styling for map
    this.$().css({
      //background: cover;
      //display: "block",
      //top: "18.75px",
      //right: "12px"
    });
  },

  searchQuery: function() {
    console.log('in searchQuery()');
    var bounds = new google.maps.LatLngBounds();
    var map = this.get('map');
    var res = new Array();
    var location = this.get('latLng');
    var that = this;

    var request = {
      radius: '10',
      query: this.get('query'),
      location: new google.maps.LatLng(location.G, location.K)
    };

    this.get('service').textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log("textSearch successful!");

        results.forEach(function(item, i) {
          res.push(item);
          console.log("place " + i + ": " + item.name);

          var loc = new google.maps.LatLng(item.geometry.location.G, item.geometry.location.K);
          bounds.extend(loc);
          map.fitBounds(bounds);

          // create a marker for the current place lat & lng
          var marker = new google.maps.Marker({
            position: loc,
            map: map,
            scrollwheel: false,
            draggable: false,
            title: item.name,
            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          });
        });

        that.set('resultList', res);

      } else {
        console.log("textSearch was not successful for the following reason: " + status);
      }
    });
  }.observes('query'),

  resizeMap: function() {
    console.log("in resizeMap()")
    var map = this.get('map');
    var bounds = new google.maps.LatLngBounds();
    var location = this.get('latLng');

    // Fit the latlng to map bounds
    bounds.extend(new google.maps.LatLng(location.G, location.K));
    map.fitBounds(bounds);

    // resize trigger: necessary?
    //google.maps.event.trigger(map, 'resize');
    //map.setZoom(map.getZoom());

    // Adjust zoom
    var zoom = map.getZoom();
    console.log("zoom is " + zoom);
    map.setZoom(zoom > 12 ? 12 : zoom);
  }.observes('latLng', 'resultList.@each'),

  /*highlightMarker: function() {
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
  }.observes('controller.selectedMarker') // watch for selectedMarker change on regionController*/

});
