/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 *
 * 参考自Bootstrap，调用方式分有两种。
 * 1. 通过 Data API
 *    在关闭按钮上添加 data-dismiss="alert"
 * 2. 通过 JS
 *    关闭按钮开启交互功能：
 *    $('#closeAlertBtn').alert()
 *
 * date    2016-01-19
 * version V1.0
 * ======================================================================== */

define(function(require, exports, module) {
    var $ = require('jquery');

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]';
    var bkname = 'bk.alert';

    var Alert = function(el) {
        $(el).on('click', dismiss, this.close);
    }

    Alert.TRANSITION_DURATION = 150

    Alert.prototype.close = function(e) {
        var $this = $(this);
        // 获得关闭按钮对象
        var selector = $this.attr('data-target');

        // 尼玛，我不知道这是在什么情景下生效啊！！！！
        if (!selector) {
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
        }

        // 获得alert对象
        var $parent = $(selector);

        if (e) {
        	e.preventDefault();
        }

        if (!$parent.length) {
            $parent = $this.closest('.alert');
        }

        $parent.trigger(e = $.Event('close.' + bkname));

        if (e.isDefaultPrevented()) {
        	return;
        }

        // 以下是Bootstrap配合自己的fade in两个类实现的交互效果，目前我还没想好怎么破解
        $parent.removeClass('in');

        function removeElement() {
            // detach from parent, fire event then clean up data
            $parent.detach().trigger('closed.' + bkname).remove();
        }

        $.support.transition && $parent.hasClass('fade') ?
            $parent
            .one('bsTransitionEnd', removeElement)
            .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
            removeElement()
    }

    // ALERT PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(bkname);

            if (!data) {
            	$this.data(bkname, (data = new Alert(this)));
            }
            if (typeof option == 'string') {
	            data[option].call($this);
	        }
        })
    }

    var old = $.fn.alert;

    // 加载模块，自动绑定alert事件
    $.fn.alert = Plugin;
    $.fn.alert.Constructor = Alert;


    // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function() {
        $.fn.alert = old;
        return this;
    }


    // ALERT DATA-API
    // ==============

    // 根据事件的命名空间，只要是click事件都会执行
    $(document).on('click.' + bkname + '.data-api', dismiss, Alert.prototype.close);

    module.exports = Alert;

});