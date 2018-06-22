var comment = require('../../utils/comment.js');
var token = comment.encryption();
var app = getApp();
var link = app.globalData.link;
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
    bindinghidden:function(){
      var that = this;
      that.setData({
        flags: true,
      })
    },
    affirm_pay:function(){
      
    }
  }
})  