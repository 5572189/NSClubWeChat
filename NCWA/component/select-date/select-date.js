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
      wx.request({
        url: link + '/api.php?s=/booking/index',
        data: {
          token,
          param: {
            code,
            shopId: 15
          }
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.data.code == 200) {
            var data = res.data.data.result
            that.setData({
              date_time: data.date_time,
              times: data.date_time[0].times,
              timeHidden:false,
            })
          }
        },
        fail: function (res) { },
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
        times: that.data.date_time[value].times,
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
      date = that.data.date_time[that.data.curIndex].date + ' ' + that.data.times[that.data.curIndexTime];
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
      console.log( e.detail.value)
    }
  }
})  