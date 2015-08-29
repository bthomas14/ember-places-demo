import startApp from 'gplaces/tests/helpers/start-app';
var App;
/* global google */

module('Integration - Application Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("by default, keyword input is not shown", function() {
  visit("/");
  andThen(function() {
    equal(find('#keyword').length, 0);
  });
});

test("the latLng is populated when a location is selected", function() {
  visit("/");
  fillIn("input#location", "San Francisco");
  andThen(function() {
    equal(find("#latLng").val, "");
  });
});

test("the keyword input shows up after location is entered", function() {
  visit("/");
  fillIn("input#location", "San Francisco");
  andThen(function() {
    equal(find("#keyword").length, 1);
  });
});
