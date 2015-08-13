import Ember from 'ember';
/* global google */

export default Ember.View.extend({
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
    var res = [];
    var location = this.get('latLng');

    var request = {
      radius: '10',
      query: this.get('query'),
      location: new google.maps.LatLng(location.G, location.K)
    };

    return this.get('service').textSearch(request, function(results, status) {
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
        //that.set('resultList', res);

      } else {
        console.log("textSearch was not successful for the following reason: " + status);
      }
    });

    //that.set('resultList', res);
  }.property('query'),

  resizeMap: function() {
    var map = this.get('map');
    var bounds = new google.maps.LatLngBounds();
    var location = this.get('latLng');

    // Fit the latlng to map bounds
    bounds.extend(new google.maps.LatLng(location.G, location.K));
    map.fitBounds(bounds);

    // resize trigger: necessary?
    google.maps.event.trigger(map, 'resize');
    map.setZoom(map.getZoom());

    // Adjust zoom
    var zoom = map.getZoom();
    console.log("zoom is " + zoom);
    map.setZoom(zoom > 12 ? 12 : zoom);
  }.observes('latLng', 'resultList.@each'),

  /*rerenderMap: function() {
    var results = this.get('resultList');
    var map = this.get('map');
    var bounds = new google.maps.LatLngBounds();
    var locs = [];
    var that = this;
    var markers = {};

    if(results) {
      results.forEach(function(place, i) {
        that.get('geocoder').geocode({ 'address': place.formatted_address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            console.log("geocoder successful!");

            // pass in lat & lng from results array for each place location & push on to locs array
            var loc = new google.maps.LatLng(results[0].geometry.location.G, results[0].geometry.location.K);
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
              title: place.name,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });

            // set markers array item with index = place id to current marker
            //that.markers[place.get('id')] = marker;

            //console.log("place " + i + ": " + place.get('name'));
          } else {
            console.log("Geocode was not successful for the following reason: " + status);
          }
        });
      });


      // resize trigger: necessary?
      google.maps.event.trigger(map, 'resize');
      map.setZoom(map.getZoom());
    } else {
      var location = this.get('latLng');

      // Fit the latlng to map bounds
      bounds.extend(new google.maps.LatLng(location.G, location.K));
      map.fitBounds(bounds);
    }
    // Adjust zoom
    var zoom = map.getZoom();
    console.log("zoom is " + zoom);
    map.setZoom(zoom > 12 ? 12 : zoom);

  }.observes('resultList.@each'),*/
});
