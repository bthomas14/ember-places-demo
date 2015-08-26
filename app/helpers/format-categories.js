import Ember from 'ember';
//import Handlebars from '../handlebars';

export function formatCategories(catArray) {
  var catString = "";
  var catLength = catArray.length - 2; // remove point_of_interest and establishment
  for(var i = 0; i < catLength; i++) {
    if(i == (catLength - 1)) {
      catString = catString + catArray[i];
    } else {
      catString = catString + catArray[i] + ", \n";
    }
  }
  return catString;
  //return Ember.Handlebars.SafeString(catString);
  //return new Ember.HTMLBars.SafeString(catString);
}

export default Ember.HTMLBars.makeBoundHelper(formatCategories);
