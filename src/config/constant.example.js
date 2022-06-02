const CONSTANT = {
  PORT: 5671,
  TRANSPORT: "tls",
  RECONNECT: true,
  IDLE_TIME_OUT: 60000,
  ALIYUN: {
    PRODUCT_KEY: "a1***",
    DEVICE_NAME: "MC***",
    DEVICE_SECRET: "***",
    HOST: "***.iot-amqp.cn-shanghai.aliyuncs.com",  // 实例详情 >>> 开发配置 >>> AMQP服务端订阅HOST
    CLIENT_ID: "***",
    IOT_INSTANCE_ID: "",
    ACCESS_KEY: "LT***",
    ACCESS_KEY_SECRET: "***",
    CONSUMER_GROUP_ID: "DEFAULT_GROUP" // 规则引擎 >>> 服务端订阅 >>> 消费组列表 >>> 消费组ID
  }
};

module.exports = CONSTANT;
