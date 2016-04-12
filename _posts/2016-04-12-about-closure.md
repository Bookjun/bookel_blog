---
layout: post_book
title: 学习Javascript闭包
date: 2016-04-12
subtitle: 闭包（closure）是Javascript语言的一个难点，也是它的特色，很多高级应用都要依靠闭包实现。
author: BookEl
tags: javascript
---

> 文章是阮一峰老师的 <a href="http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html" class="external-link" target="_blank"> 学习Javascript闭包（Closure） </a> 文章的读书笔记。

## 一句话概括闭包

闭包就是能够读取其他函数内部变量的函数。

### 闭包的用途

一个是读取其他函数内部的变量，另一个就是这些变量的值，始终保持在内存中。

要理解闭包的原理，先理解以下内容。

## 变量的作用域

Javascript 变量的作用域就两种：全局变量和局部变量。

Javascript 语言的特殊之处，就在于函数内部可以直接读取全局变量。

{% highlight javascript %}
var n = 999;

function f1() {
    alert(n);
}

f1(); // 999
{% endhighlight %}

另一方面，在函数外部自然无法读取函数内的局部变量。

{% highlight javascript %}
function f1() {
    var n = 999;
}
alert(n); // error
{% endhighlight %}

<div class="alert alert--info">
这里有一个地方需要注意，函数内部声明变量的时候，一定要使用 <code>var</code> 命令。如果不用的话，你实际上声明了一个<b>全局变量</b>！
</div>

## 从外部读取局部变量

接下来我们看看，如何利用闭包读取其他函数内部的变量。

再定义一个函数。

{% highlight javascript %}
function f1 () {
    var n = 999;
    function f2 () {
        alert(n); // 999
    }
}
{% endhighlight %}

根据 javascript 特性，f2 可以看到 f1内部的所有局部变量。但是 f2 内部的局部变量对 f1 就是不可见的。

这样，只要把 f2 作为返回值就可以在 f1 外部获取 f2 的内部变量。

{% highlight javascript %}
function f1 () {
    var n = 999;
    function f2 () {
        alert(n);
    }
    return f2;
}

var result = f1();
result(); // 999
{% endhighlight %}

到这里，就是最简单的对闭包的理解。