
//index.js
// import mqtt from './../../utils/mqtt.js';

//获取应用实例
const app = getApp();
Page({
  data: {
    show:'fail',
    client: null,
    topic: {
      LEDcontrolTopic: 'led',
      HumdTopic: 'humd',
      TempTopic: 'temp',
      WaterTopic:'shui',
      AirTopic:'air',
      PlantTopic:'plant',
      Plant1Topic:'shuibang',
      LightTopic:'light',
      DevTopic:"LastWill",
      Dev2Topic:"HomeWill",
      Dev3Topic:"PlantWill"
    },
    value: {
      Humdlogo: './../images/humd1.png',
      HumdValue: 0,
      Templogo: './../images/temp1.png',
      TempValue: 0,
      Waterlogo: './../images/water1.png',
      WaterValue:0,
      Airlogo: './../images/air.png',
      AirValue: '0',
      Weatherlogo:'./../images/weather.png',
      appconfirm: 0,
      Plantlogo:'./../images/zhiwu.png',
      PlantValue:0,
      LightLogo:'./../images/light.png',
      LightValue:0,
      DevValue:'',
      Dev2Value:'',
      Dev3Value:'',
      dead: 0,
      heal: 0,
      input:0,
      noSymptom:0,
    },
    LEDValue: [{
      LEDlogo: './../images/LED_gray.png',
      ButtonValue: '开灯',
      ButtonFlag: true,
    }],
    LED2Value: [{
      LEDlogo: './../images/LED2_gray.png',
      ButtonValue: '开灯',
      ButtonFlag: true,
    }],
    LED3Value: [{
      LEDlogo: './../images/LED3_gray.png',
      ButtonValue: '开灯',
      ButtonFlag: true,
    }],
    LED4Value: [{
      LEDlogo: './../images/LED4_gray.png',
      ButtonValue: '开灯',
      ButtonFlag: true,
    }],
    LED5Value: [{
      LEDlogo: './../images/LED5_gray.png',
      ButtonValue: '开扇',
      ButtonFlag: true,
    }],
    PlantValue: [{
      Plantlogo: './../images/shuibeng.png',
      ButtonValue: '浇花',
      ButtonFlag: true,
    }],
    WeatherValue:[{
      // Weatherlogo:'./../images/weather.png',
    }],
    count:[{

    }]
  },

  onLoad: function(options) {
   
    //加载天气
    this.weatherShow();
    // //加载疫情信息
    this.yiqingData();
    // //加载mqtt
    this.mqttClient();
  },
  mqttClient: function(){
    var that = this;
    this.data.client = app.globalData.client;
    that.data.client.on('connect', that.ConnectCallback);
    that.data.client.on("message", that.MessageProcess);
    that.data.client.on("error", that.ConnectError);
    that.data.client.on("reconnect", that.ClientReconnect);
    that.data.client.on("offline", that.ClientOffline);
    //console.log(app.globalData.client_ID);
  },

  onShow: function() {
    let type = getApp().globalData.typeShow;
    // console.log(type);
    this.setData({
      show:type
    })
    // console.log(this.data.show);
  },

  onHide: function() {
    console.log("on hide");
    
  },

  onUnload: function() {
    console.log("on unload");
    var that = this;
    that.data.client.end();
  },
  weatherShow: function() {
    var that = this;
    wx.request({
      url: 'https://api.seniverse.com/v3/weather/now.json?key=SbBuQCRyj7OY1Pr1h&location=zhengzhou&language=zh-Hans&unit=c',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data.results[0]);
        that.setData({
           WeatherValue:res.data.results[0],
        });
        if(res.data.results[0].now.text=='阴'){
          //console.log('阴');
          that.setData({
          "value.Weatherlogo": './../images/yin.png'
          })
        }else if(res.data.results[0].now.text=='多云'){
          that.setData({
            "value.Weatherlogo": './../images/weather.png'
          })
        }else if(res.data.results[0].now.text=='晴'){
          that.setData({
            "value.Weatherlogo": './../images/qin.png'
          })
        }else if(res.data.results[0].now.text=='雨夹雪'){
          that.setData({
            "value.Weatherlogo": './../images/xue.png'
          })
        }else if(res.data.results[0].now.text=='小雨'){
          that.setData({
            "value.Weatherlogo": './../images/yu.png'
          })
        }else{
          that.setData({
            "value.Weatherlogo": './../images/weather.png'
          })
        }
        //console.log("end")
      },
    })
  },
  yiqingData: function() {
    var that = this;
    wx.request({
      url: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
      //  console.log(res.data.data.chinaTotal.total.confirm - );
        that.setData({
          "value.appconfirm": res.data.data.chinaTotal.total.confirm,
          "value.dead": res.data.data.chinaTotal.total.dead,
          "value.heal": res.data.data.chinaTotal.total.heal,
          "value.input": res.data.data.chinaTotal.total.input,
          "value.noSymptom": res.data.data.chinaTotal.extData.noSymptom,
         
        })
      }
    })
  },

  LedControl: function(e) {
    var that = this;
    //console.log(that.data);
    if (that.data.LEDValue[0].ButtonFlag) {
        that.setData({
          'LEDValue[0].ButtonValue': '关灯',
          'LEDValue[0].ButtonFlag': false,
          "LEDValue[0].LEDlogo": './../images/LED_red.png',
        })
      that.data.client.publish(that.data.topic.LEDcontrolTopic, "1",{
        qos: 1
      });
    } else {
          that.setData({
            'LEDValue[0].ButtonValue': '开灯',
            'LEDValue[0].ButtonFlag': true,
            "LEDValue[0].LEDlogo": './../images/LED_gray.png',
          })
      that.data.client.publish(that.data.topic.LEDcontrolTopic, "5",{
        qos: 1
      });
    }
  },
  LedControl2: function(e) {
    var that = this;
    if (that.data.LED2Value[0].ButtonFlag) {
        that.setData({
          'LED2Value[0].ButtonValue': '关灯',
          'LED2Value[0].ButtonFlag': false,
          "LED2Value[0].LEDlogo": './../images/LED2_green.png',
        })
      that.data.client.publish(that.data.topic.LEDcontrolTopic, "2",{
        qos: 1
      });
    } else {
          that.setData({
            'LED2Value[0].ButtonValue': '开灯',
            'LED2Value[0].ButtonFlag': true,
            "LED2Value[0].LEDlogo": './../images/LED2_gray.png',
          })
      that.data.client.publish(that.data.topic.LEDcontrolTopic, "6",{
        qos: 1
      });
    }
  },
  LedControl3: function(e) {
    var that = this;
    if (that.data.LED3Value[0].ButtonFlag) {
        that.setData({
          'LED3Value[0].ButtonValue': '关灯',
          'LED3Value[0].ButtonFlag': false,
          "LED3Value[0].LEDlogo": './../images/LED3_green.png',
        })
      that.data.client.publish(that.data.topic.LEDcontrolTopic, "3",{
        qos: 1
      });
    } else {
          that.setData({
            'LED3Value[0].ButtonValue': '开灯',
            'LED3Value[0].ButtonFlag': true,
            "LED3Value[0].LEDlogo": './../images/LED3_gray.png',
          })
      that.data.client.publish(that.data.topic.LEDcontrolTopic, "7",{
        qos: 1
      });
    }
  },
  LedControl4: function(e) {
    var that = this;
    if (that.data.LED4Value[0].ButtonFlag) {
        that.setData({
          'LED4Value[0].ButtonValue': '关灯',
          'LED4Value[0].ButtonFlag': false,
          "LED4Value[0].LEDlogo": './../images/LED4_green.png',
        })
      that.data.client.publish(that.data.topic.LEDcontrolTopic, "4",{
        qos: 1
      });
    } else {
          that.setData({
            'LED4Value[0].ButtonValue': '开灯',
            'LED4Value[0].ButtonFlag': true,
            "LED4Value[0].LEDlogo": './../images/LED4_gray.png',
          })
      that.data.client.publish(that.data.topic.LEDcontrolTopic, "8",{
        qos: 1
      });
    }
  },
  LedControl5: function(e) {
    var that = this;
    if (that.data.LED5Value[0].ButtonFlag) {
        that.setData({
          'LED5Value[0].ButtonValue': '关扇',
          'LED5Value[0].ButtonFlag': false,
          "LED5Value[0].LEDlogo": './../images/LED5_green.png',
        })
      that.data.client.publish(that.data.topic.LEDcontrolTopic, "0",{
        qos: 1
      });
    } else {
          that.setData({
            'LED5Value[0].ButtonValue': '开扇',
            'LED5Value[0].ButtonFlag': true,
            "LED5Value[0].LEDlogo": './../images/LED5_gray.png',
          })
      that.data.client.publish(that.data.topic.LEDcontrolTopic, "9",{
        qos: 1
      });
    }
  },
 PlantControl: function(e) {
    var that = this;
    if (that.data.PlantValue[0].ButtonFlag) {
        that.setData({
          'PlantValue[0].ButtonValue': '关闭',
          'PlantValue[0].ButtonFlag': false,
          "PlantValue[0].Plantlogo": './../images/shuibeng1.png',
        })
      that.data.client.publish(that.data.topic.Plant1Topic, "2",{
        qos: 1
      });
    } else {
          that.setData({
            'PlantValue[0].ButtonValue': '浇花',
            'PlantValue[0].ButtonFlag': true,
            "PlantValue[0].Plantlogo": './../images/shuibeng.png',
          })
      that.data.client.publish(that.data.topic.Plant1Topic, "1",{
        qos: 1
      });
    }
  },
  
  MessageProcess: function(topic, payload) {
    var that = this;
    // var arr = [];
    var payload_string = payload.toString();
      if (topic == that.data.topic.HumdTopic) {
       
        that.setData({
          'value.HumdValue': payload_string
        })
        app.globalData.shidu.push(payload_string)
        // console.log(app.globalData.wendu)
      }
      if (topic == that.data.topic.TempTopic) {
        that.setData({
          'value.TempValue': payload_string
        })
        app.globalData.wendu.push(payload_string)
      }
      if (topic == that.data.topic.PlantTopic) {
        
        if(this.data.value.Dev3Value==''){
          if(payload_string>900){
            // console.log(payload_string);
            wx.showToast({
              title: '土壤干燥',
              icon: 'success',
              image: '../images/danger.png',
              duration: 1500,
            }),
            that.setData({
              'value.PlantValue':"干燥"
            })
          }else{
            that.setData({
              'value.PlantValue':"湿润"
            })
          }
        }
        app.globalData.turang.push(payload_string)
      }
      if (topic == that.data.topic.WaterTopic) {
        if(this.data.value.DevValue==''){
          if(payload_string<=0){ 
            wx.showToast({
              title: '水位低',
              icon: 'success',
              image: '../images/danger.png',
              duration: 1500,
            }),
            that.setData({
              'value.WaterValue': "缺水"
            })
          }else{
            that.setData({
              'value.WaterValue': "充足"
            })
          }
      } 
        app.globalData.shuiwei.push(payload_string)
      }
      if (topic == that.data.topic.AirTopic) {
        // 设备在线的时候
          if(this.data.value.DevValue==''){
            if(payload_string>700){
              // console.log(payload_string);
              wx.showToast({
                title: '有害气体!',
                icon: 'success',
                image: '../images/danger.png',
                duration: 1500,
              })
              ,
              that.setData({
                'value.AirValue': "有害",
              })
            }
           }
            that.setData({
              'value.AirValue': "正常",
            })
         
        app.globalData.kongqi.push(payload_string)

      }
      if (topic == that.data.topic.LightTopic) {
        if(payload_string<=180){
          // console.log(payload_string);
          that.setData({
            'value.LightValue':"弱"
          })
        }else{
          that.setData({
            'value.LightValue':"强",
          })
        }
      app.globalData.light.push(payload_string)

      }
      if (topic == that.data.topic.DevTopic) {
        // console.log(payload_string)
        if(payload_string=="OFFLINE"){
          that.setData({
            'value.DevValue':"设备离线",
          })
        }else{
          that.setData({
            'value.DevValue':"",
          })
        }
      }
      if (topic == that.data.topic.Dev2Topic) {
        // console.log(payload_string)
        if(payload_string=="OFFLINE"){
          that.setData({
            'value.Dev2Value':"设备离线",
          })
        }else{
          that.setData({
            'value.Dev2Value':"",
          })
        }
      }
      if (topic == that.data.topic.Dev3Topic) {
        // console.log(payload_string)
        if(payload_string=="OFFLINE"){
          that.setData({
            'value.Dev3Value':"设备离线",
          })
        }else{
          that.setData({
            'value.Dev3Value':"",
          })
        }
      }

  },

  ConnectCallback: function(connack) {
    var that = this;
    // console.log("connect callback ");
    for (var v in that.data.topic) {
      that.data.client.subscribe(that.data.topic[v], {
        qos: 1
      });
    }
  },

  ConnectError: function(error) {
    console.log(error)
  },

  ClientReconnect: function() {
    console.log("Client Reconnect")
  },

  ClientOffline: function() {
    console.log("Client Offline")
  },
  //下拉刷新
  onPullDownRefresh: function () {
    // wx.showNavigationBarLoading() 
    //var that = this;
    this.weatherShow();
    this.yiqingData();
    // this.onLoad();
    // this.mqttClient();
  // 数据请求成功后，关闭刷新
  wx.stopPullDownRefresh({
    success (res) {
        // console.log('刷新成功');
    }
  });
  },
})