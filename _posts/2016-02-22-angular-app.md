---
layout: post_book
title: AngularJS入门(七) - 模块的手动加载
date: 2016-02-22
subtitle: 这章内容本应在上一章之前总结的...
author: BookEl
tags: AngularJS
---

<div class="alert">
    <div id="div1" ng-controller="controller1">
        div1:<span ng-bind="name"></span>
    </div>
    <div id="div2" ng-controller="controller2">
        div2:<span ng-bind="name"></span>
    </div>
</div>

**html**

{% highlight html %}
<div id="div1" ng-controller="controller1">
    div1:<span ng-bind="name"></span>
</div>
<div id="div2" ng-controller="controller2">
    div2:<span ng-bind="name"></span>
</div>
{% endhighlight %}

**javascript**

要去掉页面里的 `ng-app`，因为手动引导就是通过 bootstrap。 再弄个 `ng-app`，两个入口，会造成 anguar 的异常。

{% highlight javascript %}
// 创建moudle1
var rootMoudle = angular.module('moudle1', []);
rootMoudle.controller("controller1",function($scope){$scope.name="aty"});

// 创建moudle2
var m2 = angular.module('moudle2', []);
m2.controller("controller2",function($scope){$scope.name="aty"});

// 页面加载完成后,再加载模块
angular.element(document).ready(function() {
  angular.bootstrap(document.getElementById("div1"),["moudle1"]);
  angular.bootstrap(document.getElementById("div2"),["moudle2"]);
});
{% endhighlight %}


<script src="{{ "/js/angular.min.js " | prepend: site.baseurl }}"></script>
<script>
    // 创建moudle1
    var rootMoudle = angular.module('moudle1', []);
    rootMoudle.controller("controller1",function($scope){$scope.name="aty"});

    // 创建moudle2
    var m2 = angular.module('moudle2', []);
    m2.controller("controller2",function($scope){$scope.name="aty"});

    // 页面加载完成后,再加载模块
    angular.element(document).ready(function() {
      angular.bootstrap(document.getElementById("div1"),["moudle1"]);
      angular.bootstrap(document.getElementById("div2"),["moudle2"]);
    });
</script>

