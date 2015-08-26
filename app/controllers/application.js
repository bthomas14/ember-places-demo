import Ember from 'ember';

export default Ember.Controller.extend({
  searchTerm: null,
  latLng: null,
  isDirty: false,

  showKeywordSearch: function() {
    console.log('in showKeywordSearch');
    if(this.get('latLng')) {
      return true;
    }
  }.property('latLng'),

  actions: {
    search: function(keyword, latLng) {
      this.set('isDirty', true);
      this.set('searchTerm', keyword);
    }
  }
});
