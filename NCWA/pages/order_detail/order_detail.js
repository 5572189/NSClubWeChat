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
        status: 0, //订单状态
        shopId: "",
        shopName: "",
        usernumber: "",
        name: "",
        mobile: "",
        time: "",
        id:"",
        note: "",
        cancel: "",
        cancelOrder: true, //取消订单弹框
        cancelNote: "", //取消原因文字
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        share_title: "",
        share_image: "",
        int_uid: "",
        maskHidden: false,
        touxiang: "",
        private_room:0,
    },
    //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
    createNewImg: function() {
        var that = this;
        var context = wx.createCanvasContext('mycanvas');
        context.setFillStyle("#ffe200")
        context.fillRect(0, 0, 375, 667)
        var path = "../../images/gobg.png";
        //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
        //不知道是什么原因，手机环境能正常显示
        //0,0，375，183 0,0 位置  375,183 宽高
        context.drawImage(path, 0, 0, 375, 183);

        //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
        var path1 = that.data.touxiang;
        var path2 = "../../images/txquan.png";
        var path3 = "../../images/heise.png";
        var path4 = "../../images/wenziBg.png";
        var path5 = "../../images/wenxin.png";
        context.drawImage(path2, 126, 186, 120, 120);
        //不知道是什么原因，手机环境能正常显示
        context.save(); // 保存当前context的状态

        var name = that.data.name;
        //绘制名字
        context.setFontSize(24);
        context.setFillStyle('#333333');
        context.setTextAlign('center');
        context.fillText(name, 185, 340);
        context.stroke();
        //绘制一起吃面标语
        context.setFontSize(16);
        context.setFillStyle('#333333');
        context.setTextAlign('center');
        context.fillText("邀请您一起用餐", 185, 370);
        context.stroke();
        //绘制商店名背景
        context.drawImage(path3, 48, 390, 280, 84);
        //绘制code码
        context.setFontSize(18);
        context.setFillStyle('#ffe200');
        context.setTextAlign('center');
        context.fillText(this.data.shopName, 188, 430,600);
        context.stroke();
        //绘制左下角文字背景图
        context.drawImage(path4, 25, 520, 184, 82);
        context.setFontSize(12);
        context.setFillStyle('#333');
        context.setTextAlign('left');
        context.fillText("进入小程序需要您的授权才", 35, 540);
        context.stroke();
        context.setFontSize(12);
        context.setFillStyle('#333');
        context.setTextAlign('left');
        context.fillText("能正确的使用！绑定手机号", 35, 560);
        context.stroke();
        context.setFontSize(12);
        context.setFillStyle('#333');
        context.setTextAlign('left');
        context.fillText("以便更好的为您服务！", 35, 580);
        context.stroke();
        //绘制右下角扫码提示语
        context.drawImage("/images/ewm.jpg", 248, 510, 100, 100);
        context.stroke();
        //绘制右下角扫码提示语
        context.drawImage(path5, 255, 612, 90, 25);
        context.stroke();
        //绘制头像
        context.arc(186, 246, 50, 0, 2 * Math.PI, false) //画出圆
        context.strokeStyle = "#ffe200";
        context.clip(); //裁剪上面的圆形
        context.drawImage(path1, 136, 196, 100, 100); // 在刚刚裁剪的园上画图
        context.draw();
        context.stroke();
        //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
        setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: 'mycanvas',
                success: function(res) {
                    var tempFilePath = res.tempFilePath;
                    that.setData({
                        imagePath: tempFilePath,
                        canvasHidden: true
                    });
                },
                fail: function(res) {}
            });
        }, 200);
    },
    //点击保存到相册
    baocun: function() {
        var that = this
        wx.saveImageToPhotosAlbum({
            filePath: that.data.imagePath,
            success(res) {
                wx.showModal({
                    content: '图片已保存到相册，赶紧晒一下吧~',
                    showCancel: false,
                    confirmText: '知道啦',
                    confirmColor: '#ceb173',
                    success: function(res) {
                        if (res.confirm) {
                            /* 该隐藏的隐藏 */
                            that.setData({
                                maskHidden: false
                            })
                        }
                    },
                    fail: function(res) {}
                })
            },
            fail(res) {
                wx.openSetting({

                })
            }
        })
    },
    //点击生成
    formSubmit: function(e) {
        var that = this;
        this.setData({
            maskHidden: false
        });
        wx.showToast({
            title: '正在生成...',
            icon: 'loading',
            duration: 1000
        });
        setTimeout(function() {
            wx.hideToast()
            that.createNewImg();
            that.setData({
                maskHidden: true
            });
        }, 1000)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var id = options.shopid;
        var status = options.status;
        var code = wx.getStorageSync('user');
        var token = comment.encryption();
        that.setData({
            status,
        })
        wx.request({
            url: link + '/api.php?s=/booking/bookingDetail',
            data: {
                token,
                param: {
                    code,
                    id,
                }
            },
            method: 'POST',
            dataType: 'json',
            success: function(res) {
                if (res.statusCode == 200) {
                    var data = res.data.data.result;
                    that.setData({
                        shopId: id,
                        shopName: data.shop_name,
                        usernumber: data.number,
                        name: data.name,
                        mobile: data.mobile,
                        time: data.time,
                        note: data.note,
                        private_room: parseInt(data.private_room),
                        cancel: data.cancel,
                        share_title: data.share_title,
                        share_image: data.share_image,
                        int_uid: data.int_uid,
                        id: data.int_adver_id,
                    })
                }
            },
            fail: function(res) {},
        })
    },
    //取消原因
    radioChange: function(e) {
        var that = this;
        that.setData({
            cancelNote: e.detail.value
        })
    },
    //取消订单 弹框出现
    cancelOrder: function() {
        var that = this;
        that.setData({
            cancelOrder: false
        })
    },
    //取消订单 弹框隐藏
    think: function() {
        var that = this;
        that.setData({
            cancelOrder: true
        })
    },
    confirmCancel: function() {
        var that = this;
        if (that.data.cancelNote == "") {
            wx.showToast({
                title: '请选择取消原因',
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        wx.request({
            url: link + '/api.php?s=/booking/bookingCancel',
            data: {
                token,
                param: {
                    code,
                    id: that.data.shopId,
                    cancelMsg: that.data.cancelNote,
                }
            },
            method: 'POST',
            dataType: 'json',
            success: function(res) {
                if (res.statusCode == 200) {
                    wx.showToast({
                        title: '取消成功',
                        icon: 'success',
                        duration: 2000,
                        success: function() {
                            wx.navigateTo({
                                url: '../order_detail/order_detail?shopid=' + that.data.shopId + '&status=1'
                            })
                        }
                    })
                }
            },
            fail: function(res) {},
        })
    },
    //删除订单
    delete_order: function() {
        var that = this;
        wx.request({
            url: link + '/api.php?s=/booking/bookingDelete',
            data: {
                token,
                param: {
                    code,
                    id: that.data.shopId,
                }
            },
            method: 'POST',
            dataType: 'json',
            success: function(res) {
                if (res.statusCode == 200) {
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 2000,
                        success: function() {
                            wx.navigateTo({
                                url: '../mybooking/mybooking',
                            })
                        }
                    })
                }
            },
            fail: function(res) {},
        })
    },
    //预定其它餐厅
    other: function() {
        wx.navigateTo({
            url: '../partnerRestaurant/partnerRestaurant',
        })
    },
    onShareAppMessage: function(res) {
        var that = this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: that.data.share_title,
            imageUrl: that.data.share_image,
            path: '/pages/share/share?book_id=' + that.data.shopId + '&int_uid=' + that.data.int_uid
        }
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var that = this;
        wx.getUserInfo({
            success: function (res) {
                wx.downloadFile({
                    url: res.userInfo.avatarUrl,
                    success: function (res) {
                        that.setData({
                            touxiang: res.tempFilePath
                        })
                    }, fail: function (fres) {

                    }
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },


})