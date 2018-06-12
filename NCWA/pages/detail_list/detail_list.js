// pages/detail_list/detail_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTabs: 0,
  },
  swichNavs: function (e) {
    var that = this;
    if (that.data.currentTabs === e.target.dataset.currents) {
      return false;
    } else {
      var current = e.target.dataset.currents;
      that.setData({
        currentTabs: parseInt(current)
      });
    }
  },
  bindschoolChange: function (e) {
    var that = this;
    that.setData({ currentTabs: e.detail.current });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var num = options.value;
    that.setData({
      currentTabs: num
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