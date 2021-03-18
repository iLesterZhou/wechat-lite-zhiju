import * as echarts from '../../ec-canvas/echarts';

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
      lastUpdate:0
    }
  },

  onLoad: function (options) {
    //获取组件
    this.lazyComponent = this.selectComponent("#lazy-mychart-dom");
    var that = this;
    wx.request({
      url: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total', 
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data.data)
        that.setData({
          "value.appconfirm": res.data.data.chinaTotal.total.confirm,
          "value.dead": res.data.data.chinaTotal.total.dead,
          "value.heal": res.data.data.chinaTotal.total.heal,
          "value.input": res.data.data.chinaTotal.total.input,
          "value.noSymptom": res.data.data.chinaTotal.extData.noSymptom,
          "value.lastUpdate":res.data.data.overseaLastUpdateTime
        })
        that.init(res.data.data)
      }
    })
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
      this.chart = chart 
      return chart
    })
  },
})
function getOption(data){
  return {
    
  tooltip: {
      trigger: 'axis'
  },
 
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['03-01', '03-01', '03-01', '03-01', '03-01', '03-01', '03-01']
  },
  yAxis: {
      type: 'value'
  },
  series: [
      {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [data, 32, 10, 34, 9, 23, 21]
      },
      {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [22, 18, 19, 23, 29, 33, 31]
      },
      {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [15, 23, 20, 15, 19, 33, 41]
      }
  ]
}
}