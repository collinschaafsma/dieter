this['JST'] = this['JST'] || {};

this['JST']['app/templates/blog/index.html'] = function(data) { return function (obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('This is the blog\n');}return __p.join('');
}(data, _)};

this['JST']['app/templates/home.html'] = function(data) { return function (obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('Hello {{ object }}\n');}return __p.join('');
}(data, _)};

this['JST']['app/templates/layouts/main.html'] = function(data) { return function (obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div id="contents"></div>\n');}return __p.join('');
}(data, _)};