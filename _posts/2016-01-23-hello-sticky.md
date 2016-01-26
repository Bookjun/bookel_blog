---
layout: post_book
title: 固定元素(Sticky)组件开发
date: 2016-01-25
subtitle: 一个看起来比较蠢，用起来还可以的组件。
author: BookEl
---
<style>
    .headroom {
        position: fixed;
        z-index: 1010;
        top: -61px;
        left: 0;
        right: 0;
        transition: transform 0.3s;
    }

    .headroom.headroom--not-top {
        -webkit-transform: translate3d(0, 100%, 0);
        -moz-transform: translate3d(0, 100%, 0);
        -ms-transform: translate3d(0, 100%, 0);
        -o-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }

    @-webkit-keyframes shake {
      from, to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

      10%, 30%, 50%, 70%, 90% {
        -webkit-transform: translate3d(-10px, 0, 0);
        transform: translate3d(-10px, 0, 0);
      }

      20%, 40%, 60%, 80% {
        -webkit-transform: translate3d(10px, 0, 0);
        transform: translate3d(10px, 0, 0);
      }
    }

    @keyframes shake {
      from, to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

      10%, 30%, 50%, 70%, 90% {
        -webkit-transform: translate3d(-10px, 0, 0);
        transform: translate3d(-10px, 0, 0);
      }

      20%, 40%, 60%, 80% {
        -webkit-transform: translate3d(10px, 0, 0);
        transform: translate3d(10px, 0, 0);
      }
    }

    .hd {
        animation-duration: 1s;
    }

    .hd.hd--unpinned {
        -webkit-animation-name: shake;
        animation-name: shake;
        animation-duration: 1s;
    }
</style>

固定元素的效果是当元素滚动超出可见区域时，保持元素留在可见区域。

## Headroom.js

### 工作原理

简单来说，<a href="http://www.bootcss.com/p/headroom.js/" class="external-link" target="_blank">headroom.js</a> 只是为需要响应滚动事件的页面元素增加或删除一个CSS

{% highlight html %}
<!-- 初始状态 -->
<header class="headroom">

<!-- 向下滚动时 -->
<header class="headroom headroom--unpinned">

<!-- 向上滚动时 -->
<header class="headroom headroom--pinned">
{% endhighlight %}

通过CSS class的设置，事情变得简单了。所有的控制权就交回到了你的手中，当页面向上或向下滚动时，你就可以通过设置CSS样式来做出自己需要的变化了。

### 调用方法

**纯JS调用方式**

{% highlight javascript %}
// 获取页面元素
var myElement = document.querySelector("header");
// 创建 Headroom 对象，将页面元素传递进去
var headroom  = new Headroom(myElement);
// 初始化
headroom.init();
{% endhighlight %}

**以 jQuery/Zepto 插件形式调用**

{% highlight javascript %}
// 是不是很简单！
// 注意： init() 默认在插件内部被调用了
$("#header").headroom();
{% endhighlight %}

**data-* API**
{% highlight html %}
<!-- selects $("[data-headroom]") -->
<header data-headroom>
{% endhighlight %}

### 参数

{% highlight javascript %}
{
    // 在元素没有固定之前，垂直方向的偏移量（以px为单位）
    offset : 0,
    // scroll tolerance in px before state changes
    tolerance : 0,
    // 对于每个状态都可以自定义css classes
    classes : {
        // 当元素初始化后所设置的class
        initial : "headroom",
        // 向上滚动时设置的class
        pinned : "headroom--pinned",
        // 向下滚动时所设置的class
        unpinned : "headroom--unpinned"
    }
}
{% endhighlight %}

在 classes 里面，pinned、unpinned、top、notTop 分别代表在上滚，在下滚，到顶部和没在顶部。这儿有个坑，这四个类名必须是以 `initial` 的类名打头的。

### Demo

<div id="headroom-sticky" class="alert alert--info" role="alert">
    Stick to top
</div>
<div>
    <a id="starHeadroomBtn" type="button" class="btn btn-primary">启动固定</a>
    <a id="stopHeadroomBtn" type="button" class="btn btn-primary">停止固定</a>
</div>

{% highlight javascript %}
seajs.use(['jquery', 'js/ui/headroom'], function($, main) {
    // 获取页面元素
    var myElement = document.querySelector("#headroom-sticky");
    // 创建 Headroom 对象，将页面元素传递进去
    var headroom  = new Headroom(myElement, {
        "tolerance": 0,
        "offset": 0, // 距离顶部多少px后生效
        scroller: window,
        "classes": {
            'pinned' : 'headroom--pinned',
            'unpinned' : 'headroom--unpinned',
            'top' : 'headroom--top',
            'notTop' : 'headroom--not-top',
            'initial' : 'headroom'
        }
    });
    // is-fixed is-visible
    $('#starHeadroomBtn').on('click', function(event) {
        event.preventDefault();
        // 初始化
        headroom.init();
    });
    $('#stopHeadroomBtn').on('click', function(event){
        event.preventDefault();
        // to destroy
        headroom.destroy();
    });
});
{% endhighlight %}

### 动画

以 Demo 的动画为例。

{% highlight css %}
.headroom {
    position: fixed;
    z-index: 1010;
    top: -61px;
    left: 0;
    right: 0;
    transition: transform 0.3s;
}

.headroom.headroom--not-top {
    -webkit-transform: translate3d(0, 100%, 0);
       -moz-transform: translate3d(0, 100%, 0);
        -ms-transform: translate3d(0, 100%, 0);
         -o-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
}
{% endhighlight %}

### 不足

这样的实现方式简单粗暴，在头部导航栏和底部使用都很方便，但是如果是在一些需要计算的情景下，比如响应式布局，Headroom.js 就会显得有些疲软。于是参考 Amaze UI 的 sticky.js 使插件更加丰满。

## sticky

先看效果吧～

<div id="warningSticky" class="alert alert--warning" data-sticky>
    <h4>Sticked by Sticky <small>use data-* API</small></h4>
</div>

### 依赖

**JS**

该插件依赖于 jQuery 和 core.js。

**CSS**

_main.scss 添加

{% highlight css %}
@import 'components/sticky';
{% endhighlight %}

如果要动画，还需要加入 animation。

### 调用方式

**通过 Data API**

{% highlight html %}
<div class="alert alert--warning" data-sticky>
    <h4>Sticked by Sticky <small>use data-* API</small></h4>
</div>
{% endhighlight %}

通过添加 `data-sticky` 可以轻松将元素固定。

此外，可以通过例如： `data-sticky:{top: 80}` 这样的方式传递参数。

<div id="successSticky" class="alert alert--success" data-sticky="{top: 80}">
    <h4>Sticked by Sticky <small>use data-* API</small></h4>
</div>

{% highlight html %}
<div class="alert alert--success" data-sticky="{top: 80}">
    <h4>Sticked by Sticky <small>use data-* API</small></h4>
</div>
{% endhighlight %}

**通过 JS**

<div id="my-sticky" class="alert alert--danger">
    <h4>Sticked by Sticky <small>use jQuery</small></h4>
</div>
<div>
    <a id="starStickyBtn" type="button" class="btn btn-danger">启动固定</a>
    <a id="stopStickyBtn" type="button" class="btn btn-danger">停止固定</a>
</div>

{% highlight html %}
<div id="my-sticky" class="alert alert--danger">
    <h4>Sticked by Sticky <small>use jQuery</small></h4>
</div>
<div>
    <a id="starStickyBtn" type="button" class="btn btn-danger">启动固定</a>
    <a id="stopStickyBtn" type="button" class="btn btn-danger">停止固定</a>
</div>
{% endhighlight %}

{% highlight javascript %}
seajs.use(['jquery', 'js/ui/sticky'], function($, main) {
    $('#starStickyBtn').click(function(event) {
        $('#my-sticky').sticky({
            top: 150
        });
    });
    $('#stopStickyBtn').click(function(event) {
        $('#my-sticky').sticky('destroy');
    });
})
{% endhighlight %}

其中，`$().sticky();` 是启动固定，而 `$().sticky('destroy')` 是取消固定。

目前已知的 Bug 是由于对 `$window` 对象添加监听时使用了防抖函数，在取消固定时，暂时还没找到方法删除监听，在之后如果找到解决方法会及时补上。

<div>
    <a id="stopAllStickyBtn" type="button" class="btn btn-info btn-block">停止之前元素的固定</a>
</div>

### 动画

使用 sticky.js 添加动画并不是很方便，而且使得插件更加笨重，于是就想到利用 Headroom.js，使用过程只需要对 CSS 进行控制就好了。

接下来，以下面这个 Div 为例，

<div id="hr-sticky" class="alert alert--primary" data-sticky>
    <h4>Sticked by Sticky <small>animate by Headroom</small></h4>
</div>

先使用 sticky.js 的 `data-sticky` 标签将 Div 进行初始化。

{% highlight html %}
<div id="hr-sticky" class="alert alert--primary" data-sticky>
    <h4>Sticked by Sticky <small>animate by Headroom</small></h4>
</div>
{% endhighlight %}

再利用 Headroom.js 定义上滚、下滚的类名。

{% highlight javascript %}
seajs.use(['jquery', 'js/ui/headroom'], function($, main) {
    var ele = document.querySelector("#hr-sticky");
    var hd4animate = new Headroom(ele, {
        "tolerance": 0,
        "offset": 0,
        "classes": {
            'pinned' : 'hd--pinned',
            'unpinned' : 'hd--unpinned',
            'top' : 'hd-top',
            'notTop' : 'hd--not-top',
            'initial' : 'hd'
        }
    })
    $(document).ready(function() {
        hd4animate.init();
    });
});
{% endhighlight %}

最后再通过 CSS 添加动画。

{% highlight CSS %}
@-webkit-keyframes shake {
  from, to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%, 30%, 50%, 70%, 90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

@keyframes shake {
  from, to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%, 30%, 50%, 70%, 90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

.hd {
    animation-duration: 1s;
}

.hd.hd--unpinned {
    -webkit-animation-name: shake;
    animation-name: shake;
    animation-duration: 1s;
}
{% endhighlight %}




<script src="{{ "/js/sea.js " | prepend: site.baseurl }}" id="seajsnode"></script>
<script>
seajs.config({
    base: "{{ "/" | prepend: site.baseurl }}",
    alias: {
        "jquery": "js/jquery/jquery.js"
    }
});

seajs.use(['jquery', 'js/ui/headroom'], function($, main) {
    // 获取页面元素
    var myElement = document.querySelector("#headroom-sticky");
    // 创建 Headroom 对象，将页面元素传递进去
    var headroom  = new Headroom(myElement, {
        "tolerance": 0,
        "offset": 0, // 距离顶部多少px后生效
        scroller: window,
        "classes": {
            'pinned' : 'headroom--pinned',
            'unpinned' : 'headroom--unpinned',
            'top' : 'headroom-top',
            'notTop' : 'headroom--not-top',
            'initial' : 'headroom'
        }
    });
    // is-fixed is-visible
    $('#starHeadroomBtn').on('click', function(event) {
        event.preventDefault();
        // 初始化
        headroom.init();
    });
    $('#stopHeadroomBtn').on('click', function(event){
        event.preventDefault();
        // to destroy
        headroom.destroy();
    });

    var ele = document.querySelector("#hr-sticky");
    var hd4animate = new Headroom(ele, {
        "tolerance": 0,
        "offset": 0,
        "classes": {
            'pinned' : 'hd--pinned',
            'unpinned' : 'hd--unpinned',
            'top' : 'hd-top',
            'notTop' : 'hd--not-top',
            'initial' : 'hd'
        }
    })
    $(document).ready(function() {
        hd4animate.init();
    });
});

seajs.use(['jquery', 'js/ui/sticky'], function($, main) {
    $('#starStickyBtn').click(function(event) {
        $('#my-sticky').sticky({
            top: 150
        });
    });
    $('#stopStickyBtn').click(function(event) {
        $('#my-sticky').sticky('destroy');
    });
    $('#stopAllStickyBtn').click(function(event) {
        $('#my-sticky').sticky('destroy');
        $('#warningSticky').sticky('destroy');
        $('#successSticky').sticky('destroy');
    });
})
</script>
