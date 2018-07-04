var comment = require('../../utils/comment.js');
var token = comment.encryption();
var app = getApp();
var link = app.globalData.link;
var code = wx.getStorageSync('user');
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持  
  },
  /** 
   * 组件的属性列表 
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    time:{
      type:Array,
      value: ''
    },
    int_type_id:{
      type: Number,
      value: ''
    },
    int_city_id:{
      type: Number,
      value: ''
    }
  },

  /** 
   * 组件的初始数据 
   */
  data: {
    flags: true,
    colorColor: '#c9b17b',
    peonumber:'1',
    timeHidden: true,
    date_time:"",
    times: "",
    curIndex: 0,
    curIndexTime: 0,
    dineTime:"请选择时间",
    int_private_room:0,
    room:"",
  },

  /** 
   * 组件的方法列表 
   */
  methods: {
    //组件显示
    bindingShow: function () {
      var that = this;
      that.setData({
        flags: false,
      })
    },
    //组件隐藏
    cancel:function(){
      var that = this;
      that.setData({
        flags: true,
      })
    },
    //选择时间
    selectTime:function(){
      var that = this;
      that.setData({
        date_time: that.data.time,
        times: that.data.time[0].arr_times,
        timeHidden: false,
      })
    },
    //时间弹框关闭
    dineTimeClose: function () {
      var that = this;
      that.setData({
        timeHidden: true,
      })
    },
    //日期选择
    changeDate: function (e) {
      var that = this;
      var value = e.currentTarget.dataset.index;
      var date = e.currentTarget.dataset.date;
      that.setData({
        times: that.data.time[value].arr_times,
        curIndex: value,
      })
    },
    //时间选择
    changeTimes: function (e) {
      var that = this;
      var value = e.currentTarget.dataset.index;
      var date = "";
      that.setData({
        curIndexTime: value
      })
      date = that.data.time[that.data.curIndex].string_date + ' ' + that.data.times[that.data.curIndexTime];
      that.setData({
        dineTime: date,
        timeHidden: true,
      })

    },
    //人数加
    add:function(){
      var that = this;
      if (that.data.peonumber >= 10){
        return false;
      }
      that.data.peonumber++;
      that.setData({
        peonumber: that.data.peonumber
      })
    },
    //人数减
    subtract:function(){
      var that = this;
      if (that.data.peonumber <= 1){
        return false;
      }
      that.data.peonumber--;
      that.setData({
        peonumber: that.data.peonumber
      })
    },
    //包间选择
    switchChange:function(e){
      var that = this;
      if (e.detail.value == true){
        that.setData({
          int_private_room:1,
          room:'包间'
        })
      }else{
        that.setData({
          int_private_room:0,
          room: ''
        })
      }
    },
    //查找餐厅
    seek:function(){
      var that = this;
      if(that.data.dineTime == "请选择时间"){
        wx.showToast({
          title: '请选择时间',
          icon:'none'
        })
        return false;
      }
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
            string_time: that.data.dineTime,
            int_private_room: that.data.int_private_room,
            int_people_num: that.data.peonumber
          }
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if (res.data.data.code == 200) {
            var data = res.data.data.result.arr_shop_data;
            var headeritems ="";
            if (data.length == 0) {
                headeritems = false;
            } else {
                headeritems = true;
            }
            var myEventDetail = {
              condition: that.data.dineTime + ' '+that.data.peonumber+'人 '+that.data.room,
              headeritems: headeritems,
              headerImg:data
            }
            that.triggerEvent('myevent', myEventDetail);
            that.setData({
              flags: true,
            })
          }
        },
        fail: function (res) { },
      })
    }
  }
})  