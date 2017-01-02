---
layout: post_book
title: Vue 学习笔记－－起步
subtitle: 从安装开始
date: 2016-12-06
author: BookEl
tags: Vue
---

## 安装

用 nodejs，确认版本最新，方便接下来的操作。

1.安装 Vue

{% highlight ruby %}
npm install vue
{% endhighlight %}

2.安装 Vue 脚手架，之后才用 cli 新建项目

{% highlight ruby %}
npm install --global vue-cli
{% endhighlight %}

3.进入放工程的文件夹

{% highlight ruby %}
cd 目录路径
{% endhighlight %}

4.根据模板创建项目

{% highlight ruby %}
vue init webpack vue-example
{% endhighlight %}

5.进入项目

{% highlight ruby %}
cd vue-example
{% endhighlight %}

6.安装依赖

{% highlight ruby %}
npm install
{% endhighlight %}

安装依赖过程遇到点问题，由于网络问题一直下载不来，于是使用淘宝镜像进行安装

安装淘宝镜像

{% highlight ruby %}
npm install -g cnpm --registry=https://registry.npm.taobao.org
{% endhighlight %}

执行依赖安装

{% highlight ruby %}
cnpm install
{% endhighlight %}

7.启动项目，启动成功自动打开浏览器

{% highlight ruby %}
npm run dev
{% endhighlight %}

项目终于成功搭建好了。

## 如何开始

网站打开后定位到index.html，里面的代码非常简单。

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>vue-example</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
{% endhighlight %}

结构和 AngularJS 类似，于是在 src 文件夹下找到了 `App.vue`。观察文件结构，发现由三个部分组成，其中 `template` 对应 html 内容，`script` 是 js 代码，`style` 则是用来写样式。

在 template 里看到一个奇怪的标签 `<hello></hello>`，在 script 中可以看出来 import 了一个组件，组件名字叫 `Hello`。于是继续查找文件 `Hello.vue`。

{% highlight javascript %}
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
{% endhighlight %}

在 Hello 组件里，结合展示出来的页面可以看出它向外提供了内容为 `<div class="hello">...</div>` 的元素。这部分替换了 App.vue 的 `<hello>` 标签。

## First Page

学着 Hello.vue 依样画葫芦，创建了 FirstPage.vue。遇到尴尬的事，<kbd>tab</kbd> 不能用！只能用空格。后来找到原因，因为我 sublime 设置的 `tab_size: 4`，而 esLint 则是 `tab_size: 2`。

还有一个问题，我发现 export 设置的 name 好像随便取都没影响？




