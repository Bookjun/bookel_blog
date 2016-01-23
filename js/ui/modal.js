/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ========================================================================
 * Updates in ZUI：
 * 1. changed event namespace to *.zui.modal
 * 2. added position option to ajust poisition of modal
 * 3. added event 'escaping.zui.modal' with an param 'esc' to judge the esc
 *    key down
 * 4. get moveable options value from '.modal-moveable' on '.modal-dialog'
 * 5. add setMoveable method to make modal dialog moveable
 * ======================================================================== */

define(function(require, exports, module) {
    var $ = require('jquery');

    // MODAL CLASS DEFINITION
    // ======================

    var bkname = 'bk.modal';

    var Modal = function(element, options) {
        this.options             = options;
        this.$body               = $(document.body);
        this.$element            = $(element);
        this.$dialog             = this.$element.find('.modal-dialog');
        this.$backdrop           = null;
        this.isShown             = null;
        this.originalBodyPad     = null;
        this.scrollbarWidth      = 0;
        this.ignoreBackdropClick = false;

        if (this.options.remote) {
            this.$element
                .find('.modal-content')
                .load(this.options.remote, $.proxy(function() {
                    this.$element.trigger('loaded.' + bkname)
                }, this));
        }
    }

    Modal.TRANSITION_DURATION = 300;
    Modal.BACKDROP_TRANSITION_DURATION = 150;

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    }

    Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    }

    Modal.prototype.show = function(_relatedTarget) {
        var that = this
        var e = $.Event('show.' + bkname, {
            relatedTarget: _relatedTarget
        });

        this.$element.trigger(e);

        if (this.isShown || e.isDefaultPrevented()) {
            return;
        }

        this.isShown = true;

        this.checkScrollbar();
        this.setScrollbar();
        // 配合CSS实现浏览器禁止滚动
        this.$body.addClass('modal-open');

        this.escape();
        this.resize();

        this.$element.on('click.dismiss.' + bkname, '[data-dismiss="modal"]', $.proxy(this.hide, this));

        // 点击遮罩，关闭模态窗
        this.$dialog.on('mousedown.dismiss.' + bkname, function() {
            that.$element.one('mouseup.dismiss.' + bkname, function(e) {
                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
            })
        })

        this.backdrop(function() {
            // Bootstrap core 的调用，淡出效果
            var transition = $.support.transition && that.$element.hasClass('fade');

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body); // don't move modals dom position
            }

            that.$element
                .show()
                .scrollTop(0);

            that.adjustDialog();

            if (transition) {
                that.$element[0].offsetWidth; // force reflow
            }

            that.$element.addClass('in');

            that.enforceFocus();

            var e = $.Event('shown.' + bkname, {
                relatedTarget: _relatedTarget
            });

            transition ?
                that.$dialog // wait for modal to slide in
                .one('bsTransitionEnd', function() {
                    that.$element.trigger('focus').trigger(e)
                })
                .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
                that.$element.trigger('focus').trigger(e);
        })
    }

    Modal.prototype.hide = function(e) {
        if (e) {
            e.preventDefault();
        }

        // 发送事件触发信号
        e = $.Event('hide.' + bkname);

        this.$element.trigger(e);

        if (!this.isShown || e.isDefaultPrevented()) {
            return;
        }

        this.isShown = false;

        this.escape();
        this.resize();

        $(document).off('focusin.' + bkname);

        this.$element
            .removeClass('in')
            .off('click.dismiss.' + bkname)
            .off('mouseup.dismiss.' + bkname);

        this.$dialog.off('mousedown.dismiss.' + bkname);

        $.support.transition && this.$element.hasClass('fade') ?
            this.$element
            .one('bsTransitionEnd', $.proxy(this.hideModal, this))
            .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
            this.hideModal();
    }

    Modal.prototype.enforceFocus = function() {
        $(document)
            .off('focusin.' + bkname) // guard against infinite focus loop
            .on('focusin.' + bkname, $.proxy(function(e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.trigger('focus');
                }
            }, this));
    }

    /**
     * 键盘监听
     * @return {[type]} [description]
     */
    Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
            // 按 esc 执行 hide
            this.$element.on('keydown.dismiss.' + bkname, $.proxy(function(e) {
                e.which == 27 && this.hide()
            }, this));
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.' + bkname);
        }
    }

    Modal.prototype.resize = function() {
        if (this.isShown) {
            $(window).on('resize.' + bkname, $.proxy(this.handleUpdate, this));
        } else {
            $(window).off('resize.' + bkname);
        }
    }

    Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide();
        this.backdrop(function() {
            that.$body.removeClass('modal-open');
            that.resetAdjustments();
            that.resetScrollbar();
            that.$element.trigger('hidden.' + bkname);
        })
    }

    Modal.prototype.backdrop = function(callback) {
        var that = this;
        var animate = this.$element.hasClass('fade') ? 'fade' : '';

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;

            this.$backdrop = $(document.createElement('div'))
                .addClass('modal-backdrop ' + animate)
                .appendTo(this.$body);

            this.$element.on('click.dismiss.' + bkname, $.proxy(function(e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false
                    return
                }
                if (e.target !== e.currentTarget) return;
                this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
            }, this));

            if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

            this.$backdrop.addClass('in');

            if (!callback) return;

            doAnimate ?
                this.$backdrop
                .one('bsTransitionEnd', callback)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callback();

        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');

            var callbackRemove = function() {
                that.removeBackdrop();
                callback && callback();
            }
            $.support.transition && this.$element.hasClass('fade') ?
                this.$backdrop
                .one('bsTransitionEnd', callbackRemove)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callbackRemove();

        } else if (callback) {
            callback();
        }
    }

    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    }

    // these following methods are used to handle overflowing modals

    Modal.prototype.handleUpdate = function() {
        this.adjustDialog();
    }

    Modal.prototype.adjustDialog = function() {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        });
    }

    Modal.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        });
    }

    Modal.prototype.checkScrollbar = function() {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
    }

    Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
    }

    Modal.prototype.resetScrollbar = function() {
        this.$body.css('padding-right', this.originalBodyPad);
    }

    Modal.prototype.measureScrollbar = function() { // thx walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
    }

    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(bkname);
            // 拓展对象
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);

            // 第一次初始化
            if (!data) {
                $this.data(bkname, (data = new Modal(this, options)));
            }

            if (typeof option == 'string') { // 执行 Modal.toggle
                data[option](_relatedTarget);
            } else if (options.show) { // 执行 Modal.show
                data.show(_relatedTarget);
            }
        })
    }

    var old = $.fn.modal;

    $.fn.modal = Plugin;
    $.fn.modal.Constructor = Modal;


    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function() {
        $.fn.modal = old;
        return this;
    }

    // MODAL DATA-API
    // ==============

    // 根据触发器 data-toggle="modal" 弹出模态窗
    $(document).on('click.' + bkname + '.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); // strip for ie7
        // 第一次加载获取所有参数，主要是 data-toggle="modal" 和 data-target
        var option = $target.data(bkname) ? 'toggle' : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());

        // 如果是 a 标签，阻止默认行为
        if ($this.is('a')) e.preventDefault();

        $target.one('show.' + bkname, function(showEvent) {
            // only register focus restorer if modal will actually get shown
            if (showEvent.isDefaultPrevented()) {
                return;
            }
            $target.one('hidden.' + bkname, function() {
                $this.is(':visible') && $this.trigger('focus')
            });
        })

        // 执行
        Plugin.call($target, option, this);
    })

    module.exports = Modal;
});