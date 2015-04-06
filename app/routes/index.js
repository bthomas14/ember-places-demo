import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return {
      locations: [
        Ember.Object.create({ name: 'Prague', lat: 50.08804, lng: 14.42076 }),
        Ember.Object.create({ name: 'New York', lat: 40.71427 , lng: -74.00597 }),
        Ember.Object.create({ name: 'Sydney', lat: -33.86785, lng: 151.20732 })
      ]
    };
  }

});
