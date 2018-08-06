var comment = require('../../utils/comment.js');
var app = getApp();
var link = app.globalData.link;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      animationLeft: {},
      animationTop:{},
      animationRigth:{},
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
            }
          })
          wx.switchTab({
            url: '../index/index'
          })
        }
      }
    })
    wx.login({
        success: res => {
           wx.getUserInfo({
               success: function (data) {
                   var token = comment.encryption();
                   wx.request({
                       url: link+'/api.php?s=/wechat/wechat_user_info',
                       data: {
                           "token": token,
                           "param": {
                               "string_js_code": res.code,
                               "rawData": data.rawData,
                               "signature": data.signature,
                               "iv": data.iv,
                               "encryptedData": data.encryptedData
                           }
                       },
                       method: 'POST',
                       success: function (res) {
                           var code = res.data.data.result.string_open_id;
                           wx.setStorageSync('open_id', code)
                       }

                   })
               }
           })
        }
    })
  },
  bindGetUserInfo: function () {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.switchTab({
            url: '../index/index',
          })
        }
      }
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