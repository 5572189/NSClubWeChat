//获取应用实例
var comment = require('../../utils/comment.js');
var token = comment.encryption();
const app = getApp()
var link = app.globalData.link;
var code = wx.getStorageSync('user');
Page({
    data: {
        link: link,
        index: "",
        arr_shop_menu: "",
    },

    onLoad: function(options) {
        var that = this,
            shopid = options.shopid;
        that.menu = that.selectComponent("#menu");
        wx.request({
            url: link + '/api.php?s=/shop/shop_menu_detail',
            data: {
                token: token,
                param: {
                    code,
                    int_shop_id: shopid
                }
            },
            method: 'POST',
            dataType: 'json',
            success: function(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        arr_shop_menu: res.data.data.result.arr_shop_menu
                    })
                }
            },
            fail: function(res) {},
        })
    },
    menuShow: function(e) {
        var ind = e.currentTarget.dataset.index;
        this.setData({
            index: ind
        })
        this.menu.bindingShow()
    }


})