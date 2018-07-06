var comment = require('../../utils/comment.js');
var token = comment.encryption();
var app = getApp();
var link = app.globalData.link;
var code = wx.getStorageSync('user');
if (!code) {
    code = "";
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        share_title: "",
        share_image: "",
        number: "",
        time: "",
        string_shop_address: "",
        mobile: "",
        name: "",
        id: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var id = options.book_id,
            int_uid = options.int_uid;
     
        wx.request({
            url: link + 'api.php?s=/booking/bookingDetail',
            data: {
                token,
                param: {
                    code,
                    int_uid: int_uid,
                    id,
                }
            },
            method: 'POST',
            dataType: 'json',
            success: function(res) {
                if (res.statusCode == 200) {
                    var result = res.data.data.result
                    that.setData({
                        share_title: result.share_title,
                        share_image: result.share_image,
                        number: result.number,
                        time: result.time,
                        string_shop_address: result.string_shop_address,
                        mobile: result.mobile,
                        name: result.name,
                        id: result.int_adver_id,
                    })
                }

            },
            fail: function(res) {},
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

    }
})