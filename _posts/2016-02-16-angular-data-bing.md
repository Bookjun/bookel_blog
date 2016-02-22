---
layout: post_book
title: AngularJS入门(四) - 双向绑定
date: 2016-02-16
author: BookEl
tags: AngularJS
---

在上一篇文章中已经让列表可以通过过滤器进行筛选，现在试试对列表实现动态排序。

<div class="alert">
    <div ng-app="helloApp" ng-controller="PhoneListCtrl">
        <div class="container-fluid">
            <div class="col-sm-3">
                Search: <input ng-model="query">
                Sort by:
                <select ng-model="orderProp">
                    <option value="name">Alphabetical</option>
                    <option value="age">Newest</option>
                </select>
            </div>
            <div class="col-sm-9">
                <ul class="phones">
                    <li ng-repeat="phone in phones | filter:query | orderBy:orderProp">
                        <span ng-bind="phone.name"></span>
                        <p><span ng-bind="phone.snippet"></span></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

{% highlight html %}
<div ng-app="helloApp" ng-controller="PhoneListCtrl">
    <div class="container-fluid">
        <div class="col-sm-3">
            Search: <input ng-model="query">
            Sort by:
            <select ng-model="orderProp">
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
            </select>
        </div>
        <div class="col-sm-9">
            <ul class="phones">
                <li ng-repeat="phone in phones | filter:query | orderBy:orderProp">
                    <span ng-bind="phone.name"></span>
                    <p><span ng-bind="phone.snippet"></span></p>
                </li>
            </ul>
        </div>
    </div>
</div>
{% endhighlight %}

在页面上我们增加了一个叫做 `orderProp` 的 `<select>` 标签，这样我们的用户就可以选择我们提供的两种排序方法。

然后，在 `filter` 过滤器后面添加一个 `orderBy` 过滤器用其来处理进入迭代器的数据。`orderBy` 过滤器以一个数组作为输入，复制一份副本，然后把副本重排序再输出到迭代器。

AngularJS 在 `select` 元素和 `orderProp` 模型之间创建了一个双向绑定。而后，`orderProp` 会被用作 `orderBy` 过滤器的输入。无论什么时候数据模型发生了改变（比如用户在下拉菜单中选了不同的顺序），AngularJS 的数据绑定会让视图自动更新。没有任何笨拙的 DOM 操作！

{% highlight javascript %}
var app = angular.module('helloApp', []);
app.controller('PhoneListCtrl', function($scope) {
    $scope.phones = [{
        "name": "Nexus S",
        "snippet": "Fast just got faster with Nexus S.",
        "age": 1
    }, {
        "name": "Motorola XOOM™ with Wi-Fi",
        "snippet": "The Next, Next Generation tablet.",
        "age": 2
    }, {
        "name": "MOTOROLA XOOM™",
        "snippet": "The Next, Next Generation tablet.",
        "age": 3
    }];
    $scope.orderProp = 'age';
});
{% endhighlight %}

在控制器中，修改了 `phones` 模型—— 手机的数组 ——为每一个手机记录其增加了一个 `age` 属性。我们会根据 `age` 属性来对手机进行排序。


<script src="{{ "/js/angular.min.js " | prepend: site.baseurl }}"></script>
<script>
    var app = angular.module('helloApp', []);
    app.controller('PhoneListCtrl', function($scope) {
        $scope.phones = [{
            "name": "Nexus S",
            "snippet": "Fast just got faster with Nexus S.",
            "age": 1
        }, {
            "name": "Motorola XOOM™ with Wi-Fi",
            "snippet": "The Next, Next Generation tablet.",
            "age": 2
        }, {
            "name": "MOTOROLA XOOM™",
            "snippet": "The Next, Next Generation tablet.",
            "age": 3
        }];
        $scope.orderProp = 'age';
    });
</script>