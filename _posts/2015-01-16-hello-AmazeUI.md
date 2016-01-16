---
layout: post_book
title: Amaze UI浅析（概述）
subtitle: 国内首个开源 HTML5 跨屏前端框架
author: BookEl
---

# 响应式断点

|尺寸|断点区间|描述|
|-|-|-|
|sm|0-640px|处理绝大数手机的横竖屏模式|
|-|-|-|
|md|641-1024px|平板的横竖屏模式
|-|-|-|
|lg|1025+px|桌面设备|

bootstrap 推荐的 `meta` 标签为

{% highlight css %}
<meta name="viewport" content="width=device-width, initial-scale=1">
{% endhighlight %}

然后是 Amaze UI 的

{% highlight css %}
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
{% endhighlight %}

* 其中 `width=device-width` 声明可视区域为设备宽度。
* `intial-scale` 为页面首次被显示时可视区域的**缩放级别**，取值1.0则页面按实际尺寸显示，无任何缩放。
* `maximum-scale=1` 顾名思义，最大缩放级别，限制用户放大超过实际尺寸。
* `user-scalable` 是否可对页面进行缩放，no 禁止缩放。

这也是响应式的开始。

# 不知道的国情

## 360的双核

国内的主流浏览器都是双核浏览器，基于Webkit内核用于常用网站的高速浏览。基于IE的内核用于兼容网银、旧版网站。<a href="http://se.360.cn/v6/help/meta.html" class="external-link" target="_blank">360 浏览器从 6.5</a> 开始，添加这样一行代码，360浏览器就知道该用Webkit内核渲览。

{% highlight html %}
<meta name="renderer" content="webkit">
{% endhighlight %}

## 百度的马甲

如果你的网站不想被剥去外衣、往赤裸的身体上贴广告，就加上<a href="http://m.baidu.com/pub/help.php?pn=22&ssid=0&from=844b&bd_page_type=1" class="external-link" target="_blank_">下面的代码</a>。

{% highlight html %}
<meta http-equiv="Cache-Control" content="no-siteapp" />
{% endhighlight %}








