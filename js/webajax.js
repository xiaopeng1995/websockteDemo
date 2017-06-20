// 创建Ajax对象
var is_url_test = 'http://192.168.117.231:8001';

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) {
        sendData();
    }
};

function sendData() {
    var sendval = $('#msgtext').val().replace(/(^\s*)|(\s*$)/g, '');
    togetData(sendval,"发送成功!");
}
function togetData(data, semsgdata) {
    $.ajax({
        type: 'GET',
        url: is_url_test + '/website/test?test=' + data,
        dataType: "json",
        success: function (data) {
            if (data == null) {
                setTimeout(ermsg("服务器故障！"), (2000));
            } else {
                semsg(semsgdata);
            }
        },
        error: function (dateer) {
            setTimeout(ermsg("服务器故障！"+dateer), (2000));
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
