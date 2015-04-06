import DS from 'ember-data';
import ApplicationAdapter from './application';

export default DS.RESTAdapter.extend({
  host: 'http://localhost:4200/api'
});
