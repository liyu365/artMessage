!(function () {

    var Message = function (option) {
        var _this = this;
        var def_options = {
            message: '提示',
            duration: 1.5,
            mask: false,
            alone: false,
            type: '',
            open: function () {

            },
            close: function () {

            }
        };
        _this.opts = extend(def_options, option);
        if (_this.opts.alone == true) {
            Message.alone = true;
        }
        _this.enter();
    };

    Message.message_wrapper = null;
    Message.zIndex = 2060;
    Message.alone = false;

    Message.prototype.enter = function () {
        var _this = this;
        if (!Message.message_wrapper) {
            Message.message_wrapper = document.createElement('div');
            addClass(Message.message_wrapper, 'artMessage-wrapper');
            Message.message_wrapper.style.zIndex = Message.zIndex;
            document.body.appendChild(Message.message_wrapper);
        }

        //添加锁定层
        if (_this.opts.mask && _this.check_backdrop() === 0) {
            var backdrop = document.createElement('div');
            addClass(backdrop, 'artMessage-backdrop');
            backdrop.style.zIndex = Message.zIndex - 1;
            document.body.appendChild(backdrop);
        }

        _this.opts.open.call(_this);

        var type = document.createElement('i');
        switch (_this.opts.type) {
            case 'success':
                addClass(type, 'success');
                break;
            case 'error':
                addClass(type, 'error');
                break;
            case 'warn':
                addClass(type, 'warn');
                break;
            case 'info':
                addClass(type, 'info');
                break;
            case 'loading':
                addClass(type, 'loading');
                break;
            default :
                type.style.display = 'none';
        }

        var custom_msg = document.createElement('span');
        addClass(custom_msg, 'custom-msg');
        custom_msg.innerHTML = _this.opts.message;

        var content = document.createElement('div');
        addClass(content, 'artMessage-content');
        content.appendChild(type);
        content.appendChild(custom_msg);

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

        if (_this.opts.duration !== 0) {
            setTimeout(function () {
                _this.out();
            }, _this.opts.duration * 1000);
        }
    };

    Message.prototype.out = function () {
        var _this = this;
        addClass(_this.messageItem, 'move-up-leave');
        addClass(_this.messageItem, 'move-up-leave-active');
        setTimeout(function () {
            _this.messageItem.parentNode.removeChild(_this.messageItem);
            _this.opts.close.call(_this);
            //删除锁定层
            if (_this.check_backdrop() > 0 && _this.opts.mask) {
                var backdrop_elements = getElementsByAttribute('class', 'artMessage-backdrop');
                for (var i = 0, len = backdrop_elements.length; i < len; i++) {
                    backdrop_elements[i].parentNode.removeChild(backdrop_elements[i]);
                }
            }
            Message.alone = false;
        }, 200);
    };

    Message.prototype.check_backdrop = function () {
        var backdrop_elements = getElementsByAttribute('class', 'artMessage-backdrop');
        return backdrop_elements.length;
    };

    var artMessage = function (option) {
        if (Message.alone === true) {
            return false;
        }
        return new Message(option);
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