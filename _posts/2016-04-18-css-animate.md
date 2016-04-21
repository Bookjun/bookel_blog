---
layout: post_book
title: CSS动画：animation-play-state 的妙用
date: 2016-04-18
subtitle: :hover 动画的交互改善
author: BookEl
tags: CSS
bg: http://www.padmag.cn/wp-content/uploads/288.jpg
---

<style>
    @-webkit-keyframes panoramic {
        to {
            background-position: 0 100%
        }
    }
    @-o-keyframes panoramic {
        to {
            background-position: 0 100%
        }
    }
    @-moz-keyframes panoramic {
        to {
            background-position: 0 100%
        }
    }
    @keyframes panoramic {
        to {
            background-position: 0 100%
        }
    }

    .panoramic {
        /*width: 150px;*/
        height: 150px;
        background: url("http://7xru9p.com1.z0.glb.clouddn.com/33e399b1571c6316794a20d3f8b3cba16d3760b52890ac-o9G2GT_fw658.jpeg");
        background-size: 100% auto;
    }

    .panoramic.autoPlay {
        -webkit-animation: panoramic 10s linear infinite alternate;
        -moz-animation: panoramic 10s linear infinite alternate;
        -ms-animation: panoramic 10s linear infinite alternate;
        -o-animation: panoramic 10s linear infinite alternate;
        animation: panoramic 10s linear infinite alternate;
    }

    .panoramic.palceOn {
        background: url("http://7xru9p.com1.z0.glb.clouddn.com/419fb6f1d795356b7d049ac1ba0323e0c072353f99101-u4frQG_fw658.jpeg");
        background-size: 100% auto;
    }

    .panoramic.palceOn:hover,
    .panoramic.palceOn:focus {
        -webkit-animation: panoramic 10s linear infinite alternate;
        -moz-animation: panoramic 10s linear infinite alternate;
        -ms-animation: panoramic 10s linear infinite alternate;
        -o-animation: panoramic 10s linear infinite alternate;
        animation: panoramic 10s linear infinite alternate;
    }

    .panoramic.palcePlay {
        -webkit-animation: panoramic 10s linear infinite alternate;
        -moz-animation: panoramic 10s linear infinite alternate;
        -ms-animation: panoramic 10s linear infinite alternate;
        -o-animation: panoramic 10s linear infinite alternate;
        animation: panoramic 10s linear infinite alternate;
        -webkit-animation-play-state: paused;
        -o-animation-play-state: paused;
        animation-play-state: paused;
    }

    .panoramic.palcePlay:hover,
    .panoramic.palcePlay:focus {
        -webkit-animation-play-state: running;
        -o-animation-play-state: running;
        animation-play-state: running;
    }
</style>

在前端动画中，有许多情况是用户通过某些操作触发的，比如 `:hover` 或者 `:active`。

在处理 `:hover` 状态的动画时，经常遇到不小心鼠标移出动画回到初始状态，在大多数情况下，这样的交互会直接影响用户的体验。

现在，我有一张全景图，我想实现类似探照灯的效果：

首先，它的原图是这样的：

<div class="row">
    <div class="col-xs-12 col-sm-6">
        <div class="thumbnail">
            <img src="http://7xru9p.com1.z0.glb.clouddn.com/33e399b1571c6316794a20d3f8b3cba16d3760b52890ac-o9G2GT_fw658.jpeg" alt="panoramic">
        </div>
    </div>
</div>

接着，我们对它控制范围，仅显示部分：

<div class="row">
    <div class="col-xs-12 col-sm-6">
        <div class="thumbnail">
            <div class="panoramic"></div>
        </div>
    </div>
    <div class="col-xs-12 col-sm-6">
    {% highlight css %}
.panoramic {
    height: 150px;
    background: url("http://7xru9p.com1.z0.glb.clouddn.com/33e399b1571c6316794a20d3f8b3cba16d3760b52890ac-o9G2GT_fw658.jpeg");
    background-size: 100% auto;
}
    {% endhighlight %}
    </div>
</div>



此时，它还没有添加任何动画，我们尝试使用 `keyframes` 修改 `background-position` 来展示图片的全貌。

<div class="row">
    <div class="col-xs-12 col-sm-6">
        <div class="thumbnail">
            <div class="panoramic autoPlay"></div>
        </div>
    </div>
    <div class="col-xs-12 col-sm-6">
    {% highlight css %}
@keyframes panoramic {
    to {
        background-position: 0 100%;
    }
}
.panoramic {
    animation: panoramic 10s linear infinite alternate;
}
    {% endhighlight %}
    </div>
</div>

它已经达到我们想要的效果了，但是页面加载就开始动画容易分散用户的注意，这并不是我们想要的。我们需要让用户自主地关注到元素上，于是，我们将触发条件设置为鼠标获取焦点的时候。

<div class="row">
    <div class="col-xs-12 col-sm-6">
        <div class="thumbnail">
            <div class="panoramic palceOn"></div>
        </div>
    </div>
    <div class="col-xs-12 col-sm-6">
    {% highlight css %}
.panoramic:hover,
.panoramic:focus {
    animation: panoramic 10s linear infinite alternate;
}
    {% endhighlight %}
    </div>
</div>

好像图片有哪里变的不对劲了，不过... 管他呢 ^_^

但是很快，我们发现了问题，如果此时不小心将鼠标移出范围，图片立即会回复到开始的位置。这样的问题，作为一个处女座前端是不能容忍的。为了解决这个问题，我们得想个办法。

梳理下我们的需求，我们要“看到”的是，鼠标移到图片上，图片开始从上到下的运动，移开鼠标动画暂停，鼠标移入动画继续。检查我们用的方法，发现问题来自 `:hover`， 它无法记忆动画的当前位置。

在动画中，有个 `animation-play-state` 属性，它的效果是使动画**暂停**。有了这个属性，我们可以实现暂停、继续的效果。于是我们来将这个“动画”进行一些改造，让它在没有焦点时保持暂停状态，当获取焦点后开始跑起来。

<div class="row">
    <div class="col-xs-12 col-sm-6">
        <div class="thumbnail">
            <div class="panoramic palcePlay"></div>
        </div>
    </div>
    <div class="col-xs-12 col-sm-6">
    {% highlight css %}
.panoramic {
    animation: panoramic 10s linear infinite alternate;
    animation-play-state: paused;
}

.panoramic:hover,
.panoramic:focus {
    animation-play-state: running;
}
    {% endhighlight %}
    </div>
</div>

效果出来了，突然感觉自己老牛逼了~


