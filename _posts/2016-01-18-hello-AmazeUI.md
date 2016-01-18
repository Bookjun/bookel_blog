---
layout: post_book
title: Amaze UI浅析（Alert组件）
date: 2016-01-18
subtitle: 国内首个开源 HTML5 跨屏前端框架
author: BookEl
---

现阶段的目标是挖掘好的，学习前辈们的思路。

# 六种状态

参考 Bootstrap，为 Alert 设置了6种状态，default、primary、success、info、warning、danger。

<div class="alert">
Hello World.
</div>

<div class="alert alert--primary">
有一些内容你可能需要知道。
</div>

<div class="alert alert--success">
一切已准备就绪。
</div>

<div class="alert alert--info">
Hi! 这条消息可能需要你注意。
</div>

<div class="alert alert--warning">
注意! 看起来遇到一些问题。
</div>

<div class="alert alert--danger">
不好了!确实遇到了问题，请立即处理吧。
</div>

# 配合我最爱的 Font Awesome

参考 <a href="http://www.zui.sexy/#component/alert" class="external-link" target="_blank">Z UI</a>，在消息框内添加合适的图标，让用户更直观感知消息框信息的重要程度。`.alert` 配合上 `.with-icon` 一起使用。

<div class="alert alert--danger with-icon">
    <i class="fa fa-times"></i>
    <div class="content">
        <h4>不好了!</h4>
        <p>确实遇到了问题，请立即处理吧。</p>
    </div>
</div>

# 带有链接，尽情发挥

此外，在实际使用中经常遇到消息框内含有链接，为链接添加 `.alert-link` 达到根据情景展示的效果。

<div class="alert alert--success">
一切已<a href="#" class="alert-link">准备就绪</a>。
</div>

<div class="alert alert--warning">
注意! 看起来遇到<a href="#" class="alert-link">一些问题</a>。
</div>

# 未完待续

再来就是配合 js 实现关闭、隐藏消息框。不过实在太迟了，得赶紧睡了。。。
