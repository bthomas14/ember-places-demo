import Ember from 'ember';
/* global google */

var keyword = null;
var service = null;
var listing = [],

export default Ember.Component.extend({
  geocoder: null,
  center: null,
  map: null,
  markers: [],
  infos: [],
  address: null,
  typeOptions: ['atm','bank','bar','cafe','food','hospital','police','store'],
  radiusOptions: ['5','10','50','100'],

  // initialize Geocoder
  insertMap: function() {
    var container = this.$("#gmap_canvas");

    this.set('geocoder', new google.maps.Geocoder());

    // set default map options
    var opts = {
        center: new google.maps.LatLng("40.7142700", "-74.0059700"),
        zoom: 14,
        //center: new google.maps.LatLng(myLatlng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(container[0], opts);
    this.set('map', map); //save for future updates

  }.on('didInsertElement'),

  placesChanged: function() {
    var listing = this.get('listing');
    console.log('listing array => ' + listing);
  }.observes('keyword'),

  returnPlaces: function(results, status) {
    console.log('in returnPlaces()');

    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log("places status => " + google.maps.places.PlacesServiceStatus.OK)
      console.log("results array length => " + results.length);

      //var locs = new Array();
      for (var i = 0; i < results.length; i++) {
        var mylisting = results[i];
        console.log('mylisting => ' + mylisting.name);
        console.log('mylisting type => ' + mylisting.types);
        if (results[i] == null) {
          console.log('no results');
          break;
        }
        if (mylisting.geometry.location.lat == null) {
            console.log("listing: " + mylisting.name + " has no location");
            continue;
        }

        //var loc = new google.maps.LatLng(mylisting.get('latitude'), mylisting.get('longitude'));
        //bounds.extend(loc);
        //var listing = new google.maps.places(mylisting.name, mylisting.address);

        listing.pushObject({name: mylisting.name, types: mylisting.types});
        console.log('listing => ' + listing.list.name);
      }
      return listing;
    }
  },

  actions: {
    // find custom places function
    findPlaces: function() {
        this.set('keyword', this.get('keyword'));

        //var lat = this.get('lat').value;
        //var lng = this.get('lng').value;
        //var cur_location = new google.maps.LatLng(lat, lng);
        var cur_location = new google.maps.LatLng(40.7143528,-74.0059731);

        // prepare request to Places
        var request = {
            location: cur_location,
            radius: 50,
            keyword: keyword,
        };

        // send request
        //this.set('service', new google.maps.places.PlacesService(this.get('map')));
        var service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch(request, this.returnPlaces);
    },
  },

});
