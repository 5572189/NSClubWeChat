var comment = require('../../utils/comment.js');
var token = comment.encryption();
var app = getApp();
var link = app.globalData.link;
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
        },
        shopId:{
            type:Number,
            value:""
        },
        bookTime:{
            type: String,
            value: ''
        },
        number:{
            type: Number,
            value: ""
        },
        privateRoom:{
            type: Number,
            value: "" 
        },
        hallOptional:{
            type: Number,
            value: "" 
        },
        name:{
            type: String,
            value: '' 
        },
        gender:{
            type: String,
            value: '' 
        },
        mobile:{
            type: String,
            value: '' 
        },
        note:{
            type: String,
            value: '' 
        }
    },

    /** 
     * 组件的初始数据 
     */
    data: {
        flags: true,
    },

    /** 
     * 组件的方法列表 
     */
    methods: {
        //组件显示
        bindingShow: function() {
            var that = this;
            that.setData({
                flags: false,
            })
        },
        bindinghidden: function() {
            var that = this;
            that.setData({
                flags: true,
            })
        },
        affirm_pay: function() {
            var that = this
            var code = wx.getStorageSync('user');
            // that.getOpenId(res.code)
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    wx.request({
                        url: link + '/api.php?s=/booking/postBooking',
                        data: {
                            token,
                            param: {
                                code,
                                js_code: res.code,
                                shopId: that.data.shopId,
                                payType: 3,
                                bookTime: that.data.bookTime,
                                number: parseInt(that.data.number) + 1,
                                privateRoom: that.data.privateRoom,
                                hallOptional: that.data.hallOptional,
                                name: that.data.name,
                                gender: that.data.gender,
                                mobile: that.data.phone,
                                note: that.data.note,
                            }

                        },
                        method: 'POST',
                        success: function (res) {
                            console.log(res)
                            var book_id = res.data.data.result.book_id;
                            if(res.data.data.code == 200){
                                var data = JSON.parse(res.data.data.result.string_wechat_program);
                                wx.requestPayment({
                                    'timeStamp': data.timeStamp,
                                    'nonceStr': data.nonceStr,
                                    'package': data.package,
                                    'signType': data.signType,
                                    'paySign': data.paySign,
                                    'success': function (res) {
                                        wx: wx.navigateTo({
                                            url: '../order_waiting/order_waiting?id=' + book_id,
                                        })
                                        console.log(res)
                                    },
                                    'fail': function (res) {

                                    }
                                })
                            } else if (res.data.data.code == 0){
                                wx.showModal({
                                    title: '提示',
                                    content: res.data.data.msg,
                                    showCancel: false,
                                    confirmText: '知道了',
                                    confirmColor: '#ceb173',
                                    success: function (res) {

                                    }
                                })
                            }
                            
                        },
                        fail: function (res) { },
                    })   
                }
            })
            

        },
    }
})