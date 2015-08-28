import Ember from 'ember';

export function formatCategories(catArray) {
  var catString = "";
  var catLength = catArray.length - 2; // remove point_of_interest and establishment
  var cat = null;
  for(var i = 0; i < catLength; i++) {
     cat = catArray[i].replace("_", " ");
    if(i == (catLength - 1)) {
      catString += cat;
    } else {
      catString += cat + ", ";
    }
  }
  return catString;
}

export default Ember.Handlebars.makeBoundHelper(formatCategories);
