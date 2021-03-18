import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
Page({
  data: {
    lazyEc:{
      lazyLoad:true
    },
    type:'outcome',
    chartOptionData:{
      income:[],
      outcome:[],
      turang:[],
      air:[],
      shui:[],
      light:[]
    }
  },

  onLoad: function (options) {
    let type = options.type;
    // console.log(type) 
    this.changeType1(type);
    //获取组件
    this.lazyComponent = this.selectComponent("#lazy-mychart-dom");
    
    var that = this;
    // wx.request({
    //   url: 'https://www.ilesterzhou.top/phpApi/echarts.php', 
    //   method:'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     that.setData({
    //       chartOptionData:{
    //         income:res.data.income,
    //         outcome:res.data.outcome,
    //         turang:res.data.turang,
    //         air:res.data.air,
    //         shui:res.data.shui
    //       }
    //     })
    //     that.init(res.data.outcome)
    //   }
    // })
    that.setData({
      chartOptionData:{
        income:getApp().globalData.shidu,
        outcome:getApp().globalData.wendu,
        turang:getApp().globalData.turang,
        air:getApp().globalData.kongqi,
        shui:getApp().globalData.shuiwei,
        light:getApp().globalData.light
      }
    })
    that.init(getApp().globalData.wendu)
  },
  init(optionData){
    //手动初始化
    this.lazyComponent.init((canvas,width,height,dpr)=>{
      let chart = echarts.init(canvas,null,{
        width:width,
        height:height,
        devicePixelRatio:dpr
      })
    
      let option = getOption(optionData)
      chart.setOption(option)
      this.chart = chart //将图表实例绑定到this方便在其他函数访问
      return chart
    })
  },
  changeType(e){ //切换效果
    this.setData({
      type:e.currentTarget.dataset.type
    })
    let option = getOption(this.data.chartOptionData[e.currentTarget.dataset.type])
    this.chart.setOption(option)
  },
  changeType1(type){
    this.setData({
      type:type
    })
  }
})
function getOption(data){
  return {

    tooltip: {
      trigger: 'axis',
      confine:true//将此限制打开后tooltip将不再溢出
    },
    xAxis: {
        type: 'category',
       
        data:(function (){
          var now = new Date();
          var res = [];
          var len = 10;
          while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
              now = new Date(now - 2000);
          }
          return res;
      })()
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: data,
        type: 'line',
        smooth: true
    }]
}
}