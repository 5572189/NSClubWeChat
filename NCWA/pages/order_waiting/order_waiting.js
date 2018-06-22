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
    shopid:"",
    shopName:"",
    usernumber:"",
    name:"",
    mobile:"",
    time:"",
    note:"",
    status:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    wx.request({
      url: link+'/api.php?s=/booking/bookingDetail',
      data: {
        token,
        param:{
          code,
          id,
        }
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        if(res.statusCode == 200){
          var data = res.data.data.result;
          that.setData({
            shopid:id,
            shopName:data.shop_name,
            usernumber: data.number,
            name: data.name,
            mobile: data.mobile,
            time:data.time,
            note: data.note,
            status: data.status
          })
          
        }
        
        console.log(res)
      },
      fail: function(res) {},
    })
  },
  check:function(){
    var that = this;
    wx.navigateTo({
      url: '../order_detail/order_detail?shopid=' + that.data.shopid+'&status=' + that.data.status,
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