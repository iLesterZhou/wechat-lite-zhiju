const app = getApp();
Page({
  data: {
    array: [{
      mode: 'aspectFit',
      text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
    }],
    src: ''
  },
  
  formSubmit: function (e) {
    // console.log(e);
    var oldpwd = e.detail.value.oldpwd;
    var newpwd = e.detail.value.newpwd;
    if (oldpwd == '' || newpwd == '') {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else {
      var url='';
      wx.showLoading({
        title: '正在登录中......',
      })
      wx.request({
         url:"https://www.ilesterzhou.top/phpApi/login/login.php",
        //url:"http://localhost/login/login.php",
        method:'POST',
        data: {
          username: oldpwd,
          pwd: newpwd
        },
        header: {
          //'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        success: (res) => {
          // console.log(res);
          // wx.setStorageSync('PHPSESSID', wxSession);
          if (res.data=='fail') {
            // 显示消息提示框
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: res.data,
              icon: 'success',
              duration: 2000,
              success: function () {
               getApp().globalData.typeShow = res.data ;
                // console.log(getApp().globalData.typeShow);
               
                setTimeout(function () {
                  
                  wx.switchTab({
                    url: '../index/index',
                  })
                }, 1000)
                // page.onLoad();  
              }
            })
          }
        }
      })
    }
  },
  toenroll: function (e) {
    // console.log(e);
    wx.navigateTo({
      url: "",
    })
  }
})  