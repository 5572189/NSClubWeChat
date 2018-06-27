// pages/detail/detail.js
var comment = require('../../utils/comment.js');
var token = comment.encryption();
const app = getApp()
var link = app.globalData.link;
var code = wx.getStorageSync('user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr_shop_detail: '',
    arr_shop_menu:'',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    color: "#ceb173",
    colorALL: '#F3F3F3',
    shopServer:3,
    id:"",
    link:link,
    hasmenu:true,

  },
  orderCommon:function(){
    var that = this;
    wx.navigateTo({
      url: '../order_common/order_common?shopid=' + that.data.arr_shop_detail.int_shop_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
        int_id = options.id; 
    wx.request({
      url: link+'/api.php?s=/shop/shop_detail',
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
        var data = res.data.data.result;
        if (data.arr_shop_menu.length == 0){
          that.setData({
            hasmenu:true
          })
        }else{
          that.setData({
            hasmenu: false
          })
        }
        if (data.arr_shop_detail.int_booking_status == 3){
          that.setData({
            shopServer: 3
          })
        } else if (data.arr_shop_detail.int_booking_status == 2){
          that.setData({
            shopServer: 2
          })
        }else{
          that.setData({
            shopServer: 1
          })
        }
        that.setData({
          arr_shop_detail: data.arr_shop_detail,
          arr_shop_menu: data.arr_shop_menu
        })
        console.log(res)
      },
      fail: function(res) {},
    })
   
  },
  checkAll:function(){
    var that = this;
    wx.navigateTo({
      url: '../shopmenu/shopmenu?shopid=' + that.data.arr_shop_detail.int_shop_id,
    })
  },
  server:function(){
    wx.makePhoneCall({
      phoneNumber: '02160758888' 
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