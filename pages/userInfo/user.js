// pages/userInfo/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lazyEc:{
      lazyLoad:true
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getTouTiao()
  },
  getTouTiao:function(){
    let that=this
    wx.request({
      url: 'https://api.bilibili.com/x/relation/stat?vmid=237099907&jsonp=jsonp', 
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data)
        that.setData({
         
        })
       
      }

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
    // 数据请求成功后，关闭刷新
    wx.stopPullDownRefresh({
      success (res) {
          // console.log('刷新成功');
      }
    });
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