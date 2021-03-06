/**
 * Created by xiaopeng on 2017/6/20.
 */
var is_url_ws = 'ws://113.209.37.40:8001';
var websocket = null;
var divsend = 'opendiv';
//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    $("#tulingdiv").hide();//隐藏机器人对话框
    websocket = new WebSocket(is_url_ws + "/websocket");
}
else {
    $("#tulingdiv").hide();//隐藏机器人对话框
    alert('当前浏览器 Not support websocket')
}

//连接发生错误的回调方法
websocket.onerror = function () {
    setMessageInnerHTML("WebSocket连接发生错误");
};

//连接成功建立的回调方法
websocket.onopen = function () {
    var div = document.getElementById('opendiv');
    div.innerHTML = div.innerHTML + "连接成功!即将显示实时传送数据..<span style='Float:right'><a href='websocket.html'>清空</a></span><br>";
    div.scrollTop = div.scrollHeight;
    websocket.send(user_token);
}

//接收到消息的回调方法
websocket.onmessage = function (event) {
    var obj = JSON.parse(event.data);
    if (obj.type == 1) {
        setMessageInnerHTML(obj);
    } else if (obj.type == 2) {
        setMessageCountHTML(obj);
    }
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
function setMessageInnerHTML(obj) {
    var div = document.getElementById(divsend);
    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    var minfo = obj.info;
    var rinfo = obj.rinfo;
    var time = obj.time;
    var newDate = new Date();
    newDate.setTime(time);
    var ttime = newDate.toLocaleString();
    var username = obj.name;
    minfo = minfo.replace(reg, "<a href='$1$2'>$1$2</a>");
    div.innerHTML = div.innerHTML + '<div><font color="#B9E8F5" size="2px">' + ttime + '</font><br><font color="#006600" size="3px">' + username + '</font> :' + minfo + '</div>';
    div.scrollTop = div.scrollHeight;
    if (rinfo.length > 0) {
        rinfo = rinfo.replace(reg, "<a href='$1$2'>$1$2</a>");
        div.innerHTML = div.innerHTML + '<div><font color="#B9E8F5" size="2px">' + ttime + '</font><br>机器人回复-' + '<font color="#006600" size="3px">' + username + '</font> :' + rinfo + '</div>';
        div.scrollTop = div.scrollHeight;

    }
}
//将消息显示在统计上
function setMessageCountHTML(obj) {
    var div = document.getElementById('count');
    div.innerHTML = obj.info;
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