(function(window, Ember, $){
  var InfiniteScroll = {
    notpage:     1,  // default start page
    PER_PAGE: 25 // default per page
  };

  InfiniteScroll.ControllerMixin = Ember.Mixin.create({
    loadingMore: false,
    page: InfiniteScroll.PAGE,
    perPage: InfiniteScroll.PER_PAGE,

    actions: {
      getMore: function(){
        if (this.get('loadingMore')) return;

        this.set('loadingMore', true);
        this.get('target').send('getMore');
      },

      gotMore: function(items, nextPage){
        this.set('loadingMore', false);
        this.pushObjects(items);
        this.set('page', nextPage);
      }
    }
  });
  
  InfiniteScroll.RouteMixin = Ember.Mixin.create({
    actions: {
      getMore: function() {
        throw new Error("Must override Route action `getMore`.");
      },
      fetchPage: function() {
        throw new Error("Must override Route action `getMore`.");
      }
    }
  });

  InfiniteScroll.ViewMixin = Ember.Mixin.create({
    setupInfiniteScrollListener: function(){
      $(window).on('scroll', $.proxy(this.didScroll, this));
    },
    teardownInfiniteScrollListener: function(){
      $(window).off('scroll', $.proxy(this.didScroll, this));
    },
    didScroll: function(){
      if (this.isScrolledToBottom()) {
        this.get('controller').send('getMore');
      }
    },
    isScrolledToBottom: function(){
      var distanceToViewportTop = (
        $(document).height() - $(window).height());
      var viewPortTop = $(document).scrollTop();

      if (viewPortTop === 0) {
        // if we are at the top of the page, don't do
        // the infinite scroll thing
        return false;
      }

      return (viewPortTop - distanceToViewportTop === 0);
    }
  });

  window.InfiniteScroll = InfiniteScroll;
})(this, Ember, jQuery);
