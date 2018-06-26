//获取应用实例
var comment = require('../../utils/comment.js');
const app = getApp()
var link = app.globalData.link;
Page({
  data: {
    index:"",
    img:[
      { url: 'http://www.noble-spirits.com/Uploads/2017-12-22/5a3ce14019abb.jpg', name: '至尊海鲜拼盘' },
      { url: 'http://www.noble-spirits.com/Uploads/2017-12-22/5a3ce132ee1ba.jpg', name:'纽西兰鱼柳沙拉伴辣味乳酪酱'},
      { url: 'http://www.noble-spirits.com/Uploads/2017-12-22/5a3ce12a3d040.jpg', name: '火辣鸡翅 (6 只)' },
      { url: 'http://www.noble-spirits.com/Uploads/2017-12-22/5a3ce1182d9c9.jpg', name: '经典汉堡套餐' },
      { url: 'http://www.noble-spirits.com/Uploads/2017-12-22/5a3ce110504ba.jpg', name: '鸭油薯角 (小)' },
      { url: 'http://www.noble-spirits.com/Uploads/2017-12-22/5a3ce0d51be3c.jpg', name: '重量级龙虾三明治' },
    ]
  },
  
  onLoad: function (options) {
    this.menu = this.selectComponent("#menu");  
  },
  menuShow:function(e){
    var ind = e.currentTarget.dataset.index;
    this.setData({
      index:ind
    })
    this.menu.bindingShow()
  }


})