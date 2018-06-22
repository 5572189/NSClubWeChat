var comment = require('../../utils/comment.js');
var token = comment.encryption();
const app = getApp(); 
var link = app.globalData.link;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",
    phone:"",
    editing:false,    
    cancle:true,
    user_id:'',
    user_name:'',
    user_sex:'',
    items:[
      { title:'男',value: '1', checked:true},
      { title:'女',value: '2', checked:false},
    ],
    gender:'1',
    user_birthday:'',
    user_mailbox:'',
    disabled:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
      },
    })
    var value = wx.getStorageSync('user');
    if (value) {
      wx.request({
        url: link+'/api.php?s=/user/getUserInfo',
        data: {
          token: token,
          param: {
            code: value
          }
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          console.log(res)
          if (res.data.data.code == 200){
            var userInfo = res.data.data.result.userInfo;
            that.setData({
              phone:userInfo.mobile,
              user_name: userInfo.nickname,
              user_mailbox:userInfo.email,
              user_id: userInfo.id
            })
            if(userInfo.birthday == null){
              that.setData({
                user_birthday: "",
                disabled:false
              })
              wx.showModal({
                content: '您可以点击上方的编辑来修改信息',
                showCancel:false ,
                success: function (res) {
                  if (res.confirm) {
                    console.log('确定')
                  }
                }
              })
            }else{
              that.setData({
                user_birthday: userInfo.birthday ,
                disabled: true
              })
            }
            if(userInfo.gender == 0){
              that.setData({
                user_sex: "",
              })
            } else if (userInfo.gender == 1){
              that.setData({
                user_sex: "男",
              })
            }else{
              that.setData({
                user_sex: "女",
              })
            }
            console.log(userInfo)
          }
        },
        fail: function (res) { },
      })
    }
    
  },

  btnSave:function(){
    var that = this;
    var value = wx.getStorageSync('user');
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (that.data.user_name == ""){
      wx.showToast({
        title: '请填写您的姓名',
        icon:'none',
        duration: 2000
      });
      return false;
    }
    if (that.data.user_birthday == ""){
      wx.showToast({
        title: '请填写您的生日',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    if (that.data.user_mailbox == "") {
      wx.showToast({
        title: '邮箱地址不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    if (!reg.test(that.data.user_mailbox)){
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    wx.request({
      url: link+'/api.php?s=/user/editUserInfo',
      data: {
        token: token,
        param: {
          code: value,
          id: that.data.user_id,
          surname:"penn",
          nickname:that.data.user_name,
          gender: that.data.gender,
          birthday: that.data.user_birthday,
          email: that.data.user_mailbox,
        }
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        console.log(res)
        if(res.data.data.code == 200){
          wx.showToast({
            title: res.data.data.msg,
            icon: 'none',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.reLaunch({
                  url: '../me/me'
                })
              }, 2000)

            }
          });
        }else{
          wx.showToast({
            title: '请返回登录',
            icon: 'none',
            duration: 2000,
            success:function(){
              setTimeout(function(){
                wx.reLaunch({
                  url: '../me/me'
                })
              },2000)
              
            }
          });
          
        }
      },
      fail: function(res) {},
    })

  },
  userExit:function(){
    wx.clearStorageSync();
    wx.showToast({
      title:'退出成功',
      icon: 'none',
      duration: 2000,
      success: function () {
        setTimeout(function () {
          wx.reLaunch({
            url: '../me/me'
          })
        }, 2000)

      }
    });
  },
  editing:function(){
    var  that = this;
    that.setData({
      editing: true,
      cancle: false,
    })
  },
  cancle:function(){
    var that = this;
    that.setData({
      editing: false,
      cancle: true,
    })
  },
  radioChange: function (e) {
    var that = this;
    that.setData({
      gender: e.detail.value
    })
  },
  bindChangeName: function (e) {
    var that = this;
    that.setData({
      user_name: e.detail.value
    })
  },
  bindChangeBirthday: function (e) {
    var that = this;
    that.setData({
      user_birthday: e.detail.value
    })
  },
  bindChangeMailbox: function (e) {
    var that = this;
    that.setData({
      user_mailbox: e.detail.value
    })
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