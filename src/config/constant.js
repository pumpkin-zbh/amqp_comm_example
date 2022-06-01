const CONSTANT = {
  PORT: 5671,
  TRANSPORT: "tls",
  RECONNECT: true,
  IDLE_TIME_OUT: 60000,
  ALIYUN: {
    PRODUCT_KEY: "a13qWn6Mw8t",
    DEVICE_NAME: "MC1234567890AB",
    DEVICE_SECRET: "beb26048b5bd93e69f0c92a95f4ffa27",
    HOST: "278720854067812669.iot-amqp.cn-shanghai.aliyuncs.com",  // 实例详情 >>> 开发配置 >>> AMQP服务端订阅HOST
    CLIENT_ID: "025e897b-8edb-4d50-834a-258702e77266",
    IOT_INSTANCE_ID: "",
    ACCESS_KEY: "LTAI5tRLTGq6BJFvsAY1ukAt",
    ACCESS_KEY_SECRET: "P5W2jpcdgWB09ZEdOuqljKWyMbCrTV",
    CONSUMER_GROUP_ID: "DEFAULT_GROUP" // 规则引擎 >>> 服务端订阅 >>> 消费组列表 >>> 消费组ID
  }
};

module.exports = CONSTANT;
