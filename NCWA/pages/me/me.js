// pages/me/me.js
var comment = require('../../utils/comment.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code:'',
    phone_text:'绑定手机号',
    code_text:'获取验证码',
    flag: true,
    currentTime: 61
  },
  // tapindex:function(e){
  //   var that = this;
  //   var num = e.target.dataset.currents;
  //   wx.navigateTo({
  //     url: '../detail_list/detail_list?value='+num,
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  scan:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  // 绑定手机号 弹框
  bindingShow: function () {
    var self = this;
    self.setData({
      flag: false
    })
  },
  bindingHide:function(){
    var self = this;
    self.setData({
      flag: true
    })
  },
  // 获取验证码
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    var interval = setInterval(function () {
      currentTime--;
      that.setData({
        code_text: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          code_text: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  bindChange: function (e) {
    var that = this;
    that.setData({
      phone: e.detail.value
    })
  },
  codeAcquire:function(){
    var that = this;
    var token = comment.encryption();
    var mobile = that.data.phone;
    
    if (!/^1[34578]\d{9}$/.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        duration: 2000
      }) 
      return false;
    }
    wx.request({
      url: 'http://nt.idea580.com/api.php?s=/login/sendCode',
      data: {
        token: token,
        mobile: mobile
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {

      },
    })
    that.getCode();
    that.setData({
      disabled: true
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
    return {
      title: '微信小程序',
      desc: '最具人气的小程序!',
      path: '/page/index?id=123'
    }
  }
})