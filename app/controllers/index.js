import Ember from 'ember';
/* global google */

var listing = [];
//var type = 'cafe';
var radius = 50;
var keyword = null;
var map = null;

export default Ember.Controller.extend({
  //typeOptions: ['atm','bank','bar','cafe','food','hospital','police','store'],
  radiusOptions: ['5','10','50','100'],

  // initialize Geocoder
  insertMap: function() {
    var container = this.$("#canvas");

    this.set('geocoder', new google.maps.Geocoder());

    // set default map options
    var options = {
        center: new google.maps.LatLng(40.7143528, -74.0059731),
        zoom: 14,
        //center: new google.maps.LatLng(myLatlng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.set("map", new google.maps.Map(container[0], options));

  }.on('didInsertElement'),

  returnPlaces: function(results, status) {
    console.log('in returnPlaces()');

    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log("places status => " + google.maps.places.PlacesServiceStatus.OK);

      //var locs = new Array();
      for (var i = 0; i < results.length; i++) {
        mylisting = results[i];
        console.log('mylisting => ' + mylisting.name);
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

        //listing.push(listing);

        console.log("mylisting " + i + ": " + mylisting.name + ", address: " + mylisting.geometry.location.lat);

        //console.log("listing " + i + " = " + results[i].name);
        listing.pushObject(Ember.Object.create({name: mylisting.name, types: mylisting.types, address: mylisting.geometry.location.lat}));
      }
    }
    //return listing;
  },

  actions: {
    /*
    getPlaces: function() {
      var keyword = this.get('keyword');
      // script uses our 'geocoder' in order to find location by address name
      $.ajax({
          url: 'https://maps.googleapis.com/maps/api/place/search/json',
          type: 'GET',
          dataType: 'json',
          data:  {
             location: '33.787794,-117.853111',
             radius: 50,
             name: 'keyword',
             //key: 'AIzaSyDSGkcvPTZI1QjsZ8kmwqDZEaS0R44q-RQ',
             key: 'ABQIAAAAvZMU4-DFRYtw1UlTj_zc6hT2yXp_ZAY8_ufC3CFXhHIE1NvwkxQcT1h-VA8wQL5JBdsM5JWeJpukvw', // add your key here
             sensor: 'false'
          },
          success: function(response) {
            console.log(data);
            //App.Location.geocoded.set('response', response);
          },
          // on failure
          error: function (jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
          }
      });
    }
    */
    // find custom places function
    findPlaces: function() {

        // prepare variables (filter)
        //this.set('type', this.get('type').value);
        //this.set('radius', this.get('radius'));
        this.set('keyword', this.get('keyword'));

        //var lat = this.get('lat').value;
        //var lng = this.get('lng').value;
        //var cur_location = new google.maps.LatLng(lat, lng);
        var cur_location = new google.maps.LatLng(40.7143528,-74.0059731);

        // prepare request to Places
        var request = {
            location: cur_location,
            radius: radius,
            keyword: keyword
        };

        // send request
        //this.set('service', new google.maps.places.PlacesService(this.get('map')));
        var service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch(request, this.callback);
    },
  }
});
