var comment = require('../../utils/comment.js');
var token = comment.encryption();
var app = getApp();
var link = app.globalData.link;
var interval = "";
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持  
    },
    /** 
     * 组件的属性列表 
     */
    properties: {
        title: {
            type: String,
            value: ''
        }
    },

    /** 
     * 组件的初始数据 
     */
    data: {
        phone: '',
        code: '',
        code_text: '获取验证码',
        flags: true,
        currentTime: 61,
        user_code: "", //用户短信验证码
        disabled:false,
        color:"#fff"

    },

    /** 
     * 组件的方法列表 
     */
    methods: {
        bindCode: function(e) {
            var that = this;
            that.setData({
                phone: e.detail.value
            })
            var val = e.detail.value; //通过这个传递数据
            var length = e.detail.value.length;

            var myEventDetail = {
                val: val
            } // detail对象，提供给事件监听函数
            this.triggerEvent('myevent', myEventDetail) //myevent自定义名称事件，父组件中使用
        },
        bindingShow: function() {
            var that = this;
            that.setData({
                flags: false,
                phone: ''
            })
        },
        bindingHide: function() {
            var value = wx.getStorageSync('phone');
            var that = this;
            clearInterval(interval)
            var data = "";
            if (value) {
                that.setData({
                    flags: true,
                    phone: value,
                    code_text: '获取验证码',
                    disabled:false
                })
                data = value;
            } else {
                that.setData({
                    flags: true,
                    phone: '',
                    code_text: '获取验证码',
                    disabled:false
                })
                data = this.properties.title
            }

            var myEventDetailDelete = {
                val: data
            }
            this.triggerEvent('myeventDelete', myEventDetailDelete)
        },
        // 获取验证码
        getCode: function(options) {
            var that = this;
            var currentTime = that.data.currentTime
            interval = setInterval(function() {
                currentTime--;
                that.setData({
                    code_text: currentTime + '秒',
                    disabled:true
                })
                if (currentTime <= 0) {
                    clearInterval(interval)
                    that.setData({
                        code_text: '重新发送',
                        currentTime: 61,
                        disabled:false
                    })
                }
            }, 1000)
        },
       
        bindChangephone:function(e){
            var that = this;
            that.setData({
                phone: e.detail.value
            })
        },
        bindChangeCode: function(e) {
            var that = this;
            that.setData({
                code: e.detail.value
            })
        },
        //验证码点击
        codeAcquire: function() {
            var that = this;
            var mobile = that.data.phone;
            if (!/^1[34578]\d{9}$/.test(mobile)) {
                wx.showToast({
                    title: '手机号有误！',
                    icon: 'loading',
                    duration: 2000
                })
                return false;
            }else{
                wx.request({
                    url: link + 'api.php?s=/login/sendCode',
                    data: {
                        "token": token,
                        "param": {
                            phone: mobile,
                        }
                    },
                    method: 'POST',
                    dataType: 'json',
                    success: function (res) {
                        if (res.data.data.code == 200) {
                            that.getCode();
                            that.setData({
                                user_code: res.data.data.result.code
                            })
                            console.log(res.data.data.result.code)
                        }
                    },
                    fail: function (res) {

                    },
                })
            }
            

        },
        submitBtn: function() {
            var that = this;
            var phone = that.data.phone;
            var verify_code = that.data.code;
            var user_code = that.data.user_code;

          
            //phone 验证
            if (!/^1[34578]\d{9}$/.test(phone)) {
                wx.showToast({
                    title: '手机号有误！',
                    icon: 'loading',
                    duration: 2000
                })
                return false;
            }
            if (user_code == "") {
                wx.showToast({
                    title: '验证码有误！',
                    icon: 'loading',
                    duration: 2000
                })
                return false;
            }
            if (verify_code != user_code) {
                wx.showToast({
                    title: '验证码有误！',
                    icon: 'loading',
                    duration: 2000
                })
                return false;
            }
            wx.request({
                url: link + 'api.php?s=/login/index',
                data: {
                    "token": token,
                    "param": {
                        phone: phone,
                        code: verify_code,
                        user_type: "",
                        company_name: "",
                        taxpayer_id: "",
                        login_type: "",
                        pass_word: ""
                    }
                },
                method: 'POST',
                dataType: 'json',
                success: function(res) {
                    app.globalData.flag = false;
                    wx.setStorage({
                        key: "user",
                        data: res.data.data.result.code
                    })
                    app.globalData.code = res.data.data.result.code;
                    app.globalData.phone = phone;
                    wx.setStorage({
                        key: "phone",
                        data: phone
                    })
                    if (res.data.data.code == 200) {
                        that.setData({
                            flags: true,
                            code: '',
                            code_text: '获取验证码',
                        })
                        wx.showToast({
                            title: '绑定成功',
                            icon: 'success',
                            duration: 2000
                        })
                    } else if (res.data.data.code == 0) {
                        that.setData({
                            flags: true,
                            code: '',
                            code_text: '获取验证码',
                        })
                        wx.showToast({
                            title: res.data.data.msg,
                            duration: 2000
                        })
                    }
                    clearInterval(interval);
                },
                fail: function(res) {

                },
            })
        },
    }
})