//import ajax from 'ic-ajax';
import Ember from 'ember';
/* global google */

export default Ember.Controller.extend({
  searchTerm: null,
  searchLocation: null,
  latLng: null,
  showKeywordSearch: function() {
    if(this.get('latLng')) {
      return true;
    }
  }.property('latLng'),

  actions: {
    search: function(keyword, latLng) {
      //var controller = this.controllerFor('index');
      this.set('searchTerm', keyword);
      this.set('searchLocation', latLng);
      console.log('searchTerm => ' + keyword + ", searchLocation => " + latLng);
    }
  }
});
