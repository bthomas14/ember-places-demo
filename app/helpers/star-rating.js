import Ember from 'ember';

export function starRating(rating) {
  var maxRating = 5;
  var stars = "";
  if(rating) {
    for(var i = 1; i <= maxRating; i++) {
      if(i < rating || (i - rating) < 0.5) {
        stars += "<span class='glyphicon glyphicon-star'></span>";
      } else if ((i - rating) >= 0.5) {
        stars += "<span class='glyphicon glyphicon-star-half'></span>";
      } else {
        stars += "<span class='glyphicon glyphicon-star-empty'></span>";
      }

    }
  }
  return stars;
}

export default Ember.Helper.helper(starRating);
