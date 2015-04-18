import Ember from 'ember';

export default Ember.Component.extend({
  placeSearch: null,
  autocomplete: null,
  componentForm: ['street_number', 'route', 'locality', 'administrative_area_level_1', 'country', 'postal_code'],

  init: function() {
    //create a places object
    var autocomplete = new google.maps.places.Autocomplete(this.get('autocomplete'),
      { types: ['geocode'] });

    //when user selects address in dropdown, populate address field
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      fillInAddress(autocomplete);
    });
  },

  fillInAddress: function(autocomplete) {
    // get place details from autocomplete object
    var place = this.autocomplete.getPlace();

    for (var component in componentForm) {
      this.get(component).value = '';
      this.get(component).disabled = false;
    }

    // get each component of the address form and fill in the fields of the form
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        this.get(addressType).value = val;
      }
    }
  }.observes('place_changed'),

  // bias autocomplete to the user's location, supplied by the browser's 'navigator.geolocation' object
  geolocate: function() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  },

  actions: {
    search: function(keyword) {
      var keyword = this.get('keyword');
      var list = this.get('places');

      return list.filter(function(item) {
        return list.name == keyword;
      });
    }
  }
});
