var comment = require('../../utils/comment.js');
const app = getApp()
var link = app.globalData.link;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        headerImg: "",
        link: link,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var token = comment.encryption();
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
                    self.setData({
                        headerImg: res.data.data.result.arr_index_life_data
                    })
                }
            },
            fail: function(res) {

            },
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