
Page({
  data: {
    lazyEc:{
      lazyLoad:true
    },
    value:{
      dead: 0,
      heal: 0,
      input:0,
      noSymptom:0,
      appconfirm:0,
      lastUpdate:0,
      weBo:[]
    }
  },

  onLoad: function () {
    //获取组件
    var that = this;
    wx.request({
      url: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total', 
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        // console.log(res.data.data)
        that.setData({
          "value.appconfirm": res.data.data.chinaTotal.total.confirm,
          "value.dead": res.data.data.chinaTotal.total.dead,
          "value.heal": res.data.data.chinaTotal.total.heal,
          "value.input": res.data.data.chinaTotal.total.input,
          "value.noSymptom": res.data.data.chinaTotal.extData.noSymptom,
          "value.lastUpdate":res.data.data.overseaLastUpdateTime
        })
       
      }

    })
    that.getWebo()
  },
  getWebo:function(){
    let that = this
    wx.request({
      url: 'https://res.abeim.cn/api-weibo_news', 
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        // console.log(res.data)
        that.setData({
         "value.weBo":res.data.data
        })
        
      }

    })
  },
  onPullDownRefresh: function () {
      this.getWebo();
      // 数据请求成功后，关闭刷新
      wx.stopPullDownRefresh({
        success (res) {
            // console.log('刷新成功');
            wx.showToast({
              title: '刷新成功',
              icon: 'none',
              duration: 1000,
              })
        
        }
      });
  },
})

