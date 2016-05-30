---
layout: post_book
title: seajs 模块化 jQuery
date: 2016-05-30
subtitle: jQuery的模块化以及jQuery插件的模块化。在自定义模块的时候，也可用用到这种声明方式。
author: BookEl
tags: jQuery 模块化
bg: http://www.padmag.cn/wp-content/uploads/288.jpg
---

## jQuery 模块化

在使用 seajs 进行模块化开发过程中，不免要用到 jQuery，需要对原版的 jq 进行一些简单的修改，才能在 seajs 中使用。

用下面这段语句将jQuery源代码包裹起来：

{% highlight javascript %}
define('jquery',[],function(require, exports, module){
    //这里放jQuery源代码
    module.exports = jQuery;
});
{% endhighlight %}

也可以加一个判断，如果define已经被定义，就把jQuery模块化，如果define没有被定义，正常执行jQuery代码：

{% highlight javascript %}
/*
 * http://julabs.com
 */
(function(factory) {
    if (typeof define === 'function') {
        define('/jquery', [], factory);
    }
    else {
        factory();
    }

})(function(require) {
    //这里放jQuery源代码
    if (require) return $.noConflict(true);

});
{% endhighlight %}

如果是jQuery1.7版本以上的，那就更方便了。可以看下jQuery源码的最后几行，会发现类似下方的代码：

{% highlight javascript %}
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
    define( "jquery", [], function () { return jQuery; } );
}
{% endhighlight %}

如果判断语句为真，那么 jQuery 就会自动模块化。所以改下判断语句，只留 `typeof define === "function"`，jQuery 便可以自动模块化：

{% highlight javascript %}
if ( typeof define === "function") {
    define( "jquery", [], function () { return jQuery; } );
}
{% endhighlight %}

## jQuery插件模块化

一般模块化代码像下面这样：

{% highlight javascript %}
/*!
 * http://julabs.com
 */
(function (factory) {
    if (typeof define === 'function') {
        // 如果define已被定义，模块化代码
        define('jquerySayHello',['jquery'], function(require,exports,moudles){
            factory(require('jquery')); // 初始化插件
            return jQuery; // 返回jQuery
        });
    } else {
        // 如果define没有被定义，正常执行jQuery
        factory(jQuery);
    }
}(function ($) {
    console.log('init');
    $.sayHello = function(){
        console.log("Hello");
    };
}));
{% endhighlight %}

使用插件的代码如下：

{% highlight javascript %}
/*
 * http://julabs.com
 */
seajs.config({
    'base':'/script',
    'alias':{
        'jquery':'jquery.sea.js',
        'jquerySayHello':'jquery.sayHello.sea.js'
    }
});

seajs.use(['jquery','jquerySayHello'],function($){
    $.sayHello();
});

seajs.use(['jquery','jquerySayHello'],function($){
    $.sayHello();
});
{% endhighlight %}

