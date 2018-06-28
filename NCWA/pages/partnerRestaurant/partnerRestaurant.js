var comment = require('../../utils/comment.js');
var token = comment.encryption();
const app = getApp()
var link = app.globalData.link;
var code = wx.getStorageSync('user');
var isresult = true;
function list_search(that,page){
  
  if (isresult){
    wx.request({
      url: link + 'api.php?s=/booking/booking_list_search',
      method: 'POST',
      data: {
        token: token,
        param: {
          code: that.data.code,
          int_city_id: that.data.int_city_id,
          int_page: page,
          int_user_city_id: 1,
          int_type_id: that.data.int_type_id,
          string_time: "",
          int_private_room: 0,
        }
      },
      dataType: 'json',
      success: function (res) {
        if (res.data.data.code == 200) {
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 500,
          })
          var data = res.data.data.result.arr_shop_data,
            headerdata = that.data.headerdata;
          for (var i = 0; i < data.length; i++) {
            headerdata.push(data[i])
          }
          that.setData({
            headerImg: that.data.headerdata
          })
          if(data.length == 0){
            isresult = false;
          }
        }
        console.log(res)
      },
      fail: function (res) {

      },
    });
  }
  
}

function select(that){
  wx.request({
    url: link + '/api.php?s=/booking/booking_list_search',
    data: {
      token: token,
      param: {
        code,
        int_city_id: that.data.int_city_id,
        int_page: 1,
        int_user_city_id: 1,
        int_type_id: that.data.int_type_id,
        string_time: "",
        int_private_room: 0,
        int_people_num: "",
      }
    },
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (res.data.data.code == 200) {

        var data = res.data.data.result.arr_shop_data;
        if (data.length == 0) {
          that.setData({
            headeritems: false,
          })
        } else {
          that.setData({
            headeritems: true,
          })
        }
        that.setData({
          headerImg: res.data.data.result.arr_shop_data,
          headerdata: res.data.data.result.arr_shop_data,
          page: 1
        })
      }
    },
    fail: function (res) { },
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:code,
    link: link,
    isScroll:true,
    selectAll:true,
    selectKind:true,
    headeritems:true,
    headerImg: [],
    headerdata:[],
    dataSelect:true,
    dataSelectkind:true,
    curIndex:0,
    curIndexkind:0,
    city:'全部',
    kind:'品类',
    selectCity:"",
    select_kind:"",
    time:"",
    int_type_id:0,
    int_city_id:0,
    condition:"你好，什么时候，几位？",
    reset:false,
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timeComponent = this.selectComponent("#timeComponent");  
    this.popup = this.selectComponent("#popup"); 
    var that = this;
    list_search(that, that.data.page)
 
    wx.request({
      url: link + '/api.php?s=/booking/booking_list',
      method: 'POST',
      data: {
        token: token,
        param: {
          code: that.data.code,
          int_city_id: that.data.int_city_id,
          int_page: 1,
          int_user_city_id: 1,
          int_type_id: that.data.int_type_id,
          string_time: "",
          int_private_room: 0,
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
    isresult = true;
    let that= this;
    let id = e.currentTarget.dataset.cid,
        index = e.currentTarget.dataset.index,
        city = e.currentTarget.dataset.city;
    that.setData({
      curIndex: index,
      city,
      int_city_id:id,
      dataSelect:true,
      selectAll:true,
    })
    select(that)
  },
  kindSelect:function(e){
    isresult = true;
    let that = this;
    let id = e.currentTarget.dataset.cid,
      index = e.currentTarget.dataset.index,
      kind = e.currentTarget.dataset.kind;
    that.setData({
      curIndexkind: index,
      kind,
      int_type_id: id,
      dataSelectkind: true,
      selectKind: true,
    })
    select(that)
  },
  bindingShow: function () {
    var that = this;
    that.timeComponent.bindingShow();

  },
  // 组件传值搜索
  onSeek:function(e){
    var that = this,
        headeritems = e.detail.headeritems,
        headerImg = e.detail.headerImg,
        condition = e.detail.condition;
    that.setData({
      headeritems,
      headerImg,
      condition,
      reset:true,
      headerdata:headeritems
    })
  },
  //重置条件
  resetCondition:function(){
    var that = this;
    wx.request({
      url: link + '/api.php?s=/booking/booking_list_search',
      data: {
        token: token,
        param: {
          code,
          int_city_id: that.data.int_city_id,
          int_page: 1,
          int_user_city_id: 1,
          int_type_id: that.data.int_type_id,
          string_time: "",
          int_private_room: 0,
          int_people_num: "",
        }
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.data.code == 200) {
          var data = res.data.data.result.arr_shop_data;
          if (data.length == 0) {
            that.setData({
              headeritems: false,
            })
          } else {
            that.setData({
              headeritems: true,
            })
          }
          that.setData({
            condition: "你好，什么时候，几位？",
            reset:false,
            headerImg: res.data.data.result.arr_shop_data
          })
        }
      },
      fail: function (res) { },
    })
  },
  shopBook:function(e){
    var code = wx.getStorageSync('user');
    var that = this,
        shopid = e.currentTarget.dataset.shopid;
        console.log(code)
        if(code == ""){
          wx.showToast({
            title: '请先绑定手机号',
            icon:'none',
            duration:1000,
            success:function(){
              setTimeout(function(){
                that.popup.bindingShow(); 
              },1000)
            }
          })
        }else{
          that.setData({
            code: code
          })
          wx.navigateTo({
            url: '../order_common/order_common?shopid=' + shopid,
          })
        }
    
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  bindscroll: function () {
    var that = this,
        page = that.data.page;
        page++;
        that.setData({
          page,
        })
       
        list_search(that, that.data.page)
        console.log(that.data.headerImg)
  },
  preventTouchMove:function(){

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})