// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://nt.idea580.com/Uploads/2017-12-13/5a30f831d640e.jpg',
      'http://nt.idea580.com/Uploads/2017-12-13/5a30f831dc8bb.jpg',
      'http://nt.idea580.com/Uploads/2017-12-13/5a30f831e3eab.jpg',
      'http://nt.idea580.com/Uploads/2017-12-13/5a30f83225ecd.jpg',
      'http://nt.idea580.com/Uploads/2017-12-13/5a30f8322ce1c.jpg',
      'http://nt.idea580.com/Uploads/2017-12-13/5a30f8324198a.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    color: "#ceb173",
    colorALL: '#F3F3F3',
    shopServer:false,
    id:""
  },
  orderCommon:function(){
    var that = this;
    wx.navigateTo({
      url: '../order_common/order_common',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   
  },
  checkAll:function(){
    wx.navigateTo({
      url: '../shopmenu/shopmenu',
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