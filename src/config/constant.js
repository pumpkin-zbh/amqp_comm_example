const CONSTANT = {
  PORT: 5671,
  TRANSPORT: "tls",
  RECONNECT: true,
  IDLE_TIME_OUT: 60000,
  ALIYUN: {
    PRODUCT_KEY: "harqueuJcDg",
    DEVICE_NAME: "MC987654321A",
    DEVICE_SECRET: "2bad2cba60967e3f162b0ad775c8bfce",
    HOST: "iot-06z00am23b82gbc.amqp.iothub.aliyuncs.com",  // 实例详情 >>> 开发配置 >>> AMQP服务端订阅HOST
    CLIENT_ID: "025e897b-8edb-4d50-834a-258702e77266",
    IOT_INSTANCE_ID: "iot-06z00am23b82gbc",
    ACCESS_KEY: "LTAI5tLurvTyfVNWCHSiomsz",
    ACCESS_KEY_SECRET: "YnzDNNih5RAy5XaI2ymlR00pf38GMr",
    CONSUMER_GROUP_ID: "DEFAULT_GROUP" // 规则引擎 >>> 服务端订阅 >>> 消费组列表 >>> 消费组ID
  }
};

module.exports = CONSTANT;
