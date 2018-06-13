// pages/me/me.js
var comment = require('../../utils/comment.js');
var token = comment.encryption();
var  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:"",
    phone:'绑定手机号',
    code:'',
    code_text:'获取验证码',
    currentTime: 61,
    flag:true 
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
    this.popup = this.selectComponent("#popup");  
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
      },
    })
    var that = this;
    var value = wx.getStorageSync('user');
    if (value) {
      wx.getStorage({
        key: 'user',
        success: function (res) {
          if (res.data) {
            wx.request({
              url: 'http://nt.idea580.com/api.php?s=/user/index',
              data: {
                token: token,
                param: {
                  code: res.data
                }
              },
              method: 'POST',
              dataType: 'json',
              success: function (res) {
                that.setData({
                  phone: res.data.data.result.mobile,
                  flag: false
                })
              },
              fail: function (res) {

              },
            })
          }
        }
      })
    }
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
    if (app.globalData.flag == true){
      this.popup.bindingShow();  
    }
    
  },
  onGetCode: function (e) {
    var that = this;
    that.setData({
      phone: e.detail.val,
    })
  },
  onGetCodeDelete:function(e){
    var that = this;
    that.setData({
      phone: e.detail.val,
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