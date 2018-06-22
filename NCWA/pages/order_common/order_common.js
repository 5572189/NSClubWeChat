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
    switchColor:'#ceb173',
    placeholderColor:'#c9c9c9',
    hidden:true,
    timeHidden:true,
    shadeswitch:false,
    numberswitch:false,
    phone:"",
    username:"",
    index:0,
    gender:'1',
    shopId:19,
    items: [
      { title: '先生', value: '1', checked: true },
      { title: '女士', value: '2', checked: false },
    ],
    room_max:"",
    room_min:"",
    arrayNumber: [],
    date_time:"",
    times:"",
    curIndex:0,
    curIndexTime:0,
    is_pay:"",
    deposit:"",
    deposit_num:"",
    dineTime:'请选择',
    date:"",
    bookTime:"",
    privateRoom:0,
    hallOptional:0,
    shop_name:"",
    note:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pay = this.selectComponent("#pay");  
    var that = this;
    that.setData({
      phone: wx.getStorageSync('phone'),
    })
    wx.request({
      url: link+'/api.php?s=/booking/index',
      data:{
        token,
        param: {
          code,
          shopId: that.data.shopId
        }
      },
      method: 'POST',
      success: function(res) {
        if(res.data.data.code == 200){
          var data = res.data.data.result
          that.setData({
            is_pay: data.is_pay,
            deposit: data.deposit,
            deposit_num: data.deposit,
            room_max: data.room_max,
            room_min: data.room_min,
            arrayNumber: data.people_num,
            date_time: data.date_time,
            shop_name: data.shop_name,
            times: data.date_time[0].times,
            date: data.date_time[0].date_value,
          })
          console.log(data)
        }
      },
      fail: function(res) {},
    })
  },
  bindSwitch:function(){
    wx.showToast({
      title: '用餐人数不满足包间要求！',
      icon: 'none',
      duration: 1000
    })
  },
  //姓名绑定事件
  bindChangeName:function(e){
    var that = this;
    that.setData({
      username: e.detail.value
    })
  },
  //男女切换
  radioChange: function (e) {
    var that = this;
    that.setData({
      gender: e.detail.value
    })
  },
  //包间切换
  switch1Change: function (e) {
    var val = e.detail.value;
    var that = this;
    if (val == true) {
      that.setData({
        hidden: false,
        numberswitch: e.detail.value,
        privateRoom:1
      })
    } else {
      that.setData({
        hidden: true,
        privateRoom:0,
      })
    }
  },
  //大厅切换
  switch2Change:function(e){
    var that = this;
    var val = e.detail.value;
    if (val == true) {
      that.setData({
        hallOptional: 1
      })
    } else {
      that.setData({
        hidden: true,
        hallOptional: 0,
      })
    }
  },
  //用餐时间点击，弹框显示
  changeDine:function(){
    var that = this;
    that.setData({
      timeHidden: false,
    })
  },
  //时间弹框关闭
  dineTimeClose:function(){
    var that = this;
    that.setData({
      timeHidden: true,
    })
  },
  //日期选择
  changeDate:function(e){
    var  that = this;
    var value = e.currentTarget.dataset.index;
    var date = e.currentTarget.dataset.date;
    that.setData({
      times: that.data.date_time[value].times,
      curIndex: value,
      date: date
    })
  },
  //时间选择
  changeTimes:function(e){
    var that = this;
    var value = e.currentTarget.dataset.index;
    var date = "";
    that.setData({
      curIndexTime: value
    })
    date = that.data.date_time[that.data.curIndex].date +' '+ that.data.times[that.data.curIndexTime];
    that.setData({
      dineTime: date,
      timeHidden:true,
      bookTime: that.data.date+' '+ that.data.times[that.data.curIndexTime],
    })

  },
  // 用餐人数切换
  bindPickerChange: function (e) {
    var that = this;
    var val = that.data.deposit * (parseInt(e.detail.value) + 1);
    that.setData({
      index: e.detail.value,
      deposit_num: val
    })
    if ((that.data.room_min) <= (parseInt(e.detail.value) + 1) && (parseInt(e.detail.value) + 1) <= (that.data.room_max)) {
      that.setData({
        shadeswitch: true
      })
    } else {
      that.setData({
        shadeswitch: false,
        hidden: true,
        numberswitch: false,
        privateRoom:0
      })
    }

  },
  bindChangeMailbox:function(e){
    var that= this;
    that.setData({
      note: e.detail.value
    })
  },
  //立即订座
  btnSave:function(){
    var that = this;
    if (that.data.dineTime == '请选择'){
      wx.showToast({
        title: '请选择用餐时间',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.username == ''){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.is_pay == true){
      that.pay.bindingShow();  
    }else{
      wx.request({
        url: link + 'api.php?s=/booking/postBooking',
        data: {
          token,
          param: {
            code,
            shopId: that.data.shopId,
            payType: 3,
            bookTime: that.data.bookTime,
            number: parseInt(that.data.index) + 1,
            privateRoom: that.data.privateRoom,
            hallOptional: that.data.hallOptional,
            name: that.data.username,
            gender: that.data.gender,
            mobile: that.data.phone,
            note: that.data.note,
          }
        },
        method: 'POST',
        success: function (res) {
          var book_id = res.data.data.result.book_id;
          if (res.data.data.code == 200) {
            //预定过，提示框
            // wx.showModal({
            //   content: '您已预订过该时段到店用餐如需重新预订请先取消之前订单',
            //   showCancel:false,
            //   confirmText:'知道了',
            //   confirmColor:"#d4ba83",
            //   success: function (res) {
            //     if (res.confirm) {
            //       console.log('用户点击确定')
            //     } 
            //   }
            // })
            wx: wx.navigateTo({
              url: '../order_waiting/order_waiting?id=' + book_id,
            })
          } else if (res.data.data.code == 0) {
            wx.showModal({
              title: '提示',
              content: res.data.data.msg,
              success: function (res) {
                if (res.confirm) {
                  wx: wx.navigateTo({
                    url: '../order_waiting/order_waiting?id=' + book_id,
                  })
                }
              }
            })
          }

          console.log(res)
        },
        fail: function (res) { },
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})