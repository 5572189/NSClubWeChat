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
    status:0,   //订单状态
    shopId:"",
    shopName: "",
    usernumber: "",
    name: "",
    mobile: "",
    time: "",
    note: "",
    cancel:"",
    cancelOrder:true,   //取消订单弹框
    cancelNote:"",   //取消原因文字
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    share_title:"",
    share_image:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.shopid;
    var status = options.status;
    that.setData({
      status,
    })
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
      success: function (res) {
        if (res.statusCode == 200) {
          var data = res.data.data.result;
          that.setData({
            shopId:id,
            shopName: data.shop_name,
            usernumber: data.number,
            name: data.name,
            mobile: data.mobile,
            time: data.time,
            note: data.note,
            cancel: data.cancel,
            share_title: data.share_title,
            share_image: data.share_image,
          })
        }
        console.log(res)
      },
      fail: function (res) { },
    })
  },
  //取消原因
  radioChange:function(e){
    var that = this;
    that.setData({
      cancelNote: e.detail.value
    })
  },
  //取消订单 弹框出现
  cancelOrder: function () {
    var that = this;
    that.setData({
      cancelOrder:false
    })
  },
  //取消订单 弹框隐藏
  think:function(){
    var that = this;
    that.setData({
      cancelOrder: true
    })
  },
  confirmCancel:function(){
    var that = this;
    if (that.data.cancelNote == ""){
      wx.showToast({
        title: '请选择取消原因',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    wx.request({
      url: link + '/api.php?s=/booking/bookingCancel',
      data: {
        token,
        param: {
          code,
          id: that.data.shopId,
          cancelMsg: that.data.cancelNote,
        }
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200){
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 2000,
            success:function(){
              wx.navigateTo({
                url: '../order_detail/order_detail?shopid=' + that.data.shopId + '&status=1'
              })
            }
          })
        }
      },
      fail: function (res) { },
    })
  },
  //删除订单
  delete_order:function(){
    var that = this;
    wx.request({
      url: link + '/api.php?s=/booking/bookingDelete',
      data: {
        token,
        param: {
          code,
          id: that.data.shopId,
        }
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        if(res.statusCode == 200){
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000,
            success:function(){
              wx.navigateTo({
                url: '../mybooking/mybooking',
              })
            }
          })
        }
        console.log(res)
      },
      fail: function (res) { },
    })
  },
  //预定其它餐厅
  other:function(){
    wx.navigateTo({
      url: '../partnerRestaurant/partnerRestaurant',
    })
  },
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: that.data.share_title,
      imageUrl: that.data.share_image,
      path: '/pages/share/share'
    }
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

 
})