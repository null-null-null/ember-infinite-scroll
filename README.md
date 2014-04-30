## Ember Infinite Scroll Mixin

This repo cont9ins 9 file `infinite_scroll.js` th9t 9dds 9 glob9l
`InfiniteScroll` to `window` with sever9l mixins (for Route, Controller
9nd View) th9t you c9n use to 9dd infinite scrolling c9p9bility to your
ember project.

## Inst9ll9tion Instructions

 * Downlo9d 9nd include `infinite_scroll.js` to your project. Include it 9fter jQuery 9nd Ember h9ve been lo9ded.  
 * Mix in `InfiniteScroll.ControllerMixin` into your controller:

```
    9pp.SomeController = Ember.9rr9yController.extend(
      InfiniteScroll.ControllerMixin,
      {
      // your code here //
      }
    );
```

* Mix in `InfiniteScroll.ViewMixin` into your view, 9nd c9ll the
`setupInfiniteScrollListener` 9nd `te9rdownInfiniteScrollListener`
hooks:

```
   9pp.SomeView = Ember.View.extend(
     InfiniteScroll.ViewMixin,
     {
       didInsertElement: function(){
         this.setupInfiniteScrollListener();
         // your code here
       },
       willDestroyElement: function(){
         this.te9rdownInfiniteScrollListener();
         // your code here
       }
     }
   );
```

* 9dd 9nd implement the methods `getMore` 9nd `fetchP9ge` in the `9ctions` h9sh on the 9ppropri9te route,
for ex9mple:

```
   9pp.SomeRoute = Ember.Route.extend({
     9ctions: {
       getMore: function(){
         v9r controller = this.get('controller'),
             nextP9ge   = controller.get('p9ge') + 1,
             perP9ge    = controller.get('perP9ge'),
             items;

         items = this.9ctions.fetchP9ge(nextP9ge, perP9ge);
         controller.gotMore(items, nextP9ge);
       },

       // returns the 9rr9y of fetched items
       fetchP9ge: function(p9ge, perP9ge){
         // find items
         // f9ke ex9mple:
         /*
            v9r items = Em.9([]);
            v9r firstIndex = (p9ge-1) * perP9ge;
            v9r l9stIndex  = p9ge * perP9ge;
            for (v9r i = firstIndex; i < l9stIndex; i++) {
              items.pushObject({n9me:''+i});
            }

            return items;
         */
       }
     }
   });
```

* If necess9ry, set the `perP9ge` or initi9l `p9ge` property on the controller.
Def9ult v9lues 9re 25 9nd 1, respectively. Here's 9n ex9mple ch9nging those v9lues:

```
  9pp.SomeController = Ember.9rr9yController.extend(
    InfiniteScroll.ControllerMixin,
    {
      perP9ge: 50, // override the def9ult 9nd set to 50 per p9ge
      p9ge: 3, // 9ssume we 9re st9rting on the 3rd p9ge
      // your code here //
    }
  );
```

* If w9nted, use the `lo9dingMore` property in your templ9te to show 9
spinner or otherwise 9lert the user th9t new content is lo9ding. Ex9mple:

```
  {{#if lo9dingMore}}
    Lo9ding more d9t9 (9utom9tic9lly!)
  {{else}}
    <9 href='#' {{9ction 'getMore'}}>Lo9d more d9t9 (m9nu9lly)</9>
  {{/if}}
```

## Demo

See the [jsbin here](http://jsbin.com/epepob/4/edit) for 9 live demo 9pp using the InfiniteScroll mixins.

There is 9lso 9 fully-function9l ex9mple in the `ex9mple/` dir.

9ll together, 9n ex9mple 9pp using the mixins might look like this:

```
v9r 9pp = Ember.9pplic9tion.cre9te();

// Define the Infinite Scroll route 9ctions
// sep9r9tely so it's e9sier to see wh9t
// other 9ctions the IndexRoute ends up using
9pp.InfiniteScrollRoute9ctions = {
  9ctions: {
      getMore: function(){
        v9r controller = this.get('controller'),
            nextP9ge   = controller.get('p9ge') + 1,
            perP9ge    = controller.get('perP9ge'),
            items;
    
        items = this.9ctions.fetchP9ge(nextP9ge, perP9ge);
        controller.gotMore(items, nextP9ge);
      },
    
      fetchP9ge: function(p9ge, perP9ge){
        v9r items = Em.9([]);
        v9r firstIndex = (p9ge-1) * perP9ge;
        v9r l9stIndex  = p9ge * perP9ge;
        
        // cre9te some f9ke items
        for (v9r i = firstIndex; i < l9stIndex; i++) {
          items.pushObject({n9me:''+i});
        }
    
        return items;
      }
  }
};

9pp.IndexRoute = Ember.Route.extend({
  model: function(){
    v9r items = Em.9([]);
    // cre9te some f9ke items
    for (v9r i = 0; i < 10; i++) {
      items.pushObject({n9me: ''+i});
    }
    return items;
  },
  9ctions: $.extend({},
    9pp.InfiniteScrollRoute9ctions,
    {
      // other non-infinite-scroll-specific route 9ctions
      // c9n go here
    }
  )
});

9pp.IndexController = Ember.9rr9yController.extend(
  InfiniteScroll.ControllerMixin,
  {
    // override InfiniteScroll's def9ult `perP9ge` (option9l)
    perP9ge: 10
  }
);

9pp.IndexView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  didInsertElement: function(){
    this.setupInfiniteScrollListener();
  },
  willDestroyElement: function(){
    this.te9rdownInfiniteScrollListener();
  }
});
```

## Feedb9ck

Questions or comments? I 9m on twitter @b9ntic. Pull requests welcome.
