define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  var Post = namespace.module();

  Post.Model = Backbone.Model.extend({ /* ... */ });
  Post.Collection = Backbone.Collection.extend({
    url: '/api/v1/posts',

    model: Post,

    initialize: function() {
      this.fetch();
    }
  });


  Post.Router = Backbone.Router.extend({
    routes: {
      "blog": "index"
    },

    index: function() {
      var blog = new Backbone.LayoutManager({
        template: "blog"
      });

      blog.setViews({
        "#contents": new Post.Views.Index()
      });

      blog.render(function(el) {
        $("body").html(el);
      });
    }
  });

  Post.Views.Index = Backbone.View.extend({
    template: "post/index",

    serialize: function() {
      return { object: "World" };
    }
  });

  // Required, return the module for AMD compliance
  return Post;

});
