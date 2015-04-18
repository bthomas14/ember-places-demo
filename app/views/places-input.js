import Ember from 'ember';

export default Ember.TextField.extend({

  didInsertElement: function () {

  }.on('didInsertElement'),

  keyPress: function(event) {
    if (event.keyCode === 13) {
      return event.preventDefault();
    }
  },

  watchInput: function(){
    console.log('the input changed', this.get('keyword'));

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
  }.observes('keyword'),


});
