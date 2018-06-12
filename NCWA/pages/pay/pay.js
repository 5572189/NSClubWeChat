// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:0,
    selects: 0,
    active:"active",
    activeinvoice:"activeinvoice",
    disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  pay_switchover:function(e){
    var that = this;

    if (this.data.select === e.target.dataset.colors) {
      return false;
    } else {
      that.setData({
        select: e.target.dataset.color
      })
    }
  },
  pay_switch:function (e) {
    var that = this;
    if (this.data.selects === e.target.dataset.colors) {
      return false;
    } else {
      that.setData({
        selects: e.target.dataset.colors
      })
    }
    if (e.target.dataset.colors == 0){
      that.setData({
        active: "active"
      })
    }else{
      that.setData({
        active: "activeblock"
      })
    }
  },
  switchChange:function(e){
    var that = this;
    if (e.detail.value){
      that.setData({
        activeinvoice:"activeinvoiceblock"
      })
    }else{
      that.setData({
        activeinvoice: "activeinvoice"
      })
    }
  },
  submit:function(e){
    var that = this;
    var flag = e.target.dataset.disabled;
    if (that.data.disabled == flag){
      wx.showToast({
        title: '请不要重复支付',//提示信息
        duration: 2000//时间
      });
    }
    console.log(flag)
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