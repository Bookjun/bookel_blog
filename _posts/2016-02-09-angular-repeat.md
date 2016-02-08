---
layout: post_book
title: AngularJS入门(三) - 迭代器过滤
date: 2016-02-09
subtitle: 迭代器过滤 ng-repeat
author: BookEl
tags: AngularJS
---

<div class="alert">
    <div ng-app="helloApp" ng-controller="PhoneListCtrl">
        <div class="container-fluid">
            <div class="col-sm-3">
                <!--Sidebar content-->
                Search:
                <input ng-model="query">
            </div>
            <div class="col-sm-9">
                <!--Body content-->
                <ul class="phones">
                    <li ng-repeat="phone in phones | filter:query">
                        <span ng-bind="phone.name"></span>
                        <p><span ng-bind="phone.snippet"></span></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

对前篇的例子进行些许修改，控制器则不做改变：

{% highlight html %}
<div class="alert">
    <div ng-app="helloApp" ng-controller="PhoneListCtrl">
        <div class="container-fluid">
            <div class="col-sm-3">
                <!--Sidebar content-->
                Search:
                <input ng-model="query">
            </div>
            <div class="col-sm-9">
                <!--Body content-->
                <ul class="phones">
                    <li ng-repeat="phone in phones | filter:query">
                        <span ng-bind="phone.name"></span>
                        <p><span ng-bind="phone.snippet"></span></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
{% endhighlight %}

我们现在添加了一个 `<input>` 标签，并且使用 AngularJS 的 $filter 函数来处理 ngRepeat 指令的输入。一个简单的全文检索功能就实现了。

这样用户输入一个搜索条件，立刻就能看到对电话列表的搜索结果。来解释一下新的代码：

* 数据绑定： 在数据绑定过程中，用户在输入框中输入的数据名字称作 query，会立刻作为列表迭代器`（phone in phones | filter:query）` 其过滤器的输入。当数据模型引起迭代器输入变化的时候，迭代器可以高效得更新 DOM 将数据模型最新的状态反映出来。

* 使用 filter 过滤器：filter 函数使用 query 的值来创建一个只包含匹配 query 记录的新数组。ngRepeat会根据filter过滤器生成的手机记录数据数组来自动更新视图。整个过程对于开发者来说都是透明的。













<script src="{{ "/js/angular.min.js " | prepend: site.baseurl }}"></script>
<script>
    var app = angular.module('helloApp', []);
    app.controller('PhoneListCtrl', function($scope) {
        $scope.phones = [{
            "name": "Nexus S",
            "snippet": "Fast just got faster with Nexus S."
        }, {
            "name": "Motorola XOOM™ with Wi-Fi",
            "snippet": "The Next, Next Generation tablet."
        }, {
            "name": "MOTOROLA XOOM™",
            "snippet": "The Next, Next Generation tablet."
        }];
    });
</script>


