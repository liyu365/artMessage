# artMessage

### :point_right: [demo](https://liyu365.github.io/artMessage/demo/) 

## 介绍
1.顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。
2.多条消息可同时堆叠出现，彼此互不干扰。
3.兼容移动端，向下兼容到IE6，不依赖其他框架。

## 调用方式
`artMessage(option)`

option选项：

`message` 消息文字

`duration` 消息停留时间，默认为1.5（以秒为单位），设置为0表示不自动消失，可调用artMessage()方法返回的实例的out()方法手动控制消失

`mask` 消息显示期间是否锁定屏幕 true|false

`type` 消息的图标种类：'success'|'error'|'warn'|'info'|'loading'

`open` 消失显示后的回调函数

`close` 消息消失后的回调函数

## License

**Under MIT License. Copyright by 李昱(liyu365)**