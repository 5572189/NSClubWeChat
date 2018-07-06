var md5 = require('md5.js');
var app = getApp();

function encryption() {
    var time = new Date().getTime();
    var uuid = "1";
    var sign = md5.md5("098F6BCD4621D373CADE4E832627B4F6" + time + uuid);
    var token = {
        "sign": sign,
        "time": time,
        "uuid": "1",
        "from": 'wechat_program',
        "lang": 'cn',
    }
    return token;
}

module.exports = {
    encryption: encryption
}