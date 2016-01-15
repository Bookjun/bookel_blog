---
layout: post_book
title: Amaze UI浅析（字体）
subtitle: 国内首个开源 HTML5 跨屏前端框架
author: BookEl
---

<style>
    .font-family-sans-serif{
        font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans","wenquanyi micro hei","Hiragino Sans GB", "Hiragino Sans GB W3", "FontAwesome", sans-serif;
    }
    .font-family-serif {
        font-family: Georgia, "Times New Roman", Times, SimSun, "FontAwesome", serif;
    }
    .font-family-monospace {
        font-family: Monaco, Menlo, Consolas, "Courier New", "FontAwesome", monospace;
    }
    .font-family-kai {
        font-family: Georgia, "Times New Roman", Times, Kai, "Kaiti SC", KaiTi, BiauKai, "FontAwesome", serif;
    }
    .smoothing--on {
         -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .smoothing--off {
         -webkit-font-smoothing: subpixel-antialiased;
        -moz-osx-font-smoothing: auto;
    }
</style>

[Amaze UI](http://amazeui.org/)相比国外框架，更关注中文排版，根据用户代理调整字体，实现更好的中文排版效果；兼顾国内主流浏览器及 App 内置浏览器兼容支持。于是开始逐个插件开始解析起来～

先来看看 Amaze UI 的字体选择:

{% highlight css %}
body {
  font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans","wenquanyi micro hei","Hiragino Sans GB", "Hiragino Sans GB W3", Arial, sans-serif;
}
{% endhighlight %}

CSS 定义了5种通用字体系列，分别是 Serif、Sans-serif、Monospace、Cursive、Fantasy。与之相对的就是特定字体系列，就是有具体名字的字体。特定型字体是通用字体的子类。

因此，在定义字体时候，利用 CSS 优先顺序的机制，可以轻易地实现在保证视觉效果的前提下保证兼容，即用户机器没有特定字体的时候采用通用字体。

{% highlight css %}
h1 {font-family: Georgia, serif;}
{% endhighlight %}

如果读者没有安装 Georgia，但安装了 Times 字体（serif 字体系列中的一种字体），用户代理就可能对 h1 元素使用 Times。尽管 Times 与 Georgia 并不完全匹配，但至少足够接近。

说完了 CSS 字体机制后再说回到 Amaze UI 的字体。

{% highlight css %}
@font-family-sans-serif: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans","wenquanyi micro hei","Hiragino Sans GB", "Hiragino Sans GB W3", "FontAwesome", sans-serif;

@font-family-serif: Georgia, "Times New Roman", Times, SimSun, "FontAwesome", serif; //FangSong, STFangSong

@font-family-monospace: Monaco, Menlo, Consolas, "Courier New", "FontAwesome", monospace;

@font-family-kai: Georgia, "Times New Roman", Times, Kai, "Kaiti SC", KaiTi, BiauKai, "FontAwesome", serif;
{% endhighlight %}

Amaze UI 针对不同类型，都进行了申明，现在将它们一个个试试。

`sans-serif` **非衬线字体**，Amaze UI 主要使用的。

<pre>
    <div class="font-family-sans-serif">
        The quick brown fox jumps over the lazy dog.
        千万不要因为走得太久，而忘记了我们为什么出发。
        千萬不要因為走得太久，而忘記了我們為什麼出發。
    </div>
</pre>

`serif` **衬线字体**，中文显示宋体，Amaze UI 中未使用。

<pre>
    <div class="font-family-serif">
        The quick brown fox jumps over the lazy dog.
        千万不要因为走得太久，而忘记了我们为什么出发。
        千萬不要因為走得太久，而忘記了我們為什麼出發。
    </div>
</pre>

`monospace` **数字英文显示衬线字体，中文显示楷体**。和 `.am-serif` 的区别仅在于中文字体，Amaze UI 中把 `<blockquote>` 的字体设置成了 `.am-kai`。

<pre>
    <div class="font-family-monospace">
    The quick brown fox jumps over the lazy dog.
    千万不要因为走得太久，而忘记了我们为什么出发。
    千萬不要因為走得太久，而忘記了我們為什麼出發。
    </div>
</pre>

`kai` **等宽字体**，Amaze UI 源代码中使用。

<pre>
    <div class="font-family-kai">
        The quick brown fox jumps over the lazy dog.
        千万不要因为走得太久，而忘记了我们为什么出发。
        千萬不要因為走得太久，而忘記了我們為什麼出發。
    </div>
</pre>

另外，Amaze UI还为 Webkit 浏览器添加了反锯齿平滑渲染，渲染出来更纤细，其他内核的浏览器上看着稍粗一些。

**开启反锯齿** `-webkit-font-smoothing: antialiased;`

<pre>
    <div class="smoothing--on">
    The quick brown fox jumps over the lazy dog.
    千万不要因为走得太久，而忘记了我们为什么出发。
    千萬不要因為走得太久，而忘記了我們為什麼出發。
    </div>
</pre>

{% highlight css %}
body {
   -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
{% endhighlight %}

**未开启反锯齿** `-webkit-font-smoothing: subpixel-antialiased;`

<pre>
    <div class="smoothing--off">
    The quick brown fox jumps over the lazy dog.
    千万不要因为走得太久，而忘记了我们为什么出发。
    千萬不要因為走得太久，而忘記了我們為什麼出發。
    </div>
</pre>

{% highlight css %}
body {
   -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
}
{% endhighlight %}

