import Ember from 'ember';
/* global google */

export default Ember.Component.extend({
  map: null,
  names: [],

  insertMap: function() {
      var container = this.$('.map-canvas')[0];
      var myLatlng = new google.maps.LatLng(this.get('latitude'),this.get('longitude'));
      var options = {
          center: myLatlng,
          zoom: 15
      };
      //new window.google.maps.Map(container, options);
      this.set('map', new google.maps.Map(container, options));
      var request = {
        location: myLatlng,
        radius: 500,
        query: 'restaurant'
      };
      var service = new google.maps.places.PlacesService(this.get('map'));
      service.textSearch(request, this.createMarkers);
  }.on('didInsertElement'),

  createMarkers: function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

      console.log("results = " + results[0].name);
      var names = new Array();

      for(var i = 0; i < results.length; i++) {
        console.log(results.name);
      }
      /*
      this.forEach(function(results) {
        console.log(results.name);
        names.push(results.name);
      });
      */
      return names;
    } else {
      console.log('error');
    }
  }.property('places', '@each'),

  coordinatesChanged: function() {
    var map = this.get('map');

    if (map) {
      map.setCenter(new google.maps.LatLng(this.get('latitude'), this.get('longitude')));
    }
  }.observes('latitude', 'longitude'),

  searchBox: function() {

  }
});
