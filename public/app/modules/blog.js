define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  var Blog = namespace.module();

  Blog.Model = Backbone.Model.extend({ /* ... */ });
  Blog.Collection = Backbone.Collection.extend({ /* ... */ });
  Blog.Router = Backbone.Router.extend({
    routes: {
      "blog": "index"
    },

    index: function() {
      var blog = new Backbone.LayoutManager({
        template: "blog"
      });

      blog.setViews({
        "#contents": new Blog.Views.Index()
      });

      blog.render(function(el) {
        $("body").html(el);
      });
    }
  });

  Blog.Views.Index = Backbone.View.extend({
    template: "blog/index",

    serialize: function() {
      return { object: "World" };
    }
  });

  // Required, return the module for AMD compliance
  return Blog;

});
