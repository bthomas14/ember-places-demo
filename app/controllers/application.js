import Ember from 'ember';

export default Ember.Controller.extend({
  latLng: null,
  searchTerm: null,

  // Only show keyword search input once location has been selected
  showKeywordSearch: function() {
    console.log('in showKeywordSearch');
    if(this.get('latLng')) {
      return true;
    }
  }.property('latLng'),

  // Watch keyword, don't allow user to submit unless they've put in a keyword
  keywordIsDirty: function() {
    if(this.get('keyword')) {
      return true;
    } else {
      return false;
    }
  }.property('keyword'),

  onKeywordChange: function() {
    Ember.run.debounce(this, this.setSearchTerm, 300);
    /*var typingTimer;                //timer identifier
    var doneTypingInterval = 5000;  //time in ms, 5 second for example

    //on keyup, start the countdown
    clearTimeout(typingTimer);
    if (this.get('keyword').val) {
      typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
    }*/
  }.observes('keyword'),

  setSearchTerm: function() {
    this.set('searchTerm', this.get('keyword'));
    this.set('isDirty', true);
  },

  actions: {
    /*search: function(keyword) {
      // Flag that keyword input is dirty to reveal map
      this.set('isDirty', true);
      this.set('searchTerm', keyword);
    }*/
  }
});
