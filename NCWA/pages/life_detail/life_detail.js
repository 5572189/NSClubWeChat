var comment = require('../../utils/comment.js');
var token = comment.encryption();
var app = getApp();
var link = app.globalData.link;
var code = wx.getStorageSync('user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link:link,
    string_title:"",
    string_update_time:"",
    img:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
        int_id = options.int_id;
    wx.request({
      url: link +'/api.php?s=/life/life_detail',
      data: {
        token: token,
        param: {
          code,
          int_id,
        }
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        if(res.statusCode == 200){
          var re = /\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i ;
          var life = res.data.data.result.arr_info,
              img = life.string_content.match(re)[1];
          that.setData({
            string_title: life.string_title,
            string_update_time: life.string_update_time,
            img,
          })
        }
      },
      fail: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})