# Dieter
Rails + Backbone boilerplate.

The example app guts the asset pipeline out and setups a few other sane configurations.
The main controller inherits from Metal to keep things very fast.
This way we can stay close to the Rack level when it makes sense and we don't have to
use subpar tooling for our assets.  Instead we can use Grunt.
Because this is still a Rails app though we get all the many benefits we typically need from Rails.
