!(function () {

    var Message = function (msg, duration, type) {
        var _this = this;
        _this.msg = typeof msg != 'undefined' ? msg : '';
        _this.duration = typeof duration != 'undefined' ? duration : 1.5;
        _this.type = type;
        _this.enter();
    };

    Message.message_wrapper = null;

    Message.prototype.enter = function () {
        var _this = this;
        if (!Message.message_wrapper) {
            Message.message_wrapper = document.createElement('div');
            addClass(Message.message_wrapper, 'artMessage-wrapper');
            document.body.appendChild(Message.message_wrapper);
        }

        var content = document.createElement('div');
        addClass(content, 'artMessage-content');
        content.innerHTML = _this.msg;

        _this.messageItem = document.createElement('div');
        addClass(_this.messageItem, 'artMessage-item');
        _this.messageItem.appendChild(content);

        Message.message_wrapper.appendChild(_this.messageItem);
        addClass(_this.messageItem, 'move-up-enter');
        addClass(_this.messageItem, 'move-up-enter-active');
        setTimeout(function () {
            removeClass(_this.messageItem, 'move-up-enter');
            removeClass(_this.messageItem, 'move-up-enter-active');
        }, 200);

        setTimeout(function () {
            _this.out();
        }, _this.duration * 1000);
    };

    Message.prototype.out = function () {
        var _this = this;
        addClass(_this.messageItem, 'move-up-leave');
        addClass(_this.messageItem, 'move-up-leave-active');
        setTimeout(function () {
            _this.messageItem.parentNode.removeChild(_this.messageItem);
        }, 200);
    };


    var artMessage = {};

    artMessage.success = function (msg, duration) {
        return new Message(msg, duration, 'success');
    };

    /**
     * utils----------------------------------------------------------------------------------
     */

    //根据属性名获取元素集合
    function getElementsByAttribute(attribute, attributeValue, queryElement) {
        var elementArray = [];
        var matchedArray = [];
        var qElement = document;
        if (typeof queryElement !== 'undefined') {
            qElement = queryElement;
        }
        if (qElement.all) {
            elementArray = qElement.all;
        } else {
            elementArray = qElement.getElementsByTagName("*");
        }
        for (var i = 0, len = elementArray.length; i < len; i++) {
            if (attribute == "class") {
                var pattern = new RegExp("(\\s|^)" + attributeValue + "(\\s|$)");
                if (pattern.test(elementArray[i].className)) {
                    matchedArray[matchedArray.length] = elementArray[i];
                }
            } else if (attribute == "for") {
                if (elementArray[i].getAttribute("htmlFor") || elementArray[i].getAttribute("for")) {
                    if (elementArray[i].htmlFor == attributeValue) {
                        matchedArray[matchedArray.length] = elementArray[i];
                    }
                }
            } else if (elementArray[i].getAttribute(attribute) == attributeValue) {
                matchedArray[matchedArray.length] = elementArray[i];
            }
        }

        return matchedArray;
    }

    //事件监听
    function attachEventListener(target, eventType, handler) {
        if (typeof target.addEventListener != "undefined") {
            target.addEventListener(eventType, handler, false);
        } else if (typeof target.attachEvent != "undefined") {
            target.attachEvent("on" + eventType, handler);
        } else {
            target["on" + eventType] = handler;
        }
    }

    function detachEventListener(target, eventType, handler) {
        if (typeof target.removeEventListener != "undefined") {
            target.removeEventListener(eventType, handler, false);
        } else if (typeof target.detachEvent != "undefined") {
            target.detachEvent("on" + eventType, handler);
        } else {
            target["on" + eventType] = null;
        }
    }

    //去掉字符串首尾空格
    function trim(str) {
        if (typeof str !== 'string') {
            return '';
        }
        return str.replace(/^\s*|\s*$/g, '');
    }

    //操作class
    function hasClass(elements, cName) {
        return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    }

    function addClass(elements, cName) {
        if (!hasClass(elements, cName)) {
            elements.className += " " + cName;
        }
    }

    function removeClass(elements, cName) {
        if (hasClass(elements, cName)) {
            elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
        }
    }

    //对象属性继承
    function extend(obj1, obj2) {
        for (var k in obj2) {
            obj1[k] = obj2[k];
        }
        return obj1;
    }

    //阻止默认事件
    function stopDefaultAction(event) {
        if (event.preventDefault) {
            event.preventDefault();  //标准
        } else {
            event.returnValue = false;  //IE6,7,8
        }
    }

    //防止事件冒泡
    function unPropagation(event) {  //这里的event已经确定是事件对象，不为空了
        if (event.stopPropagation) {
            event.stopPropagation();  //标准
        } else {
            //event.cancelBubble不能作为判定这个属性有无的表达式，因为event.cancelBubble的默认值就是false
            event.cancelBubble = true;  //IE6,7,8
        }
    }

    //返回视口尺寸（window.innerWidth 包括页面的滚动条，其让方式获得视口宽度都不包括滚动条，媒体查询的尺寸侦听是包括滚动条的）
    function getViewportSize(w) {
        w = w || window;
        //除了IE8和更早的版本以外
        if (w.innerWidth != null) {
            return {w: w.innerWidth, h: w.innerHeight};
        } else {
            var d = w.document;
            //对标准模式下的IE（或其他浏览器）
            if (document.compatMode == "CSS1Compat") {
                return {w: d.documentElement.clientWidth, h: d.documentElement.clientHeight};
            } else {
                //对怪异模式下的浏览器
                return {w: d.body.clientWidth, h: d.body.clientHeight};
            }
        }
    }

    //获取元素的计算样式
    function retrieveComputedStyle(element, styleProperty) {
        var computedStyle = null;
        if (typeof element.currentStyle != "undefined") {
            computedStyle = element.currentStyle; //IE6,7,8
        }
        else {
            computedStyle = document.defaultView.getComputedStyle(element, null);  //标准
        }
        return computedStyle[styleProperty];
    }

    if (typeof define === 'function') {
        define(function () {
            return artMessage;
        });
    } else if (typeof exports !== 'undefined') {
        module.exports = artMessage;
    } else {
        this.artMessage = artMessage;
    }
})();