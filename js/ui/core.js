/* ========================================================================
 * BookUI: core.js v1.0.0
 * https://github.com/Bookjun/bkui
 * ========================================================================
 *
 * BkUI.support.animation 负责动画的控制
 * BkUI.utils.debounce 函数去抖
 * BkUI.utils.parseOptions 将string类型的对象转换为object对象
 * ======================================================================== */

define(function(require, exports, module) {

    var $ = require('jquery');

    var BkUI = {};

    var doc = window.document;

    BkUI.support = {};

    BkUI.support.animation = (function() {
      var animationEnd = (function() {
        var element = doc.body || doc.documentElement;
        var animEndEventNames = {
          WebkitAnimation: 'webkitAnimationEnd',
          MozAnimation: 'animationend',
          OAnimation: 'oAnimationEnd oanimationend',
          animation: 'animationend'
        };

        for (var name in animEndEventNames) {
          if (element.style[name] !== undefined) {
            return animEndEventNames[name];
          }
        }
      })();

      return animationEnd && {end: animationEnd};
    })();

    BkUI.utils = {};

    /**
     * Debounce function
     * @param {function} func  Function to be debounced
     * @param {number} wait Function execution threshold in milliseconds
     * @param {bool} immediate  Whether the function should be called at
     *                          the beginning of the delay instead of the
     *                          end. Default is false.
     * @desc Executes a function when it stops being invoked for n seconds
     * @via  _.debounce() http://underscorejs.org
     */
    BkUI.utils.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);

            if (callNow) {
                func.apply(context, args);
            }
        };
    };

    /**
     * 将string类型的对象转换为object对象
     * @param  {string} string 例如：{top: 100}
     * @return {json}        [description]
     */
    BkUI.utils.parseOptions = BkUI.utils.options = function(string) {
        if ($.isPlainObject(string)) {
            return string;
        }

        var start = (string ? string.indexOf('{') : -1);
        var options = {};

        if (start != -1) {
            try {
                options = (new Function('',
                    'var json = ' + string.substr(start) +
                    '; return JSON.parse(JSON.stringify(json));'))();
            } catch (e) {}
        }

        return options;
    };

    module.exports = BkUI;
});