import Ember from 'ember';
/* global google */

export default Ember.Component.extend({
  map: null,
  service: null,
  resultList: [],
  latLng: null,
  markers: [],
  showMap: false,
  queryIsDirty: null,

  didInsertElement: function() {
    console.log('places-search.didInsertElement called');
    // initialize geocoder & map, then call rerenderMap().
    // Don't set center for map, as this will be set based on array of latlngbounds
    var that = this;
    var pyrmont = new google.maps.LatLng(37.7749295, -122.41941550000001);
    var map = new google.maps.Map(Ember.$('#map-canvas')[0], {
      center: pyrmont,
      scrollWheel: false,
      zoom: 12
    });

    this.set('map', map);
    //this.set('geocoder', new google.maps.Geocoder());
    this.set('service', new google.maps.places.PlacesService(map));

    // On scroll events, trigger our follow me map to follow
    // Always remember to debounce scroll events
    Ember.$(window).on('scroll', function() {
      Ember.run.debounce(this, that.mapScroll, 200);
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

    this.clearMarkers();

    this.get('service').textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log("textSearch successful!");

        results.forEach(function(item, i) {
          // Fit the map to the new pinpoint
          var loc = new google.maps.LatLng(item.geometry.location.G, item.geometry.location.K);
          bounds.extend(loc);
          map.fitBounds(bounds);

          // create a marker for the current place lat & lng
          var marker = new google.maps.Marker({
            id: i,
            position: loc,
            map: map,
            scrollwheel: false,
            draggable: false,
            title: item.name,
            pid: item.id,
            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          });

          that.markers[i] = marker;

          // on marker click, activate onMarkerClick Function
          marker.addListener('click', function() {
            that.onMarkerClick(marker);
          });

          //populate our res array of results
          var thisItem = {
            id: i,
            pid: item.id,
            name: item.name,
            location: loc,
            rating: item.rating,
            types: item.types,
            marker: marker
          }
          res.pushObject(thisItem);
          console.log("place " + i + ": " + item.name);

          // Fit the latlng to map bounds
          bounds.extend(new google.maps.LatLng(location.G, location.K));
          map.fitBounds(bounds);

          // Adjust zoom
          var zoom = map.getZoom();
          map.setZoom(zoom > 18 ? 18 : zoom);
        });
        // set global resultList to our newly populated res array
        that.set('resultList', res);
        // make map visible as result list shows
        that.set('showMap', true);
      } else {
        console.log("textSearch was not successful for the following reason: " + status);
      }
    });

  }.observes('query'),

  onMarkerClick: function(marker) {
    var that = this;
    var markers = this.get('markers');
    // Remove styling from any previously selected markers
    for(var i = 0; i < markers.length; i++) {
      markers[i].set('icon', 'https://maps.google.com/mapfiles/ms/icons/red-dot.png');
    }
    Ember.$(".result").removeClass('active');

    // Add selected styling to clicked item
    debugger;
    marker.set('icon', 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
    Ember.$('html,body').animate({
      scrollTop: Ember.$("div[name='" + marker.id + "']").offset().top,
    }, 300);
    Ember.$("div[name='" + marker.id + "']").addClass('active');
  },

  // Clear all markers from previous searches
  clearMarkers: function() {
    var markers = this.get('markers');
    if(markers.length > 0) {
      for(var i = 0; i < markers.length; i++){
        markers[i].setMap(null);
      }
    }

  },
  // When result is clicked, loop through markers array, and where id matches
  // that of selectedMarker id replace red marker with yellow. Otherwise, marker will be red.
  highlightMarker: function() {
    var markers = this.get('markers');
    debugger;
    for(var i = 0; i < markers.length; i++) {
      if (i === this.get('selectedMarker').id) {
        markers[i].set('icon', 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
      } else {
        markers[i].set('icon', 'https://maps.google.com/mapfiles/ms/icons/red-dot.png');
      }
    }
    console.log('markerId ' + this.get('selectedMarker').id + ' was updated');
  }.observes('selectedMarker'),

  // Fancy follow me map
  mapScroll: function() {
    console.log('View was scrolled');
    var map = Ember.$('#map-canvas');
    var scrolledFromTop = Ember.$(document).scrollTop();
    var startOffset = map.parent().offset().top;
    var offsetMap = scrolledFromTop - startOffset;
    console.log("scrolledFromTop => " + scrolledFromTop + ", startOffset => " + startOffset);
    console.log("offsetMap => " + offsetMap);

    // If window is above start of map, set map css to normal
    // Else if window is below start of map, map will follow screen
    if (startOffset >= scrolledFromTop) {
      map.css({
        display: "block",
        top: "0px",
        right: "0px"
      });
    } else {
      map.css({
        position: 'relative',
        top: offsetMap,
        left: 'auto',
        margin: 0
      });
    }
  },

  // Always remember to destroy scroll functions on nav away from page
  willDestroyElement: function() {
    Ember.$(window).off("scroll");
  },

  actions: {
    // Listen for click event and then set selectedMarker
    // with new object id, triggering highlightMarker()
    click: function(item) {
      var markers = this.get('markers');
      for(var i = 0; i < markers.length; i++) {
        markers[i].set('icon', 'https://maps.google.com/mapfiles/ms/icons/red-dot.png');
      }
      this.set('selectedMarker', item);
      Ember.$(".result").removeClass('active');
      Ember.$(".result[name='" + item.id + "']").addClass('active');
    }
  },

});
