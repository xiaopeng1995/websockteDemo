// 创建Ajax对象
var is_url_test = 'http://192.168.117.254:8001';
var id = '';
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) {
        sendData();
    }
};

function sendData() {
    var sendval = $('#msgtext').val().replace(/(^\s*)|(\s*$)/g, '');
    getData("发送成功!", is_url_test + "/app/send/msg?msg=" + sendval + "&id=" + id);
}
function login() {
    var div = document.getElementById('user-id');
}
function getData(semsgdata, url) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        success: function (data) {
            if (data == null) {
                setTimeout(ermsg("服务器故障！"), (2000));
            } else {
                semsg(semsgdata);
            }
        },
        error: function (dateer) {
            setTimeout(ermsg("服务器故障！" + dateer), (2000));
            debugger;
        }
    });
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
        id = info;
        divsend = 'tulingdiv';
        $("#opendiv").hide();
        $("#tulingdiv").show();
        document.getElementById('top-msg').innerHTML = "<font color='#FF0000'>与机器人聊天</font>";
    } else if (info == "open") {
        id = '';
        divsend = 'opendiv';
        $("#opendiv").show();
        $("#tulingdiv").hide();
        document.getElementById('top-msg').innerHTML = "公共区域聊天";
    }
}
