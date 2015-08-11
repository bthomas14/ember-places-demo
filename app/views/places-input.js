import Ember from 'ember';
/* global google, places */

export default Ember.TextField.extend({
  needs: ['index'],
  type: 'text',
  autocomplete: null,
  latLng: null,

  didInsertElement: function() {
    //this._super();

    console.log('in places-input view');
    var options = {
      types: ['geocode'],
      //types: ['(cities)'],
      //componentRestrictions: {country: 'us'}
    };
    var that = this;
    var autocomplete = new google.maps.places.Autocomplete(this.$()[0], options);
    this.set('autocomplete', autocomplete);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      return that.onPlaceChanged();
    });
    // observes for new changes on options to trigger an update on Chosen
    //return this.addObserver(this.get("optionLabelPath").replace(/^content/, "content.@each"), function() {
    //  return this.rerenderChosen();
    //});
  },
  // When the user selects a city, get the place details for the city and
  // zoom the map in on the city.
   onPlaceChanged: function() {
      var place = this.get('autocomplete').getPlace();
      if (place) {
        this.set('value', place.formatted_address);
        this.set('latLng', place.geometry.location);
        //map.panTo(place.geometry.location);
        //map.setZoom(15);
        //search();
        //var controller = this.get('controller.index');
      }
  }

});
