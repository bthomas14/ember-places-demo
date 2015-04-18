import Ember from 'ember';
/* global google */

export default Ember.Component.extend({
  map: null,
  service: null,
  infowindow: null,

  init: function() {
    var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
    var options = {
      center: pyrmont,
      zoom: 15
    };
    var request = {
      location: pyrmont,
      radius: '500',
      query: this.get('keyword')
    };
    var map = new google.maps.Map(this.get('#map'), options);
  },

  callback: function(results, status) {
    if (status == google.maps.places.PlaceServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
      }
    }
  },


  actions: {

    search: function() {
      var keyword = this.get('keyword');
      /*
      var list = this.get('model');

      return list.filter(function(item) {
        return list.name == keyword;
      });
      */
      var map = this.get('map');
      service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);

    }
  }

});
