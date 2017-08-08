// 创建Ajax对象
var is_url_http = 'http://127.0.0.1:8001';
var send_type = 'open';
//获取cookie字符串
var strCookie = document.cookie;
//将多cookie切割为多个名/值对
var arrCookie = strCookie.split("; ");
var user_token;
getCookie();
document.getElementById("user_token").value = user_token;
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) {
        sendData();
    }
};

function getCookie() {
    //遍历cookie数组，处理每个cookie对
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        //找到名称为userId的cookie，并返回它的值
        if ("usertoken" == arr[0]) {
            user_token = arr[1];
            break;
        }
    }
}

function sendData() {
    var sendval = $('#msgtext').val().replace(/(^\s*)|(\s*$)/g, '');
    getData(is_url_http + "/app/send/msg?msg=" + sendval + "&token="+user_token+"&sendType=" + send_type, 'send');
}
function login() {
    var userid = document.getElementById("user_id").value;
    getData(is_url_http + "/app/login?id=" + userid, 'login');
}
function getData(url, type) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        success: function (data) {
            if (data == null) {
                setTimeout(ermsg("服务器故障！"), (2000));
            } else if (type == 'send') {
                if (data.data == true) {
                    semsg("发送成功！");
                }else {
                    ermsg(data.data);
                }
            }
            else if (type == 'login') {
                semsg("登陆成功！即将跳转。。");
                document.cookie = "usertoken=" + data.data.token;
                setTimeout(tomain(), (2000));
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            setTimeout(ermsg("服务器故障！" + dateer), (2000));
            debugger;
        }
    });
}
function tomain() {
    window.location.href = 'main.html';
}
function ermsg(ermsgdata) {
    document.getElementById('msger').innerHTML = ermsgdata;
    document.getElementById('megse').innerHTML = "";
}

function semsg(semsgdata) {
    document.getElementById('megse').innerHTML = semsgdata;
    document.getElementById('msger').innerHTML = "";
}
function openPlayer(info) {
    if (info == "tuling") {
        send_type = info;
        divsend = 'tulingdiv';
        $("#opendiv").hide();
        $("#tulingdiv").show();
        document.getElementById('top-msg').innerHTML = "<font color='#FF0000'>与机器人聊天</font>";
    } else if (info == "open") {
        send_type = '';
        divsend = 'opendiv';
        $("#opendiv").show();
        $("#tulingdiv").hide();
        document.getElementById('top-msg').innerHTML = "公共区域聊天";
    }
}
