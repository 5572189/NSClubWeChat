// pages/me/me.js
var comment = require('../../utils/comment.js');
var token = comment.encryption();
var  app = getApp();
var link = app.globalData.link;
var value = wx.getStorageSync('user');
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
    flag:true ,
    phoneHidden:true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('user');
    console.log(app.globalData.userInfo)
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
    if (value) {
      wx.getStorage({
        key: 'user',
        success: function (res) {
          if (res.data) {
            wx.request({
              url: link+'/api.php?s=/user/index',
              data: {
                token: token,
                param:{
                  code: res.data
                }
              },
              method: 'POST',
              dataType: 'json',
              success: function (res) {
                console.log(res)
                that.setData({
                  phone: res.data.data.result.mobile,
                  flag: false,
                  phoneHidden:false,
                })
              },
              fail: function (res) {
                that.setData({
                  phoneHidden: false,
                })
              },
            })
          }
        }
      })
    }else{
      that.setData({
        phoneHidden: false,
      })
    }
  },


  //扫一扫
  scan:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
        wx.navigateTo({
          url: '../link/link?link='+res.result,
        })
      }
    })
  },
  linkMyaccount:function(){
    var value = wx.getStorageSync('user');
    var that = this;
    if (value){
     
      wx.reLaunch({
        url: '../myAccount/myAccount'
      }) 
    }else{
      wx.showToast({
        title: '请先绑定手机号',
        icon: 'none',
        duration: 1000,
      });
    }
  },
  linkMybooking:function(){
    var value = wx.getStorageSync('user');
    var that = this;
    if (value) {
      wx.reLaunch({
        url: '../mybooking/mybooking'
      })
    } else {
     
      wx.showToast({
        title: '请先绑定手机号',
        icon: 'none',
        duration: 1000,
      });
    }
  },
  // 绑定手机号 弹框
  bindingShow: function () {
    // if (app.globalData.flag == true){
      this.popup.bindingShow();  
    // }
    
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
 
  }
})