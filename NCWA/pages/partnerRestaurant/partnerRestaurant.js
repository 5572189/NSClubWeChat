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
    link: link,
    isScroll:true,
    selectAll:true,
    selectKind:true,
    headeritems:true,
    headerImg: "",
    dataSelect:true,
    dataSelectkind:true,
    curIndex:0,
    curIndexkind:0,
    city:'全部',
    kind:'品类',
    selectCity:"",
    select_kind:"",
    time:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timeComponent = this.selectComponent("#timeComponent");  
    var token = comment.encryption();
    var that = this;
    wx.request({
      url: link + 'api.php?s=/booking/booking_list_search',
      method: 'POST',
      data: {
        token: token,
        param:{
          code,
          lang:'cn',
          index : false,
          cityId: 1
        }
      },
      dataType: 'json',
      success: function (res) {
        if (res.data.data.code == 200) {
          that.setData({
            headerImg: res.data.data.result.arr_shop_data
          })
        }
        console.log(res)
      },
      fail: function (res) {

      },
    });
    wx.request({
      url: link + '/api.php?s=/booking/booking_list ',
      method: 'POST',
      data: {
        token: token,
        param: {
          code,
          lang: 'cn',
          index: false,
          cityId: 1
        }
      },
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res.data.data.code == 200) {
          var arr = {
            "int_id": 0,
            "string_name": '全部',
            "string_name_short": '全部',
            'string_title_cn':'全部'
          }
          res.data.data.result.arr_shop_types.unshift(arr);
          res.data.data.result.arr_city.unshift(arr);
          var data_city = res.data.data.result.arr_city;
          var data_kind = res.data.data.result.arr_shop_types;
          that.setData({
            time : res.data.data.result.arr_booking_time,
            select_kind: data_kind,
            selectCity: data_city,
          })
        }
      },
      fail: function (res) { },
    })
  },
  selectNav:function(){
    var that = this;
    that.setData({
      selectAll: !that.data.selectAll,
      selectKind:true,
    })
    if (that.data.selectAll == true){
      that.setData({
        dataSelect: true,
        dataSelectkind:true
      })
    }else{
      that.setData({
        dataSelect: false,
        dataSelectkind: true
      })
    }
  },
  selectKind:function(){
    var that = this;
    that.setData({
      selectKind: !that.data.selectKind,
      selectAll:true
    })
    if (that.data.selectKind == true) {
      that.setData({
        dataSelectkind: true,
        dataSelect:true,
      })
    } else {
      that.setData({
        dataSelectkind: false,
        dataSelect: true,
      })
    }
  },
  historyBook:function(){
    var value = wx.getStorageSync('user');
    if(value){
      wx.navigateTo({
        url: '../mybooking/mybooking'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请先绑定手机号',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../me/me'
            })
          } else if (res.cancel) {
            
          }
        }
      })
    }
  },
  citySelect:function(e){
    let that= this;
    let cid = e.currentTarget.dataset.index,
        city = e.currentTarget.dataset.city;
    that.setData({
      curIndex : cid,
      city,
      dataSelect:true,
      selectAll:true,
    })
    wx.request({
      url: link +'/api.php?s=/booking/booking_list_search',
      data: {
        token: token,
        param: {
          code,
          lang: 'cn',
          cityId: cid
        }
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
    })
  },
  kindSelect:function(e){
    let that = this;
    let cid = e.currentTarget.dataset.index,
      kind = e.currentTarget.dataset.kind;
    that.setData({
      curIndexkind: cid,
      kind,
      dataSelectkind: true,
      selectKind: true,
    })
  },
  bindingShow: function () {
    var that = this;
    that.timeComponent.bindingShow();

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