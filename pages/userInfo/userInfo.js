// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nick:'',
      imgUrl:'',
      sex:'',
      openid:'',
      status:'已认证'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if(wx.getStorageSync('openid')){
     var sex = wx.getStorageSync('sex')
      that.setData({
        "nick":wx.getStorageSync('nick'),
        "imgUrl":wx.getStorageSync('imgUrl'),
        "sex":sex,
        "openid":wx.getStorageSync('openid')
      })
      if(sex=="man"){
        that.setData({
          "userLogo":'./../images/man.png'
        })
       
      }else{
        that.setData({
          "userLogo":'./../images/women.png'
        })
      }
    }else{
     that.setData({
      "imgUrl":"./../images/nologin.png",
      "status":'未登录',
      "nick":'游客',
      "userLogo":'./../images/youke.png'
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
  clearSto:function(){
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.removeStorageSync('nick')
          wx.removeStorageSync('imgUrl')
          wx.removeStorageSync('sex')
          wx.removeStorageSync('openid')
          wx.removeStorageSync('session_key')
          wx.reLaunch({
            url: '/pages/index/index',//跳去首页
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
    
  },
  toLogin:function(){
    wx.redirectTo({
      url: '/pages/userLogin/userLogin',//跳去登录页
    })
  }

})