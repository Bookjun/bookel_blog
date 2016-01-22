---
layout: post_book
title: JS时间转化为“几天前”、“几小时前“、“刚刚”
date: 2016-01-22
subtitle: 多年前面试被问过的问题，今天看到才想起来
author: BookEl
---

面试时被问说怎么实现微博时间提示，我当时支支吾吾乱说了一通，今天偶然<a href="http://caibaojian.com/timestamp.html" class="external-link" target="_blank">看到</a>才想起来还有这么一件事。。。

{% highlight javascript %}
function getDateDiff(dateTimeStamp){
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){return;}
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    if(monthC>=1){
        result="" + parseInt(monthC) + "月前";
    }
    else if(weekC>=1){
        result="" + parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
        result=""+ parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
        result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
        result=""+ parseInt(minC) +"分钟前";
    }else
    result="刚刚";
    return result;
}
{% endhighlight %}

转换标准时间为时间戳：

{% highlight javascript %}
function getDateTimeStamp(dateStr){
    return Date.parse(dateStr.replace(/-/gi,"/"));
}
{% endhighlight %}

Demo:

这篇文章发布时间为 2016/1/22 9:59:30

<div id="timestr">
文章发表时间戳为：1453291170000于：1天前
</div>

<script>
    function getDateDiff(dateTimeStamp){
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){return;}
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        if(monthC>=1){
            result="" + parseInt(monthC) + "月前";
        }
        else if(weekC>=1){
            result="" + parseInt(weekC) + "周前";
        }
        else if(dayC>=1){
            result=""+ parseInt(dayC) +"天前";
        }
        else if(hourC>=1){
            result=""+ parseInt(hourC) +"小时前";
        }
        else if(minC>=1){
            result=""+ parseInt(minC) +"分钟前";
        }else
                 result="刚刚";
        return result;
    }
    function getDateTimeStamp(dateStr){
     return Date.parse(dateStr.replace(/-/gi,"/"));
    }
    var time = '2016/1/22 9:59:30';
    var timestamp = getDateTimeStamp(time);
    var timestr = getDateDiff(timestamp);
    document.getElementById('timestr').innerHTML = "文章发表时间于：" + timestr;
</script>

