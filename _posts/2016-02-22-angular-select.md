---
layout: post_book
title: AngularJS入门(八) - Select(选择框)
date: 2016-02-22
subtitle: AngularJS 可以使用数组或对象创建一个下拉列表选项。
author: BookEl
tags: AngularJS
---

## ng-options 创建选择框

在 AngularJS 中可以使用 ng-option 指令来创建一个下拉列表，列表项通过对象和数组循环输出，如下实例:

<div class="alert">
    <div id="optionsApp" ng-controller="optionsCtrl">
        <select ng-model="selectedName" ng-options="x for x in names"></select>
    </div>
</div>

**html**

{% highlight html %}
<div id="optionsApp" ng-controller="optionsCtrl">
    <select ng-model="selectedName" ng-options="x for x in names"></select>
</div>
{% endhighlight %}

{% highlight javascript %}
var optionsApp = angular.module('optionsApp', []);
optionsApp.controller('optionsCtrl', function($scope) {
    $scope.names = ["Google", "Runoob", "Taobao"];
});
{% endhighlight %}

## ng-repeat 创建选择框

我们也可以使用ng-repeat 指令来创建下拉列表：

<div class="alert">
    <div id="repeatApp" ng-controller="repeatCtrl">
        <select>
            <option ng-repeat="x in names">&#123;&#123; x &#125;&#125;</option>
        </select>
    </div>
</div>

{% highlight html %}
<div id="repeatApp" ng-controller="repeatCtrl">
    <select>
        <option ng-repeat="x in names">&#123;&#123; x &#125;&#125;</option>
    </select>
</div>
{% endhighlight %}

{% highlight javascript %}
var repeatApp = angular.module('repeatApp', []);
repeatApp.controller('repeatCtrl', function($scope) {
    $scope.names = ["Google", "Runoob", "Taobao"];
});
{% endhighlight %}

## 应该用哪个更好?

`ng-repeat` 指令是通过数组来循环 HTML 代码来创建下拉列表，但 `ng-options` 指令更适合创建下拉列表，它有以下优势：

使用 `ng-options` 的选项的一个对象， `ng-repeat` 是一个字符串。

假设我们使用以下对象:

{% highlight html %}
$scope.sites = [
    {site : "Google", url : "http://www.google.com"},
    {site : "Runoob", url : "http://www.runoob.com"},
    {site : "Taobao", url : "http://www.taobao.com"}
];
{% endhighlight %}

使用 `ng-repeat` 指令，选择的值是一个字符串:

<div class="alert">
    <div id="objRepeatApp" ng-controller="objRepeatCtrl">
        <p>选择网站:</p>
        <select ng-model="selectedSite">
            <option ng-repeat="x in sites" value="&#123;&#123; x.site &#125;&#125;">
                &#123;&#123; x.site &#125;&#125;
            </option>
        </select>
        <h2>你选择的是: <span ng-bind="selectedSite"></span></h2>
    </div>
</div>

{% highlight html %}
<div id="objRepeatApp" ng-controller="objRepeatCtrl">
    <p>选择网站:</p>
    <select ng-model="selectedSite">
        <option ng-repeat="x in sites" value="&#123;&#123; x.site &#125;&#125;">
            &#123;&#123; x.site &#125;&#125;
        </option>
    </select>
    <h2>你选择的是: <span ng-bind="selectedSite"></span></h2>
</div>
{% endhighlight %}

使用 `ng-options` 指令，选择的值是一个对象：

<div class="alert">
    <div id="objOptionsApp" ng-controller="objOptionsCtrl">
        <p>选择网站:</p>
        <select ng-model="selectedSite" ng-options="x.site for x in sites">
        </select>
        <h2>你选择的是: <span ng-bind="selectedSite.site"></span></h2>
        <p>网址为: <span ng-bind="selectedSite.url"></span></p>
    </div>
</div>

{% highlight html %}
<div id="objOptionsApp" ng-controller="objOptionsCtrl">
    <p>选择网站:</p>
    <select ng-model="selectedSite" ng-options="x.site for x in sites">
    </select>
    <h2>你选择的是: <span ng-bind="selectedSite.site"></span></h2>
    <p>网址为: <span ng-bind="selectedSite.url"></span></p>
</div>
{% endhighlight %}


## 数据源为对象

前面实例使用了数组作为数据源，以下将数据对象作为数据源。

{% highlight javascript %}
$scope.sites = {
    site01 : "Google",
    site02 : "Runoob",
    site03 : "Taobao"
};
{% endhighlight %}

`ng-options` 使用对象有很大的不同，如下所示：

<div class="alert">
    <div id="dataApp" ng-controller="dataCtrl">
        <p>选择的网站是:</p>
        <select ng-model="selectedSite" ng-options="x for (x, y) in sites">
        </select>
        <h1>你选择的值是: <span ng-bind="selectedSite"></span></h1>
    </div>
</div>

{% highlight html %}
<div id="dataApp" ng-controller="dataCtrl">
    <p>选择的网站是:</p>
    <select ng-model="selectedSite" ng-options="x for (x, y) in sites">
    </select>
    <h1>你选择的值是: <span ng-bind="selectedSite"></span></h1>
</div>
{% endhighlight %}


使用对象作为数据源, x 为键(key), y 为值(value):

{% highlight html %}
<div id="dataApp" ng-controller="dataCtrl">
    <p>选择的网站是:</p>
    <select ng-model="selectedSite" ng-options="x for (x, y) in sites">
    </select>
    <h1>你选择的值是: <span ng-bind="selectedSite"></span></h1>
</div>
{% endhighlight %}

你选择的值为在 key-value 对中的 value。即选择到是 key，选中了 value。

`<select>` 的 value 属性也可以是个对象：

<div class="alert">
    <div id="carApp" ng-controller="carCtrl">
        <p>选择一辆车:</p>
        <select ng-model="selectedCar" ng-options="x for (x, y) in cars">
        </select>
        <h2>你选择的是: <span ng-bind="selectedCar.brand"></span></h2>
        <p>模型: <span ng-bind="selectedCar.model"></span></p>
        <p>颜色: <span ng-bind="selectedCar.color"></span></p>
    </div>
</div>

{% highlight html %}
<div id="carApp" ng-controller="carCtrl">
    <p>选择一辆车:</p>
    <select ng-model="selectedCar" ng-options="x for (x, y) in cars">
    </select>
    <h2>你选择的是: <span ng-bind="selectedCar.brand"></span></h2>
    <p>模型: <span ng-bind="selectedCar.model"></span></p>
    <p>颜色: <span ng-bind="selectedCar.color"></span></p>
</div>
{% endhighlight %}


除此之外，在下拉菜单也可以不使用 key-value 对中的 key , 直接使用对象的属性：

<div class="alert">
    <div id="carKeyApp" ng-controller="carKeyCtrl">
        <p>选择一辆车:</p>
        <select ng-model="selectedCar" ng-options="y.brand for (x, y) in cars">
        </select>
        <h2>你选择的是: <span ng-bind="selectedCar.brand"></span></h2>
        <p>模型: <span ng-bind="selectedCar.model"></span></p>
        <p>颜色: <span ng-bind="selectedCar.color"></span></p>
    </div>
</div>

{% highlight html %}
<div id="carKeyApp" ng-controller="carKeyCtrl">
    <p>选择一辆车:</p>
    <select ng-model="selectedCar" ng-options="y.brand for (x, y) in cars">
    </select>
    <h2>你选择的是: <span ng-bind="selectedCar.brand"></span></h2>
    <p>模型: <span ng-bind="selectedCar.model"></span></p>
    <p>颜色: <span ng-bind="selectedCar.color"></span></p>
</div>
{% endhighlight %}




<script src="{{ "/js/angular.min.js " | prepend: site.baseurl }}"></script>
<script>
    // 创建moudle1
    var optionsApp = angular.module('optionsApp', []);
    optionsApp.controller('optionsCtrl', function($scope) {
        $scope.names = ["Google", "Runoob", "Taobao"];
    });

    // 创建moudle2
    var repeatApp = angular.module('repeatApp', []);
    repeatApp.controller('repeatCtrl', function($scope) {
        $scope.names = ["Google", "Runoob", "Taobao"];
    });

    // 创建moudle3
    var objRepeatApp = angular.module('objRepeatApp', []);
    objRepeatApp.controller('objRepeatCtrl', function($scope) {
       $scope.sites = [
            {site : "Google", url : "http://www.google.com"},
            {site : "Runoob", url : "http://www.runoob.com"},
            {site : "Taobao", url : "http://www.taobao.com"}
        ];
    });

    // 创建moudle4
    var objOptionsApp = angular.module('objOptionsApp', []);
    objOptionsApp.controller('objOptionsCtrl', function($scope) {
       $scope.sites = [
            {site : "Google", url : "http://www.google.com"},
            {site : "Runoob", url : "http://www.runoob.com"},
            {site : "Taobao", url : "http://www.taobao.com"}
        ];
    });

    // 创建moudle5
    var dataApp = angular.module('dataApp', []);
    dataApp.controller('dataCtrl', function($scope) {
        $scope.sites = {
            site01 : "Google",
            site02 : "Runoob",
            site03 : "Taobao"
        };
    });

    // 创建moudle6
    var carApp = angular.module('carApp', []);
    carApp.controller('carCtrl', function($scope) {
        $scope.cars = {
            car01 : {brand : "Ford", model : "Mustang", color : "red"},
            car02 : {brand : "Fiat", model : "500", color : "white"},
            car03 : {brand : "Volvo", model : "XC90", color : "black"}
        }
    });

    // 创建moudle7
    var carKeyApp = angular.module('carKeyApp', []);
    carKeyApp.controller('carKeyCtrl', function($scope) {
        $scope.cars = {
            car01 : {brand : "Ford", model : "Mustang", color : "red"},
            car02 : {brand : "Fiat", model : "500", color : "white"},
            car03 : {brand : "Volvo", model : "XC90", color : "black"}
        }
    });

    // 页面加载完成后,再加载模块
    angular.element(document).ready(function() {
      angular.bootstrap(document.getElementById("optionsApp"),["optionsApp"]);
      angular.bootstrap(document.getElementById("repeatApp"),["repeatApp"]);
      angular.bootstrap(document.getElementById("objRepeatApp"),["objRepeatApp"]);
      angular.bootstrap(document.getElementById("objOptionsApp"),["objOptionsApp"]);
      angular.bootstrap(document.getElementById("dataApp"),["dataApp"]);
      angular.bootstrap(document.getElementById("carApp"),["carApp"]);
      angular.bootstrap(document.getElementById("carKeyApp"),["carKeyApp"]);
    });
</script>
