import Ember from 'ember';

var MyInput = Ember.TextField.extend({
  // toggles to dirty property when user enters input
  inputDidChange: false,
  searchTerm: null,

  change: function() {
    this.set('inputDidChange', true);
    console.log('the input changed to ', this.get('keyword'));
    this.set('searchTerm', value);
  },

  actions: {

  },
  watchInput: function(){

    var searchBox = new google.maps.places.SearchBox(this.get('keyword'));
    //var autocomplete = new google.maps.places.Autocomplete(this.$()[0], options);

    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var place = searchBox.getPlaces();
      if(!places.length) {
        return;
      }
      for (var i = 0; i < places.length; i++) {
        console.log(places[i]);
      }
    });
  }.observes('inputDidChange'),

});


export default MyInput;
