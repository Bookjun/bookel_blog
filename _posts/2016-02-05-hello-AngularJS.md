---
layout: post_book
title: AngularJS入门 - Hello AngularJS
date: 2016-02-05
subtitle: 还不算太迟吧
author: BookEl
tags: AngularJS
---

## 学习 AngularJS

反复学习 AngularJS 这是第三次了，第一次是在2014年刚从 Java 开发转做前端的时候，经理推荐我去学习 AngularJS，当时没有想好自己的方向只是马马虎虎地看了几眼。直到2015年工作经验的积累才发现原来当时经理许许多多的建议都是那么有用，于是第二次看了 AngularJS。但是还是没能真正体会它的方便，趁着这个假日有时间再认认真真总结一下。

## 就这样开始了

{% highlight html %}
<div ng-app="">
    <div>第一个例子，在输入框输入的内容会绑定到下面的 p 标签中。</div>
    <div>请输入：<input type="text" ng-model="simpleInput"></div>
    <div><span ng-bind="'输入的内容是：' + simpleInput"></span></div>
</div>
{% endhighlight %}

<pre>
    <div ng-app="">
        <div>第一个例子，在输入框输入的内容会绑定到下面的 <code>p</code> 标签中。</div>
        <div>请输入：<input type="text" ng-model="simpleInput"></div>
        <div><span ng-bind="'输入的内容是：' + simpleInput"></span></div>
    </div>
</pre>

在这个例子中出现的关键字有 `ng-app` 、 `ng-model` 和 `ng-bind`。当网页加载完毕，AngularJS 自动开启。

* **ng-app** 指令定义一个 AngularJS 应用程序。告诉 AngularJS 持有这个属性的标签是 AngularJS 应用程序 的"所有者"。

* **ng-model** 指令把元素值（比如输入域的值）绑定到应用程序，可以看成是一种数据源。

* **ng-bind** 指令把应用程序数据绑定到 HTML 视图。(更简单的方式是使用 <code>&#123;&#123; &#125;&#125;</code>，但是和 jekyll 有冲突)

## AngularJS 表达式

AngularJS 表达式写在双大括号内：&#123;&#123; expression &#125;&#125;。

AngularJS 表达式把数据绑定到 HTML，这与 ng-bind 指令有异曲同工之妙。

AngularJS 将在表达式书写的位置"输出"数据。

AngularJS 表达式 很像 JavaScript 表达式：它们可以包含文字、运算符和变量。
<script src="{{ "/js/angular.min.js " | prepend: site.baseurl }}"></script>

