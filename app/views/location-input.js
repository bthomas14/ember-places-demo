import Ember from 'ember';
/* global google */

export default Ember.TextField.extend({
  type: 'text',


  didInsertElement: function() {
    console.log('in places-input view');
    var options = {
      types: ['geocode'],
    };
    var that = this;
    var autocomplete = new google.maps.places.Autocomplete(this.$()[0], options);

    // Listen for user to select an location from the autocomplete dropdown
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      return that.onPlaceSelected(autocomplete);
    });
  },

  // When the user selects a city, get the place details for the city and
  // zoom the map in on the city.
  onPlaceSelected: function(autocomplete) {
    var place = autocomplete.getPlace();

    if (place) {
      this.set('value', place.formatted_address);
      this.set('latLng', place.geometry.location);
    }
  }
});
