---
layout: post_book
title: Amaze UI浅析（Alert组件 JS篇）
date: 2016-01-19
subtitle: 站在巨人的肩膀上
author: BookEl
---

# jquery & seajs 就决定是你了

由于对jquery和模块化的认识都很肤浅，就选择了相对熟悉些的 jquery + seajs 的组合来实现模块。

首先是增加了含有关闭按钮的样式 `.alert-dismissible`。

<div class="alert alert--danger alert-dismissible fade in">
    <button type="button" class="close" data-dismiss="alert">
        <i class="fa fa-remove"></i>
    </button>
    <p>您可以点击右上角的 X 来关闭这条消息。</p>
</div>

# 调用方式

### 通过 Data API

在关闭按钮上添加 `data-dismiss="alert"`

{% highlight html %}
<div class="alert alert--danger alert-dismissible fade in">
    <button type="button" class="close" data-dismiss="alert">
        <i class="fa fa-remove"></i>
    </button>
    <p>您可以点击右上角的 X 来关闭这条消息。</p>
</div>
{% endhighlight %}

### 通过 JS

关闭按钮开启交互功能：`$('#closeAlertBtn').alert()`

{% highlight html %}
<div class="alert alert-dismissible fade in">
    <button id="closeAlertBtn" type="button" class="close">
        <i class="fa fa-remove"></i>
    </button>
    <p>您可以点击右上角的 X 来关闭这条消息。</p>
</div>
{% endhighlight %}

{% highlight javascript %}
seajs.use(['jquery', 'js/ui/alert'], function($, main) {
    $('#closeAlertBtn').alert();
});
{% endhighlight %}

# 头好痛

头痛的事情还有很多，就比如 Bootstrap 配合自己的 fade in 两个类实现的交互效果，依赖自己的事件监听，想想头就大。

模块化也是个蛋疼的玩意儿，常见的模块化方式有 CMD、AMD、CommonJS，实现方式还不一样，如果项目用的框架换了，就得重新打包，烦烦烦。。。

alert.js 文件中还有几行代码我还不知道是在什么情境下触发，尼玛，整个人都不好了。。。。

<script src="{{ "/js/sea.js " | prepend: site.baseurl }}" id="seajsnode"></script>
<script>
seajs.config({
    base: "{{ "/" | prepend: site.baseurl }}",
    alias: {
        "jquery": "js/jquery/jquery.js"
    }
});

seajs.use('js/ui/alert');
</script>
