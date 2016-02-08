---
layout: post_book
title: AngularJS入门(二) - 控制器
date: 2016-02-06
subtitle: 控制器 Controller
author: BookEl
tags: AngularJS
---

## 试试使用控制器 Controller

<div class="alert" >
    <div ng-app="myApp" ng-controller="personCtrl">
        <div>姓:<input type="text" ng-model="firstName"></div>
        <div>名:<input type="text" ng-model="lastName"></div>
        <h3>姓名: <span ng-bind="firstName + ' ' + lastName"></span></h3>
        <ul>
            <li ng-repeat="phone in phones">
                <h5 ng-bind="phone.name"></h5>
                <p ng-bind="phone.snippet"></p>
            </li>
        </ul>
    </div>
</div>

**HTML**

{% highlight html %}
<div ng-app="myApp" ng-controller="personCtrl">
    <div>姓:<input type="text" ng-model="firstName"></div>
    <div>名:<input type="text" ng-model="lastName"></div>
    <h3>姓名: <span ng-bind="firstName + ' ' + lastName"></span></h3>
    <ul>
        <li ng-repeat="phone in phones">
            <h5 ng-bind="phone.name"></h5>
            <p ng-bind="phone.snippet"></p>
        </li>
    </ul>
</div>
{% endhighlight %}

**JavaScript**

{% highlight javascript %}
var app = angular.module('myApp', []);
app.controller('personCtrl', function($scope) {
    $scope.firstName = "施";
    $scope.lastName = "丢披徳";
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    }
    $scope.phones = [
        {"name": "Nexus S",
         "snippet": "Fast just got faster with Nexus S."},
        {"name": "Motorola XOOM™ with Wi-Fi",
         "snippet": "The Next, Next Generation tablet."},
        {"name": "MOTOROLA XOOM™",
         "snippet": "The Next, Next Generation tablet."}
      ];
});
{% endhighlight %}

其中 js 代码可以分为两块：

AngularJS 模块定义应用:


{% highlight javascript %}
var app = angular.module('myApp', []);
{% endhighlight %}

AngularJS 控制器控制应用:

{% highlight javascript %}
app.controller('personCtrl', function($scope) {
    $scope.firstName = "施";
    $scope.lastName = "丢披徳";
});
{% endhighlight %}

`personCtrl` 控制器方法的名字，和 `ng-app` 标签里面的 `ng-controller` 的值相匹配。

`$scope` 控制器函数的作用域，对所在 `ng-controller` 标记内部的所有数据绑定有效。

`ng-repeat` 迭代器，指令对于集合中（数组中）的每个项会**克隆一次** HTML 元素。



<script src="{{ "/js/angular.min.js " | prepend: site.baseurl }}"></script>

<script>
var app = angular.module('myApp', []);
app.controller('personCtrl', function($scope) {
    $scope.firstName = "施";
    $scope.lastName = "丢披徳";
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    }
    $scope.phones = [
        {"name": "Nexus S",
         "snippet": "Fast just got faster with Nexus S."},
        {"name": "Motorola XOOM™ with Wi-Fi",
         "snippet": "The Next, Next Generation tablet."},
        {"name": "MOTOROLA XOOM™",
         "snippet": "The Next, Next Generation tablet."}
      ];
});
</script>
