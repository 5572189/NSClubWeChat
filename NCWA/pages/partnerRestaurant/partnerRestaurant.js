var comment = require('../../utils/comment.js');
var token = comment.encryption();
const app = getApp()
var link = app.globalData.link;
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
    curIndex:0,
    city:'全部',
    kind:'品类',
    selectCity:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timeComponent = this.selectComponent("#timeComponent");  
    var token = comment.encryption();
    var that = this;
    wx.request({
      url: link + 'api.php?s=/index/getAdverList',
      method: 'POST',
      data: {
        token: token,
        param:{
          lang:'cn',
          index : false,
          cityid: 1
        }
      },
      dataType: 'json',
      success: function (res) {
        if (res.data.data.code == 200) {
          that.setData({
            headerImg: res.data.data.result
          })
        }
        console.log(res)
      },
      fail: function (res) {

      },
    })
  },
  selectNav:function(){
    var that = this;
    that.setData({
      selectAll: !that.data.selectAll
    })
    if (that.data.selectAll == true){
      that.setData({
        dataSelect: true
      })
    }else{
      wx.request({
        url: link + '/api.php?s=/index/app_index',
        method: 'POST',
        data: {
          token: token,
          param: {
            lang: 'cn',
            int_city_id: 1,
          }
        },
        dataType: 'json',
        success: function (res) {
          if (res.data.data.code == 200) {
            var arr = {
              "int_id": 0,
              "string_name": '全部',
              "string_name_short": '全部',
            }
            res.data.data.result.arr_city_data.unshift(arr);
            var data = res.data.data.result.arr_city_data;
            that.setData({
              selectCity: data,
              dataSelect: false
            })
          }
        },
        fail: function(res) {},
      })
    }
  },
  selectKind:function(){

  },
  citySelect:function(e){
    let that= this;
    let cid = e.currentTarget.dataset.cid,
        city = e.currentTarget.dataset.city;
    that.setData({
      curIndex : cid,
      city,
      dataSelect:true,
      selectAll:true,
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