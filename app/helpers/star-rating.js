import Ember from 'ember';

export function starRating(rating) {
  var maxRating = 4;
  var stars = "";
  if(rating) {
    for(var i = 0; i <= maxRating; i++) {
      if((rating - i) >= 1) {
        stars += "<span class='fa fa-star'></span>";
      } else if ((rating - i) >= 0.5) {
        stars += "<span class='fa fa-star-half-o'></span>";
      } else {
        stars += "<span class='fa fa-star-o'></span>";
      }

    }
  }
  return stars;
}

export default Ember.Helper.helper(starRating);
