/* ========================================================================
 * BookUI: stick.js v1.0.1
 * https://github.com/Bookjun/bkui
 * ========================================================================
 *
 * 参考自AmazeUI，调用方式分有两种。
 * 1. 通过 Data API
 *    在需要固定的元素上添加data-bk-sticky
 * 2. 通过 JS
 *    $('#my-sticky').sticky({
 *        top: 150
 *    });
 *
 * === v1.0.1 更新 ===
 * 添加destroy取消固定，调用方式：
 * $('#my-sticky').sticky('destroy');
 *
 * 已知Bug：
 * destroy事件并没有把绑定的监听给删除掉，所以多次调用sticky()后，会遗留很多的监听。
 * ======================================================================== */



define(function(require, exports, module) {
    var $ = require('jquery');
    var BkUI = require('./core');

    // STICKY CLASS DEFINITION
    // ======================

    var bkname = 'bk.sticky';

    var Sticky = function(element, options) {
        var self = this;
        this.options  = options;
        this.$element = $(element);
        this.sticked  = null;
        this.inited   = null;
        this.$holder  = undefined;

        // 在一定的时间之内，只执行一次resize事件函数，scroll事件同理
        this.$window = $(window)
            .on('scroll.' + bkname, BkUI.utils.debounce($.proxy(this.checkPosition, this), 10))
            .on('resize.' + bkname + ' orientationchange.' + bkname, BkUI.utils.debounce(function() {
                self.reset(true, function() {
                    self.checkPosition();
                });
            }, 50))
            .on('load.' + bkname, $.proxy(this.checkPosition, this));

        this.offset = this.$element.offset();

        this.init();
    };

    Sticky.DEFAULTS = {
        top: 0,
        bottom: 0,
        animation: '',
        className: {
            sticky: 'sticky',
            resetting: 'sticky-resetting',
            stickyBtm: 'sticky-bottom',
            animationRev: 'animation-reverse'
        }
    };

    /**
     * 将需要固定的元素用<div class="bk-sticky-placeholder"></div>包裹起来，
     * 并继承固定元素的CSS样式。
     * 初始化成功后设置inited = 1
     * @return {boolean} 是否初始化成功
     */
    Sticky.prototype.init = function() {
        var result = this.check();

        if (!result) {
            return false;
        }

        var $element = this.$element;
        var $elementMargin = '';

        $.each($element.css(['marginTop', 'marginRight', 'marginBottom', 'marginLeft']),
            function(name, value) {
                return $elementMargin += ' ' + value;
            });

        var $holder = $('<div class="bk-sticky-placeholder"></div>').css({
            height: $element.css('position') !== 'absolute' ? $element.outerHeight() : '',
            float: $element.css('float') != 'none' ? $element.css('float') : '',
            margin: $elementMargin
        });

        this.$holder = $element.css('margin', 0).wrap($holder).parent();
        this.inited = 1;

        return true;
    };

    Sticky.prototype.destroy = function() {
        var $target = this.data(bkname);
        var $holder = $target.$holder;
        var $element = $target.$element;
        var classes = $target.options.className;
        var animation = ($target.options.animation) ?
            ' bk-animation-' + $target.options.animation : '';

        if (!$target.inited) {
            return false;
        }

        $element.removeClass([
            animation,
            classes.stickyBtm,
            classes.animationRev,
            classes.sticky,
            classes.resetting
        ].join(' '));

        var $parent = $element.parent();
        var $clone = $element.clone();
        var $elementMargin = '';

        $.each($holder.css(['marginTop', 'marginRight', 'marginBottom', 'marginLeft']),
            function(name, value) {
                return $elementMargin += ' ' + value;
            });

        $clone.css({
            height: $element.css('position') !== 'absolute' ? $element.outerHeight() : '',
            float: $element.css('float') != 'none' ? $element.css('float') : '',
            margin: $elementMargin
        });

        $parent.after($clone).empty().remove();

        // 关闭事件监听
        // $target.$window.off('scroll.' + bkname, BkUI.utils.debounce, false)
        //     .off('resize.' + bkname + ' orientationchange.' + bkname, BkUI.utils.debounce, false)
        //     .off('load.' + bkname, $.proxy($target.checkPosition, $target));
    };


    Sticky.prototype.reset = function(force, cb) {
        var options = this.options;
        var $element = this.$element;
        var animation = (options.animation) ?
            ' bk-animation-' + options.animation : '';
        var complete = function() {
            $element.css({
                position: '',
                top: '',
                width: '',
                left: '',
                margin: 0
            });
            $element.removeClass([
                animation,
                options.className.animationRev,
                options.className.sticky,
                options.className.resetting
            ].join(' '));

            this.animating = false;
            this.sticked = false;
            this.offset = $element.offset();
            cb && cb();
        }.bind(this);

        $element.addClass(options.className.resetting);

        if (!force && options.animation && BkUI.support.animation) {

            this.animating = true;

            $element.removeClass(animation).one(BkUI.support.animation.end, function() {
                complete();
            }).width(); // force redraw

            $element.addClass(animation + ' ' + options.className.animationRev);
        } else {
            complete();
        }
    };

    Sticky.prototype.check = function() {
        if (!this.$element.is(':visible')) {
            return false;
        }

        var media = this.options.media;

        if (media) {
            switch (typeof(media)) {
                case 'number':
                    if (window.innerWidth < media) {
                        return false;
                    }
                    break;

                case 'string':
                    if (window.matchMedia && !window.matchMedia(media).matches) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    };

    Sticky.prototype.checkPosition = function() {
        if (!this.inited) {
            var initialized = this.init();
            if (!initialized) {
                return;
            }
        }

        var options      = this.options;
        var scrollTop    = this.$window.scrollTop();
        var offsetTop    = options.top;
        var offsetBottom = options.bottom;
        var $element     = this.$element;
        var animation = (options.animation) ? ' bk-animation-' + options.animation : '';
        var className = [options.className.sticky, animation].join(' ');

        if (typeof offsetBottom == 'function') {
            offsetBottom = offsetBottom(this.$element);
        }

        var checkResult = (scrollTop > this.$holder.offset().top);

        if (!this.sticked && checkResult) {
            $element.addClass(className);
        } else if (this.sticked && !checkResult) {
            this.reset();
        }

        this.$holder.css({
            height: $element.is(':visible') && $element.css('position') !== 'absolute' ?
                $element.outerHeight() : ''
        });

        if (checkResult) {
            $element.css({
                top: offsetTop,
                left: this.$holder.offset().left,
                width: this.$holder.width()
            });

            /*
             if (offsetBottom) {
             // （底部边距 + 元素高度 > 窗口高度） 时定位到底部
             if ((offsetBottom + this.offset.height > $(window).height()) &&
             (scrollTop + $(window).height() >= scrollHeight - offsetBottom)) {
             $element.addClass(options.className.stickyBtm).
             css({top: $(window).height() - offsetBottom - this.offset.height});
             } else {
             $element.removeClass(options.className.stickyBtm).css({top: offsetTop});
             }
             }
             */
        }

        this.sticked = checkResult;
    };

    // STICKY PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(bkname);
            // 拓展对象
            var options = $.extend({},
                Sticky.DEFAULTS,
                $this.data(),
                BkUI.utils.parseOptions($this.attr('data-sticky')),
                typeof option == 'object' && option);

            // 第一次初始化
            if (!data) {
                $this.data(bkname, (data = new Sticky(this, options)));
            }

            if (typeof option == 'string') {
                data[option].call($this);
            }
        })
    }

    var old = $.fn.sticky;

    $.fn.sticky = Plugin;
    $.fn.sticky.Constructor = Sticky;


    // STICKY NO CONFLICT
    // =================

    $.fn.sticky.noConflict = function() {
        $.fn.sticky = old;
        return this;
    }

    // STICKY DATA-API
    // ==============

    $(window).on('load', function() {
        $('[data-sticky]').sticky();
    });

    module.exports = Sticky;
});