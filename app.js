
import mqtt from './utils/mqtt.js';

const host = 'wxs://www.ilesterzhou.top/mqtt';
const options = {
  protocolVersion: 4, //MQTT连接协议版本
  clientId: randomString(10),
  clean: true,
  username: '',
  password: '',
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  resubscribe: true
};

App({
  onLaunch: function() {
    
  },
  
  globalData: {
    client_ID: randomString(10),
    client: mqtt.connect(host, options),
    wendu:[],
    shidu:[],
    turang:[],
    kongqi:[],
    shuiwei:[],
    light:[]
  },
  randomString: function(len){
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
  
})

function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
