---
layout: post_book
title: 模态框(Modal)组件开发
date: 2016-01-22
subtitle: 站在巨人的肩膀上
author: BookEl
---

## 插件结构

### HTML标签

模态窗一般默认不可见，通过按钮或者 JS 控制展现，一个简单的 Demo ：

<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bk-example-modal">
    弹出模态框
</button>
<div id="bigModal" class="modal fade bk-example-modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <i class="fa fa-remove"></i>
                </button>
                <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
                <p>One fine body&hellip;</p>
            </div>
            <div class="modal-footer">
                <span class="modal-fotter__btn">确定</span>
                <span class="modal-fotter__btn" data-dismiss="modal">取消</span>
            </div>
        </div>
    </div>
</div>

{% highlight html %}
<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bk-example-modal">
    弹出模态框
</button>
<div id="bigModal" class="modal fade bk-example-modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <i class="fa fa-remove"></i>
                </button>
                <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
                <p>One fine body&hellip;</p>
            </div>
            <div class="modal-footer">
                <span class="modal-fotter__btn">确定</span>
                <span class="modal-fotter__btn" data-dismiss="modal">取消</span>
            </div>
        </div>
    </div>
</div>
{% endhighlight %}

#### 标签结构：

模态框的结构看似复杂其实一层层剥开后就一目了然了。

1. 最外层是 .modal 可以配合 .fade .in 实现淡出效果；
2. 第二层是 .modal-dialog 负责区域的设置；
3. 第三层是 .modal-content 负责内容的控制；
4. 第四层是 .modal-header .modal-body .modal-footer 三个子类，分别对应模态框的上中下部分；
5. 第五层即内容层，其中头部添加 .modal-title 标题样式。

### CSS

_main.scss 添加

{% highlight css %}
@import 'components/modal';
{% endhighlight %}

_该组建依赖一些辅助 .scss 文件。_

### JS

引入 sea.js

{% highlight javascript %}
<script src="/js/sea.js" id="seajsnode"></script>
{% endhighlight %}

如果需要动画效果，先引用 transition.js。如果不需要，则直接引用 modal.js。

{% highlight javascript %}
seajs.config({
    base: "/",
    alias: {
        "jquery": "js/jquery/jquery.js"
    }
});

seajs.use('js/ui/alert');
seajs.use(['jquery', 'js/ui/modal'], function($, main) {
    // 监听关闭开始
    $('#bigModal').on('hide.bk.modal', function() {
        console.log('开始关闭...');
    })
    // 监听关闭完成
    $('#bigModal').on('hidden.bk.modal', function() {
        console.log('关闭完成...');
    })
});
{% endhighlight %}

对关闭模态框的控件添加 `data-dismiss="modal"` 属性，即可实现关闭模态框。


