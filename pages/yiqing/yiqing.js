import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    lazyEc:{
      lazyLoad:true
    },
    chartOptionData:{
      appconfirm:[],
      dead:[],
      heal:[],
      input:[],
      noSymptom:[]
    }
  },

  onLoad: function (options) {
    //获取组件
    this.lazyComponent = this.selectComponent("#lazy-mychart-dom");
    
    var that = this;
    wx.request({
      url: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total', 
      // method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        // console.log(res)
        that.setData({
          chartOptionData:{
          appconfirm: res.data.data.chinaTotal.total.confirm,
          dead: res.data.data.chinaTotal.total.dead,
          heal: res.data.data.chinaTotal.total.heal,
          input: res.data.data.chinaTotal.total.input,
          noSymptom: res.data.data.chinaTotal.extData.noSymptom
          }
        })
        that.init(res.data.data)
      }
    })
  },
  init(optionData){
    //console.log(optionData);
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
})
function getOption(data){
  console.log(data.chinaTotal.total.heal);
  return {
    // legend: {
    //     top: 'bottom'
    // },
    tooltip: {
      trigger: 'item',
      confine:true//将此限制打开后tooltip将不再溢出
    },
    series: [
        {
            name: '面积模式',
            type: 'pie',
            radius: '60%',
            
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius:6
            },
            data: [
                {value: data.chinaTotal.total.confirm, name: '累计确诊'},
                {value: data.chinaTotal.extData.noSymptom, name: '无症状者'},
                {value: data.chinaTotal.total.input, name: '境外输入'},
                {value: data.chinaTotal.total.dead, name: '累计死亡'},
                {value: data.chinaTotal.total.heal, name: '累计治愈'},
                {value: data.chinaTotal.total.confirm-data.chinaTotal.total.dead-data.chinaTotal.total.heal, name: '现有确诊'},
                
            ]
        }
    ]
}
}