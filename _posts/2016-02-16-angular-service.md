---
layout: post_book
title: AngularJS入门(五) - Servie
date: 2016-02-16
subtitle:
author: BookEl
tags: AngularJS
---

## 什么是服务？

在 AngularJS 中，服务是一个函数或对象。

### $location 服务

$location 可以返回当前页面的 URL 地址。

<div class="alert">
    <div ng-app="locationApp" ng-controller="locationCtrl">
        <p> 当前页面的url:</p>
        <p><span ng-bind="myUrl"></span></p>
    </div>
</div>

**html**

{% highlight html %}
<div ng-app="locationApp" ng-controller="locationCtrl">
    <p> 当前页面的url:</p>
    <p><span ng-bind="myUrl"></span></p>
</div>
{% endhighlight %}

**javascript**

{% highlight javascript %}
var locationApp = angular.module('locationApp', []);
locationApp.controller('locationCtrl', function($scope, $location) {
    $scope.myUrl = $location.absUrl();
});
{% endhighlight %}

AngularJS 会一直监控应用，处理事件变化， AngularJS 使用 $location 服务比使用 window.location 对象更好。

<div class="alert alert--warning">注意 $location 服务是作为一个参数传递到 controller 中。如果要使用它，需要在 controller 中定义。</div>

### $http 服务

<div class="alert">
    <div ng-app="httpApp" ng-controller="httpCtrl">
        <p> 请求的页面:</p>
        <p><span ng-bind="targetUrl"></span></p>
    </div>
</div>

**html**

{% highlight html %}
<div ng-app="httpApp" ng-controller="httpCtrl">
    <p> 请求的页面:</p>
    <p><span ng-bind="targetUrl"></span></p>
</div>
{% endhighlight %}

**javascript**

{% highlight javascript %}
var httpApp = angular.module('httpApp', []);
httpApp.controller('httpCtrl', function($scope, $http) {
    $http.get("www.baidu.com").then(function (response) {
        $scope.targetUrl = response.data;
    });
});
{% endhighlight %}

好吧，我找不到好例子。。



<script src="{{ "/js/angular.min.js " | prepend: site.baseurl }}"></script>
<script>
    var locationApp = angular.module('locationApp', []);
    locationApp.controller('locationCtrl', function($scope, $location) {
        $scope.myUrl = $location.absUrl();
    });
    var httpApp = angular.module('httpApp', []);
    httpApp.controller('httpCtrl', function($scope, $http) {
        $http.get("www.baidu.com").then(function (response) {
            $scope.targetUrl = response.data;
        });
    });
</script>