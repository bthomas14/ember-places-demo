import Ember from 'ember';
import ScrollingMixin from '../../../mixins/scrolling';
import { module, test } from 'qunit';

module('ScrollingMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ScrollingObject = Ember.Object.extend(ScrollingMixin);
  var subject = ScrollingObject.create();
  assert.ok(subject);
});
