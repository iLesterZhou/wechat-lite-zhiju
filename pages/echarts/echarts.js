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
      shui:[]
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
        shui:getApp().globalData.shuiwei
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
    },
    dataZoom: [
      {
          type: 'slider',    //支持鼠标滚轮缩放
          start: 0,            //默认数据初始缩放范围为10%到90%
          end: 100
      },
      {
          type: 'inside',    //支持单独的滑动条缩放
          start: 0,            //默认数据初始缩放范围为10%到90%
          end: 100
      }
 ],
    xAxis: {
        type: 'category',
        // data: ['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00','15:00','17:00','19:00','21:00','23:00']
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