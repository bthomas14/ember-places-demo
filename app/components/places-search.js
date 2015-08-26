import Ember from 'ember';
//import Scrolling from 'gplaces/mixins/scrolling';
/* global google */

export default Ember.Component.extend({
  map: null,
  service: null,
  geocoder: null,
  autocomplete: null,
  resultList: null,
  latLng: null,
  markers: {},

  didInsertElement: function() {
    console.log('places-search.didInsertElement called');

    // initialize geocoder & map, then call rerenderMap().
    // Don't set center for map, as this will be set based on array of latlngbounds
    var pyrmont = new google.maps.LatLng(37.7749295, -122.41941550000001);
    var map = new google.maps.Map(Ember.$('#map-canvas')[0], {
      center: pyrmont,
      scrollWheel: false,
      zoom: 12
    });
    this.set('map', map);
    this.set('geocoder', new google.maps.Geocoder());
    this.set('service', new google.maps.places.PlacesService(map));

    var that = this;
    Ember.$(window).on('scroll', function() {
      //Ember.run.debounce(that.mapScroll(), 300);
      that.mapScroll();
    });
  },

  searchQuery: function() {
    console.log('in searchQuery()');
    var bounds = new google.maps.LatLngBounds();
    var map = this.get('map');
    var res = [];
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
          that.markers[item.id] = marker;

          // Fit the latlng to map bounds
          bounds.extend(new google.maps.LatLng(location.G, location.K));
          map.fitBounds(bounds);

          // Adjust zoom
          var zoom = map.getZoom();
          console.log("zoom is " + zoom);
          map.setZoom(zoom > 12 ? 12 : zoom);
        });

        that.set('resultList', res);

      } else {
        console.log("textSearch was not successful for the following reason: " + status);
      }
    });
  }.observes('query'),

  // watch for selectedMarker change
  highlightMarker: function() {
    // loop through markers array, and where id matches that of selectedMarker id
    // replace red marker with yellow. Otherwise, marker will be red
    var markers = this.get('markers');
    for (var key in markers) {
      if (key === this.get('selectedMarker')) {
        markers[key].set('icon', 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
      } else {
        markers[key].set('icon', 'https://maps.google.com/mapfiles/ms/icons/red-dot.png');
      }
    }
    console.log('markerId ' + this.get('selectedMarker') + ' was updated');
  }.observes('selectedMarker'),

  mapScroll: function() {
    console.log('View was scrolled');
    var setTop = null;
    var map = Ember.$('#map-canvas');
    var offsetMap = Ember.$(document).scrollTop() - map.offset().top;
    var lastListing = Ember.$('#results-container').position().top + Ember.$('#results-container').height();
    var maxOffset = lastListing - map.height();

    // don't let map run past the last listing
    if(maxOffset <= offsetMap) {
      setTop = maxOffset;
    } else {
      setTop = offsetMap;
    }

    // If window is above start of map, set map css to normal
    // Else if window is below start of map, map will follow screen
    if (offsetMap <= 0) {
      map.css({
        display: "block",
        top: "0px",
        right: "12px"
      });
    } else {
      map.css({
        position: 'relative',
        top: setTop,
        left: 'auto',
        margin: 0
      });
    }
  },

  willDestroyElement: function() {
    Ember.$(window).off("scroll");
  },

  actions: {
    /* Listen for hover event and then set selectedMarker
       with new object id, triggering highlightMarker() */
    hover: function(item) {
      console.log('hovering on listing #' + item.name);
      this.set('selectedMarker', item.id);
    }
  },

});
