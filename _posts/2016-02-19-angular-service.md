---
layout: post_book
title: AngularJS入门(六) - 自定义服务
date: 2016-02-19
subtitle:
author: BookEl
tags: AngularJS
---

## 创建自定义服务

<div class="alert">
    <div id="myApp" ng-controller="myCtrl">
        <p> 3 ＋ 2 ＝ <span ng-bind="count"></span></p>
    </div>
</div>

**html**

{% highlight html %}
<div id="myApp" ng-controller="myCtrl">
    <p> 3 ＋ 2 ＝ <span ng-bind="count"></span></p>
</div>
{% endhighlight %}

**javascript**

要使用自定义的访问，需要在定义过滤器的时候独立添加:

{% highlight javascript %}
var app = angular.module('myApp', []);

app.service('addition', function() {
    this.myFunc = function (x, y) {
        return x + y;
    }
});

app.controller('myCtrl', function($scope, addition) {
  $scope.count = addition.myFunc(3, 2);
});
{% endhighlight %}

## 过滤器中，使用自定义服务

当创建了自定义服务，并连接到应用上后，可以在控制器、指令、过滤器或其他服务中使用它。

<div class="alert">
    <div id="filterApp">
        <p>255的16进制: <span ng-bind="255 | myFormat"></span></p>
        <p>128的16进制: <span ng-bind="128 | myFormat"></span></p>
    </div>
</div>

**html**

{% highlight html %}
<div id="myApp" ng-controller="myCtrl">
    <p> 3 ＋ 2 ＝ <span ng-bind="count"></span></p>
</div>
{% endhighlight %}

**javascript**

{% highlight javascript %}
var filterApp = angular.module('filterApp', []);
filterApp.service('hexafy', function() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});
filterApp.filter('myFormat',['hexafy', function(hexafy) {
    return function(x) {
        return hexafy.myFunc(x);
    };
}]);
{% endhighlight %}

在从对象或数组中获取值时可以使用过滤器：

<div class="alert">
    <div id="repeatApp" ng-controller="repeatCtrl">
        <p>在获取数组 [255, 251, 200] 值时使用过滤器:</p>
        <ul>
          <li ng-repeat="x in counts"><span ng-bind="x | myFormat"></span></li>
        </ul>
    </div>
</div>

**html**

{% highlight html %}
<div id="repeatApp" ng-controller="repeatCtrl">
    <p>在获取数组 [255, 251, 200] 值时使用过滤器:</p>
    <ul>
      <li ng-repeat="x in counts"><span ng-bind="x | myFormat"></span></li>
    </ul>
</div>
{% endhighlight %}

**javascript**

{% highlight javascript %}
var repeatApp = angular.module('repeatApp', []);
repeatApp.service('hexafy', function() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});
repeatApp.filter('myFormat',['hexafy', function(hexafy) {
    return function(x) {
        return hexafy.myFunc(x);
    };
}]);
repeatApp.controller('repeatCtrl', function($scope) {
    $scope.counts = [255, 251, 200];
});
{% endhighlight %}

## $timeout 服务

AngularJS $timeout 服务对应了 JS window.setTimeout 函数。

<div class="alert">
    <div id="timeoutApp" ng-controller="timeoutCtrl">
        <p>两秒后显示信息:</p>
        <h2><span ng-bind="myHeader"></span></h2>
    </div>
</div>

**html**

{% highlight html %}
<div id="timeoutApp" ng-controller="timeoutCtrl">
    <p>两秒后显示信息:</p>
    <h2><span ng-bind="myHeader"></span></h2>
</div>
{% endhighlight %}

**javascript**

{% highlight javascript %}
var timeoutApp = angular.module('timeoutApp', []);
timeoutApp.controller('timeoutCtrl', function($scope, $timeout) {
  $scope.myHeader = "Hello World!";
  $timeout(function () {
      $scope.myHeader = "How are you today?";
  }, 2000);
});
{% endhighlight %}

## $interval 服务

AngularJS $interval 服务对应了 JS window.setInterval 函数。

<div class="alert">
    <div id="intervalApp" ng-controller="intervalCtrl">
        <p>现在时间是:</p>
        <h2><span ng-bind="theTime"></span></h2>
    </div>
</div>

**html**

{% highlight html %}
<div ng-app="intervalApp" ng-controller="intervalCtrl">
    <p>现在时间是:</p>
    <h2><span ng-bind="theTime"></span></h2>
</div>
{% endhighlight %}

**javascript**

{% highlight javascript %}
var intervalApp = angular.module('intervalApp', []);
intervalApp.controller('intervalCtrl', function($scope, $interval) {
  $scope.theTime = new Date().toLocaleTimeString();
  $interval(function () {
      $scope.theTime = new Date().toLocaleTimeString();
  }, 1000);
});
{% endhighlight %}






<script src="{{ "/js/angular.min.js " | prepend: site.baseurl }}"></script>
<script>
    // 创建moudle1
    var app = angular.module('myApp', []);
    app.service('addition', function() {
        this.myFunc = function (x, y) {
            return x + y;
        }
    });
    app.controller('myCtrl', function($scope, addition) {
      $scope.count = addition.myFunc(3, 2);
    });

    // 创建moudle2
    var filterApp = angular.module('filterApp', []);
    filterApp.service('hexafy', function() {
        this.myFunc = function (x) {
            return x.toString(16);
        }
    });
    filterApp.filter('myFormat',['hexafy', function(hexafy) {
        return function(x) {
            return hexafy.myFunc(x);
        };
    }]);

    // 创建moudle3
    var repeatApp = angular.module('repeatApp', []);
    repeatApp.service('hexafy', function() {
        this.myFunc = function (x) {
            return x.toString(16);
        }
    });
    repeatApp.filter('myFormat',['hexafy', function(hexafy) {
        return function(x) {
            return hexafy.myFunc(x);
        };
    }]);
    repeatApp.controller('repeatCtrl', function($scope) {
        $scope.counts = [255, 251, 200];
    });

    // 创建moudle4
    var timeoutApp = angular.module('timeoutApp', []);
    timeoutApp.controller('timeoutCtrl', function($scope, $timeout) {
      $scope.myHeader = "Hello World!";
      $timeout(function () {
          $scope.myHeader = "How are you today?";
      }, 2000);
    });

    // 创建moudle5
    var intervalApp = angular.module('intervalApp', []);
    intervalApp.controller('intervalCtrl', function($scope, $interval) {
      $scope.theTime = new Date().toLocaleTimeString();
      $interval(function () {
          $scope.theTime = new Date().toLocaleTimeString();
      }, 1000);
    });

    angular.element(document).ready(function(){
        angular.bootstrap(document.getElementById("myApp"),["myApp"]);
        angular.bootstrap(document.getElementById("filterApp"),["filterApp"]);
        angular.bootstrap(document.getElementById("repeatApp"),["repeatApp"]);
        angular.bootstrap(document.getElementById("timeoutApp"),["timeoutApp"]);
        angular.bootstrap(document.getElementById("intervalApp"),["intervalApp"]);
    });
</script>

