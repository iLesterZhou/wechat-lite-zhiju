
//index.js
// import mqtt from './../../utils/mqtt.js';

//获取应用实例
const app = getApp();
Page({
  data: {
    nick:'',
    imgUrl:'',
    sex:'',
    openid:'',
    status:'已认证',
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
      Dev1Logo:'',
      Dev2Logo:'',
      Dev3Logo:'',
      WellKnown:''
    },
    user:{
      nick:'',
      imgUrl:'',
      sex:'',
      userLogo:'sss'
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
  //  console.log("onLoad")

    this.weatherShow();
    // //加载mqtt
    this.mqttClient();
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
  mqttClient: function(){
    var that = this;
    this.data.client = app.globalData.client;
    that.data.client.on('connect', that.ConnectCallback);
    that.data.client.on("message", that.MessageProcess);
    that.data.client.on("error", that.ConnectError);
    that.data.client.on("reconnect", that.ClientReconnect);
    that.data.client.on("offline", that.ClientOffline);
    
  },

  onShow: function() {
  //  console.log("on show")
  },

  onHide: function() {
    console.log("on hide");
    
  },

  onUnload: function() {
    // console.log("on unload");
    var that = this;
    that.data.client.end();
  },
  onReady:function(){
    // console.log("onready")
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
    var payload_string = payload.toString();
      if (topic == that.data.topic.HumdTopic) {
       
        that.setData({
          'value.HumdValue': payload_string
        })
        app.globalData.shidu.push(payload_string)

      }
      if (topic == that.data.topic.TempTopic) {
        that.setData({
          'value.TempValue': payload_string
        })
        app.globalData.wendu.push(payload_string)
      }
      if (topic == that.data.topic.PlantTopic) {
        
        // console.log(payload_string);
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
        app.globalData.turang.push(payload_string)
      }
      if (topic == that.data.topic.WaterTopic) {
      
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
     
        app.globalData.shuiwei.push(payload_string)
      }
      if (topic == that.data.topic.AirTopic) {
        // 设备在线的时候
          
            if(payload_string>800){
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
            }else{
              that.setData({
                'value.AirValue': "正常",
              })
            }
           
           
         
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
        if(payload_string=="OFFLINE"){
          that.setData({
            'value.Dev1Logo':"./../images/off1.png",
            
          })
        }else{
          that.setData({
            'value.Dev1Logo':"./../images/on.png",
            
          })
        }
      }
      if (topic == that.data.topic.Dev2Topic) {
        if(payload_string=="OFFLINE"){
          that.setData({
            'value.Dev2Logo':"./../images/off1.png",
            
          })
        }else{
          that.setData({
            'value.Dev2Logo':"./../images/on.png",
            
          })
        }
      }
      if (topic == that.data.topic.Dev3Topic) {
 
        if(payload_string=="OFFLINE"){
          that.setData({
            'value.Dev3Logo':"./../images/off1.png",
            
          })
        }else{
          that.setData({
            'value.Dev3Logo':"./../images/on.png",
            
          })
        }
      }

  },

  ConnectCallback: function(connack) {
    var that = this;

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


    this.weatherShow();
    
 
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
  // 上拉加载
  onReachBottom:function(){
    this.getWellKnown()
  },
  getWellKnown:function(){
    let that = this
    wx.request({
      url: 'https://res.abeim.cn/api-text_yiyan', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        that.setData({
          "value.WellKnown":res.data.content
        })
        
      }
    })
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
    wx.reLaunch({
      url: '/pages/userLogin/userLogin',//跳去登录页
    })
  }
  
})