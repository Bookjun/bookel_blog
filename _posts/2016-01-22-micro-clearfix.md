---
layout: post_book
title: 更健壮的clearfix
date: 2016-01-22
subtitle: 稳定且跨浏览器兼容，还能避免顶层margin缩回的问题。
author: BookEl
---

## 清除浮动

清除一个 `<div>` 过去意味着额外的 DOM，因为这会涉及到增加一个额外的清除元素。更好的办法是给父元素设置明确的宽度（`'auto'` 并不是在所有浏览器和场景中有效）以及把 `overflow` 属性设为 `'auto'` 或者 `'hidden'` 。`'hidden'` 显然兼容性更好，但在某些兼容 IE 的版本里 `'auto'` 的效果好一些。

**HTML:**

{% highlight html %}
<div class="parentElement">
    <div class="childElement">
        I'm floated left!
    </div>
    I'm normal text that wraps around the float
</div>
{% endhighlight %}

**CSS:**

{% highlight css %}
.parentElement {
    width: 100%;
    overflow: hidden;
}
.childElement {
    float: left;
}
{% endhighlight %}

## micro clearfix

以下是<a href="http://nicolasgallagher.com/micro-clearfix-hack/" class="external-link" target="_blank">micro clearfix</a>的介绍：

clearfix 是一种流行的清除浮动的方式，而且不需要产生额外的 DOM。本文介绍的对 clearfix 的改进将极大减少 CSS 的代码量。

Demo:<a href="http://nicolasgallagher.com/micro-clearfix-hack/demo/" class="external-link" target="_blank">Micro clearfix hack</a>

*目前支持的浏览器版本：*  Firefox 3.5+, Safari 4+, Chrome, Opera 9+, IE 6+

“micro clearfix” 方式更适合现在流行的浏览器。它是建立在 Thierry Koblentz <a href="http://www.yuiblog.com/blog/2010/09/27/clearfix-reloaded-overflowhidden-demystified/" class="external-link" target="_blank">“关于clearfix重载”</a>的理论基础上，这篇文章介绍了 `:before` 和 `:after` 伪元素的使用。

以下是 micro clearfix 的代码：

{% highlight css %}
/**
 * For modern browsers
 * 1. The space content is one way to avoid an Opera bug when the
 *    contenteditable attribute is included anywhere else in the document.
 *    Otherwise it causes space to appear at the top and bottom of elements
 *    that are clearfixed.
 * 2. The use of `table` rather than `block` is only necessary if using
 *    `:before` to contain the top-margins of child elements.
 */
.cf:before,
.cf:after {
    content: " "; /* 1 */
    display: table; /* 2 */
}

.cf:after {
    clear: both;
}

/**
 * For IE 6/7 only
 * Include this rule to trigger hasLayout and contain floats.
 */
.cf {
    *zoom: 1;
}
{% endhighlight %}

“micro clearfix” 通过添加伪元素和设置 `display` 为 `table` 实现。添加一个 `table-cell` 和一个新的 `block` 上下文环境，伪元素就能有效地避免顶部 margin 回缩的问题。`:after` 则负责清除浮动。这样的好处：无须隐藏任何已经产生的内容并且减少所需的代码。

代码中的 `:before` 对清除浮动没有作用，但是它能有效防止顶部 margin 回缩：

* 它保证了与其他通过新增块元素产生浮动的技术搭配时，例如 `overflow:hidden`，能有同样的视觉效果。

* 它保证了在 IE 6/7 下保持同样的视觉效果。



