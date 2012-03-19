this['JST'] = this['JST'] || {};

this['JST']['app/templates/home.html'] = function(data) { return function (obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<p>Hello {{ object }}</p>\n<a href="/blog">Blog</a>\n');}return __p.join('');
}(data, _)};

this['JST']['app/templates/layouts/blog.html'] = function(data) { return function (obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h1>Blog</h1>\n<div id="contents" class="blog"></div>\n');}return __p.join('');
}(data, _)};

this['JST']['app/templates/layouts/main.html'] = function(data) { return function (obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h1>Welcome</h1>\n<div id="contents"></div>\n');}return __p.join('');
}(data, _)};

this['JST']['app/templates/post/item.html'] = function(data) { return function (obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('{{title}}\n');}return __p.join('');
}(data, _)};

this['JST']['app/templates/post/list.html'] = function(data) { return function (obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('This is the blog\n<ul>\n</ul>\n');}return __p.join('');
}(data, _)};