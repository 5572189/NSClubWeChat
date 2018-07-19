var comment = require('../../utils/comment.js');
var token = comment.encryption();
var app = getApp();
var link = app.globalData.link;
var code = wx.getStorageSync('user');
var setStatus = "";

function status(that, id) {
    var code = wx.getStorageSync('user');
    wx.request({
        url: link + '/api.php?s=/booking/bookingDetail',
        data: {
            token,
            param: {
                code,
                id,
            }
        },
        method: 'POST',
        dataType: 'json',
        success: function(res) {
            if (res.statusCode == 200) {
                var data = res.data.data.result;
                that.setData({
                    shopid: id,
                    shopName: data.shop_name,
                    usernumber: data.number,
                    name: data.name,
                    mobile: data.mobile,
                    time: data.time,
                    note: data.note,
                    status: data.status,
                    private_room: data.private_room,
                    share_title: data.share_title,
                    share_image: data.share_image,
                    int_uid: data.int_uid,
                })
                if (data.status == 2) {
                    clearInterval(setStatus)
                    that.setData({
                        shareMessage:false
                        
                    })
                } else if (data.status == 3) {
                    clearInterval(setStatus)
                    wx.showModal({
                        title: '提示',
                        content: '抱歉，商家本时段桌位已满',
                        showCancel: false,
                        confirmText: '知道了',
                        confirmColor: '#ceb173',
                        success: function(res) {
                            wx.navigateTo({
                                url: '../order_detail/order_detail?shopid=' + id + '&status=' + data.status
                            })
                        }
                    })
                } else if (data.status == 1) {
                    clearInterval(setStatus)
                }
            }

        },
        fail: function(res) {},
    })
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopid: "",
        shopName: "",
        usernumber: "",
        name: "",
        mobile: "",
        time: "",
        note: "",
        status: "",
        private_room: "",
        shareMessage:true,
        share_title:"",
        share_image:"",
        int_uid:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var id = options.id;
        status(that, id)
        setStatus = setInterval(function() {
            status(that, id)
        }, 2000)

    },
    confirm_btn:function(){
        wx.navigateTo({
            url: '../order_detail/order_detail?shopid=' + this.data.shopid + '&status=' + this.data.status
        })
    },
    check: function() {
        var that = this;
        wx.navigateTo({
            url: '../order_detail/order_detail?shopid=' + that.data.shopid + '&status=' + that.data.status,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        var that = this;
       
        return {
            title: that.data.share_title,
            imageUrl: that.data.share_image,
            path: '/pages/share/share?book_id=' + that.data.shopid + '&int_uid=' + that.data.int_uid
        }
    }
})