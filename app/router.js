import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  //this.route('results', { path: '/:query' });
  this.route('results');
});

export default Router;
