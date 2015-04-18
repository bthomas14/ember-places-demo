import Ember from 'ember';

var Places = Ember.Controller.extend({

  change: function() {
    this.set('inputDidChange', true);
    console.log('the input changed to ', this.get('keyword'));
    this.set('searchTerm', this.get('keyword'));
  },

  actions: {
    search: function(){
      var query = this.get('keyword')
      var listings;
      console.log(query);

      var service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);
      var searchBox = new google.maps.places.SearchBox(query) || "no";
      //var autocomplete = new google.maps.places.Autocomplete(this.$()[0], options);

      var place = searchBox.getPlaces();
      if(!place.length) {
        return;
      }
      for (var i = 0; i < place.length; i++) {
        listings.pushObject(place[i]);
      }
      return listings;
    }

  }
});

export default Places;
