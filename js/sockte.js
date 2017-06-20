/**
 * Created by xiaopeng on 2017/6/20.
 */
var is_url_test = 'ws://192.168.117.231:8001';
var websocket = null;
//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    websocket = new WebSocket(is_url_test+"/websocket");
}
else {
    alert('当前浏览器 Not support websocket')
}

//连接发生错误的回调方法
websocket.onerror = function () {
    setMessageInnerHTML("WebSocket连接发生错误");
};

//连接成功建立的回调方法
websocket.onopen = function () {
    var div = document.getElementById('scrolldIV');
    div.innerHTML = div.innerHTML + "连接成功!即将显示实时传送数据..<br>";
    div.scrollTop = div.scrollHeight;
}

//接收到消息的回调方法
websocket.onmessage = function (event) {
    setMessageInnerHTML(event.data);
}

//连接关闭的回调方法
websocket.onclose = function () {
    setMessageInnerHTML("WebSocket连接关闭");
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
}

//将消息显示在网页上
function setMessageInnerHTML(innerHTML1) {
    var div = document.getElementById('scrolldIV');
    div.innerHTML = div.innerHTML + '<div style="border:1px solid #B9E8F5">' + innerHTML1 + '</div>';
    div.scrollTop = div.scrollHeight;
}

//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}

//发送消息
function send() {
    var message = document.getElementById('text').value;
    websocket.send(message);
}