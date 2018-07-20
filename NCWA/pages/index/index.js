//获取应用实例
var comment = require('../../utils/comment.js');
const app = getApp()
var link = app.globalData.link;

Page({
    data: {
        headerImg: "",
        link: link,
        swiperIndex: 0,
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 500,
        indicatorDots:true,
        color: "#ceb173",
        colorALL: '#F3F3F3',
        month: "",
        year: "",
        businessNumber: "",
        lifeNumber: "",
    },
   
    onLoad: function(options) {


        var token = comment.encryption();
        var time = new Date();
        var self = this;
        wx.request({
            url: link + '/api.php?s=/index/app_index',
            method: 'POST',
            data: {
                token: token

            },
            dataType: 'json',
            success: function(res) {
                if (res.data.data.code == 200) {
                    if (res.data.data.result.arr_index_banner_data.length == 1){
                        self.setData({
                            indicatorDots:false
                        })
                    }
                    self.setData({
                        headerImg: res.data.data.result,
                        year: time.getFullYear(),
                        month: time.getMonth() + 1,
                        businessNumber: res.data.data.result.arr_index_cooperation_data.length,
                        lifeNumber: res.data.data.result.arr_index_life_data.length,
                    })
                }
                
            },
            fail: function(res) {
                console.log(res)
                wx.showModal({
                    title: '提示',
                    content: '网络异常！',
                    showCancel:false,
                    confirmText:"知道了",
                    confirmColor:"#ceb173",
                    success: function (res) {
                        
                    }
                })
            },
        })
    },
    swiperChange(e) {
        this.setData({
            swiperIndex: e.detail.current
        })
    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: '樽尚汇',
            path: 'pages/index/index',
            success: function(res) {
                // 转发成功
                wx.showToast({
                    title: '转发成功', //提示信息
                    duration: 2000 //时间
                });
            },
            fail: function(res) {

            }
        }
    },
})