!(function () {

    var Message = function (msg, duration, type) {
        var _this = this;
        _this.msg = typeof msg != 'undefined' ? msg : '';
        _this.duration = typeof duration != 'undefined' ? duration : 1.5;
        _this.type = type;
        _this.enter();
    };

    Message.message_wrapper = null;
    Message.zIndex = 2060;

    Message.prototype.enter = function () {
        var _this = this;
        if (!Message.message_wrapper) {
            Message.message_wrapper = document.createElement('div');
            addClass(Message.message_wrapper, 'artMessage-wrapper');
            Message.message_wrapper.style.zIndex = Message.zIndex;
            document.body.appendChild(Message.message_wrapper);
        }

        var type = document.createElement('i');
        switch (_this.type) {
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
        custom_msg.innerHTML = _this.msg;

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

        if (_this.duration !== 0) {
            setTimeout(function () {
                _this.out();
            }, _this.duration * 1000);
        }
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
    artMessage.error = function (msg, duration) {
        return new Message(msg, duration, 'error');
    };
    artMessage.warn = function (msg, duration) {
        return new Message(msg, duration, 'warn');
    };
    artMessage.info = function (msg, duration) {
        return new Message(msg, duration, 'info');
    };
    artMessage.loading = function (msg, duration) {
        return new Message(msg, duration, 'loading');
    };

    /**
     * utils----------------------------------------------------------------------------------
     */

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