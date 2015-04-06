import Ember from 'ember';

export default Ember.Component.extend({
  map: null,
  infowindow: null,
  /*
  mapsCallback: function() {
    $.ajax ({
        url: "https://maps.googleapis.com/maps/api/place/nearbysearch/output?",
        type: 'GET',
        parameters:,
        data: {
          name: this.get('bizName'),
          address: this.get('bizAddress'),
          city: this.get('bizCity'),
          phone: this.get('bizPhone'),
          desc: this.get('bizDesc'),
          ratingStars: this.get('ratingStars'),
          reviewText: this.get('reviewText'),
          username: this.session.get('full_name')
          success: function(response) {
            console.log("in notifyAddBiz callback");

            setTimeout(function() {
              that.set('submitStatus', 'Submitted');
             //  that.send('closeModal');
             //  that.transitionToRoute('/');
             that.send('openModal', 'submitBizEnd');

            }, 500);
          }
        }
    });

  },
  

  insertMap: function() {
    var myLatlng = new google.maps.LatLng(37.7699298, -122.4469157);
    var container = this.$(".map-canvas");

    var options = {
      center: myLatlng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(container[0], options);

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World'
    });

    var contentString = marker.title;

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

    var request = {
      location: myLatlng,
      radius: 500,
      types: ['store'],
      keyword: this.get('pac-input')
    };

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  },

  callback: function(results, status) {
    if (status == google.maps.places.PlaceServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  },

  /*
  createMarker: function(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(placename);
      infowindow.open(map, this);
    });
  }.on('didInsertElement')
  */
});
