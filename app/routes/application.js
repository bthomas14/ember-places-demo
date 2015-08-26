import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    search: function(keyword, latLng) {
      console.log("in search: " + keyword + ", " + latLng);
      var kw = keyword ? keyword : "";
      //var loc = latLng ? latLng : "noloc";
      var lat = latLng.G;
      var lng = latLng.K;

      this.transitionTo('results', { queryParams: { keyword: kw, lat: lat, lng: lng } });
    }
  }
});
