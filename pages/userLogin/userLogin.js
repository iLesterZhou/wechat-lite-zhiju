// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    //  wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
    canIUseOpenData:false
  },
  // 事件处理函数
  bindViewTap() {
    let that = this
    wx.login({
      success (res) {
        if (res.code) {
          wx.request({
            url: 'https://www.ilesterzhou.top/phpApi/login/getopenid.php',
            data: {
              code: res.code,
              nick:that.data.userInfo.nickName,
              avaUrl:that.data.userInfo.avatarUrl,
              gender:that.data.userInfo.gender
            },
            header: {
              'content-type': 'application/json'
            },
            success:function(res){
              // console.log(res.data)
              wx.setStorageSync('nick', res.data.nick)
              wx.setStorageSync('openid',res.data.openid)
              wx.setStorageSync('session_key',res.data.session_key)
              wx.setStorageSync('imgUrl',res.data.imgUrl)
              wx.setStorageSync('sex',res.data.sex)
          
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onLoad() {
    // console.log(this.data.userInfo)
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
     
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log("test") 
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    // console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: false
    })
  },
  onUnload: function() {
    console.log("on unload");
  },
})
