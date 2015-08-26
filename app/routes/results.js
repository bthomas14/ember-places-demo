import Ember from 'ember';
/* global google */

export default Ember.Route.extend({
  map: null,
  geocoder: null,
  service: null,
  latLng: null,
  searchLatLng: [],

  beforeModel: function(transition) {
    this._super(transition);

    /*if (loc != "noloc") {
      this.get('geocoder').geocode(loc, function(result, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          debugger;
          that.set('searchLatLng'. result.location[0].data.geometry.location.lat, result.location[0].data.geometry.location.lng);
        }
      });
    } else {
      that.set('searchLatLng', new google.maps.LatLng(37.7833, 122.4167));
    }*/

    /*return new Ember.RSVP.Promise(function(resolve) {
      Ember.$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address'+loc, function(json) {
        debugger;
        var latLng = new google.maps.LatLng(json.location[0].data.geometry.location.lat,
              json.location[0].data.geometry.location.lng);

        resolve(latLng);
      });
    });*/

  },

  model: function(params) {
    console.log('in results.model()');
    var location = new google.maps.LatLng(params.lat, params.lng);
    this.set('latLng', location);

    var map = new google.maps.Map($('#map-canvas')[0], {
      center: location,
      scrollWheel: false,
      zoom: 15
    });

    this.set('map', map);
    this.set('geocoder', new google.maps.Geocoder());
    this.set('service', new google.maps.places.PlacesService(map));

    // css styling for map
    /*map.css({
      //background: cover;
      display: "block",
      width: "400px",
      height: "200px"
      //top: "18.75px",
      //right: "12px"
    });*/

    var bounds = new google.maps.LatLngBounds();

    var that = this;
    var resultList = [];

    var request = {
      radius: '10',
      query: params.keyword,
      location: location
    };

    return new Ember.RSVP.Promise(function(resolve) {
      that.get('service').textSearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log("textSearch successful!");

          results.forEach(function(item, i) {
            resultList.pushObject(item);
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
        resolve(resultList);
      });

    });
  },

  /*resizeMap: function() {
    console.log("in resizeMap()");
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
  }.observes('latLng', 'resultList.@each'),*/

  // watch for selectedMarker change
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
  }.observes('controller.selectedMarker'),*/
});
