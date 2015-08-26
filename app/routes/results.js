import Ember from 'ember';

export default Ember.Route.extend({
  map: null,
  geocoder: null,
  service: null,
  latLng: null,

  beforeModel: function(transition) {
    var defaultCenter = new google.maps.LatLng(37.7833, 122.4167);
    var map = new google.maps.Map($('#map-canvas')[0], {
      center: defaultCenter,
      scrollWheel: false,
      zoom: 15
    });
    this.set('map', map);
    this.set('geocoder', new google.maps.Geocoder());
    this.set('service', new google.maps.places.PlacesService(map));

    // css styling for map
    Ember.$().css({
      //background: cover;
      display: "block",
      width: "400px",
      height: "200px"
      //top: "18.75px",
      //right: "12px"
    });
  },

  model: function(params) {
    console.log('in results.model()');
    var bounds = new google.maps.LatLngBounds();
    var map = this.get('map');
    var res = [];
    //var location = this.get('latLng');
    this.set('latLng', params.location);
    var location = params.location;
    var that = this;

    var request = {
      radius: '10',
      query: params.keyword,
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
