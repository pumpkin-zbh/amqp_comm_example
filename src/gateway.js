/**
"dependencies": { "mqtt": "2.18.8" }
*/
const crypto = require('crypto');
const mqtt = require('mqtt');
const { ALIYUN } = require("./config/constant.js");
//设备身份三元组+区域
const deviceConfig = {
    productKey: ALIYUN.PRODUCT_KEY,
    deviceName: ALIYUN.DEVICE_NAME,
    deviceSecret: ALIYUN.DEVICE_SECRET,
    regionId: "cn-shanghai"
};
//根据三元组生成mqtt连接参数
const options = initMqttOptions(deviceConfig);
const url = `tcp://${deviceConfig.productKey}.iot-as-mqtt.${deviceConfig.regionId}.aliyuncs.com:1883`;

//2.建立连接
const client = mqtt.connect(url, options);

//3.属性数据上报
const topic = `/${deviceConfig.productKey}/${deviceConfig.deviceName}/user/update`;
setInterval(function() {
    //发布数据到topic
    client.publish(topic, reportScanData());
}, 5 * 1000);

//4.订阅主题,接收指令
const subTopic = `/${deviceConfig.productKey}/${deviceConfig.deviceName}/user/get`;
client.subscribe(subTopic)
client.on('message', function(topic, message) {
    console.log("topic " + topic)
    console.log("message " + message)
})

//IoT平台mqtt连接参数初始化
function initMqttOptions(deviceConfig) {

    const params = {
        productKey: deviceConfig.productKey,
        deviceName: deviceConfig.deviceName,
        timestamp: Date.now(),
        clientId: Math.random().toString(36).substr(2),
    }
    //CONNECT参数
    const options = {
        keepalive: 60, //60s
        clean: false, //cleanSession保持持久会话
        protocolVersion: 4 //MQTT v3.1.1
    }
    //1.生成clientId，username，password
    options.password = signHmacSha1(params, deviceConfig.deviceSecret);
    options.clientId = `${params.clientId}|securemode=3,signmethod=hmacsha1,timestamp=${params.timestamp}|`;
    options.username = `${params.deviceName}&${params.productKey}`;

    return options;
}

// 网关上传周围的跳绳清单和状态、配置信息
function reportScanData() {
    const payloadJson = {
        type: 'REPORT',
        subType: 'SCAN',
        data: {
            gateway: {
                state: 'PREPARING' // 或 ABOUT_TO_START
            },
            devices: {
                '1C9DC2585C04': {
                    groupId: 2453,
                    state: 'STANDBY', // 或 READY_TO_GO
                    lastSeen: 1653994875
                },
                '1C9DC2585BB0': {
                    groupId: 2453,
                    state: 'STANDBY', // 或 READY_TO_GO
                    lastSeen: 1653994875
               }
            }
        }
    }
    console.log("===Report Scan Data\n topic=" + topic)
    console.log(payloadJson)
    return JSON.stringify(payloadJson);
}


/*
  生成基于HmacSha1的password
  参考文档：https://help.aliyun.com/document_detail/73742.html?#h2-url-1
*/
function signHmacSha1(params, deviceSecret) {

    let keys = Object.keys(params).sort();
    // 按字典序排序
    keys = keys.sort();
    const list = [];
    keys.map((key) => {
        list.push(`${key}${params[key]}`);
    });
    const contentStr = list.join('');
    return crypto.createHmac('sha1', deviceSecret).update(contentStr).digest('hex');
}
