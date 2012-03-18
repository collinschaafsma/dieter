define([
  // Libs
  "jquery",
  "use!underscore",
  "use!backbone",
  "use!handlebars",

  // Plugins
  "use!plugins/backbone.layoutmanager"
],

function($, _, Backbone, Handlebars) {
  // Put application wide code here
  //

  Backbone.LayoutManager.configure({
    paths: {
      layout: "app/templates/layouts/",
      template: "app/templates/"
    },

    render: function(template, context) {
      return template(context);
    },

    fetch: function(path) {
      path = path + ".html";

      var done = this.async();
      var JST = window.JST = window.JST || {};

      if (JST[path]) {
        return done(Handlebars.template(JST[path]));
      }

      $.get(path, function(contents) {
        var tmpl = Handlebars.compile(contents);

        done(JST[path] = tmpl);
      }, "text");
    }
  });

  return {
    // Create a custom object with a nested Views object
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Keep active application instances namespaced under an app object.
    app: _.extend({}, Backbone.Events)
  };

  // return {
  //   // This is useful when developing if you don't want to use a
  //   // build process every time you change a template.
  //   //
  //   // Delete if you are using a different template loading method.
  //   fetchTemplate: function(path, done) {
  //     var JST = window.JST = window.JST || {};
  //     var def = new $.Deferred();

  //     // Should be an instant synchronous way of getting the template, if it
  //     // exists in the JST object.
  //     if (JST[path]) {
  //       if (_.isFunction(done)) {
  //         done(JST[path]);
  //       }

  //       return def.resolve(JST[path]);
  //     }

  //     // Fetch it asynchronously if not available from JST 
  //     $.get(path, function(contents) {
  //       JST[path] = _.template(contents);

  //       // Set the global JST cache and return the template
  //       if (_.isFunction(done)) {
  //         done(JST[path]);
  //       }

  //       // Resolve the template deferred
  //       def.resolve(JST[path]);
  //     }, "text");

  //     // Ensure a normalized return value (Promise)
  //     return def.promise();
  //   },

  //   // Create a custom object with a nested Views object
  //   module: function(additionalProps) {
  //     return _.extend({ Views: {} }, additionalProps);
  //   },

  //   // Keep active application instances namespaced under an app object.
  //   app: _.extend({}, Backbone.Events)
  // };
});
