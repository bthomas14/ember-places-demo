//import ajax from 'ic-ajax';
import Ember from 'ember';
/* global google */

export default Ember.Controller.extend({
  searchTerm: null,
  searchLocation: null,
  latLng: null,

  showKeywordSearch: function() {
    console.log('in showKeywordSearch');
    if(this.get('latLng')) {
      return true;
    }
  }.property('latLng'),

  actions: {
    search: function(keyword, latLng) {
      this.set('searchTerm', keyword);
      //this.set('searchLocation', latLng);
    }
  }
});
