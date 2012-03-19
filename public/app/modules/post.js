define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  var Post = namespace.module();

  /* Post Model */
  Post.Model = Backbone.Model.extend({

  });

  /* Post Collection */
  Post.Collection = Backbone.Collection.extend({
    url: '/api/v1/posts',

    model: Post.Model
  });

  /* Post Router */
  Post.Router = Backbone.Router.extend({
    routes: {
      "blog": "list"
    },

    list: function() {
      var blog = new Backbone.LayoutManager({
        template: "blog"
      });

      blog.setViews({
        "#contents": new Post.Views.List()
      });

      blog.render(function(el) {
        $("body").html(el);
      });
    }
  });

  /* Post List Item View */
  Post.Views.Item = Backbone.View.extend({
    template: "post/item",

    tagName: "li",

    serialize: function() {
      return this.model.toJSON();
    }
  });

  /* Post List View */
  Post.Views.List = Backbone.View.extend({
    template: "post/list",

    className: "post-list",

    render: function(manage) {
      // Have LayoutManager manage this View and call render.
      var view = manage(this);

      // Iterate over the passed collection and create a view for each item
      this.collection.each(function(post) {
        view.insert("ul", new Post.Views.Item({
          model: post
        }));
      });

      // You still must return this view to render, works identical to
      // existing functionality.
      return view.render();
    },

    initialize: function() {
      this.collection = new Post.Collection();
      this.collection.fetch();
      this.collection.bind("reset", function() {
        this.render();
      }, this);
    }
  });

  return Post;

});
