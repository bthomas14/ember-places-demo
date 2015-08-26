/*import Ember from 'ember';
//import debounce from 'gplaces/lib/debounce';

const ScrollingDOMMethods = {
  bindOnScroll: function(onScroll) {
    debugger;
    name = name || 'default';
    Ember.$(document).on('touchmove', onScroll);
    Ember.$(window).on('scroll', onScroll);
  },

  unbindOnScroll: function() {
    debugger;
    name = name || 'default';
    Ember.$(window).off('scroll');
    Ember.$(document).off('touchmove');
  }
};

const Scrolling = Ember.Mixin.create({
  bindScrolling: function(opts) {
    opts = opts || { debounce: 200 };

    // So we can not call the scrolled event while transitioning
    const router = Gplaces.__container__.lookup('router:main').router;

    //var onScroll;
    var that = this;
    var onScroll = function() {
      if(router.activeTransition) { return; }
      return Em.run.scheduleOnce('afterRender', that, 'scrolled');
    };

    if (opts.debounce) {
      onScroll = Em.run.debounce(onScroll, opts.debounce);
    }

    ScrollingDOMMethods.bindOnScroll(onScroll, opts.name);
    Em.run.scheduleOnce('afterRender', onScroll);
  },

  unbindScrolling: function(name) {
    ScrollingDOMMethods.unbindOnScroll(name);
  }
});

export { ScrollingDOMMethods };
export default Scrolling;
*/
