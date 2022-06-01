const container = require('rhea');
const crypto = require('crypto');
const { ALIYUN, PORT, TRANSPORT, RECONNECT, IDLE_TIME_OUT} = require("./config/constant")

//创建Connection。
const connection = container.connect({
    //接入域名，请参见AMQP客户端接入说明文档。
    'host': ALIYUN.HOST,
    'port': PORT,
    'transport': TRANSPORT,
    'reconnect': RECONNECT,
    'idle_time_out': IDLE_TIME_OUT,
    //userName组装方法，请参见AMQP客户端接入说明文档。
    'username':`${ALIYUN.CLIENT_ID}|authMode=aksign,signMethod=hmacsha1,timestamp=${Date.now()},authId=${ALIYUN.ACCESS_KEY},iotInstanceId=${ALIYUN.IOT_INSTANCE_ID},consumerGroupId=${ALIYUN.CONSUMER_GROUP_ID}|`,
    //计算签名，password组装方法，请参见AMQP客户端接入说明文档。
    'password': hmacSha1(`${ALIYUN.ACCESS_KEY_SECRET}`, `authId=${ALIYUN.ACCESS_KEY}&timestamp=${Date.now()}`),
});

//创建Receiver Link。
connection.open_receiver();
console.log("AMQP Connection");

//接收云端推送消息的回调函数。
container.on('message', function (context) {
    let  msg = context.message;
    let messageId = msg.message_id;
    let topic = msg.application_properties.topic;
    let content = JSON.parse(Buffer.from(msg.body.content).toString());
    if (topic.indexOf('/user/update') !== -1) {
        console.log("\nTopic: " + topic)
        if (content.subType === "SCAN") {
            // 网关持续上传周围的跳绳清单和状态、配置信息
            console.log("DATA:", JSON.stringify(content));
        } else if (content.subType === "JUMPING") {
            // 网关上传周围的跳绳的进度
            console.log("Data:", JSON.stringify(content));
        } else if (content.subType === "GROUPING") {
            // 网关汇报分组结果
            console.log("Data:", JSON.stringify(content));
        } else if (content.subType === "START_JUMP") {
            // 网关汇报跳绳即将开始
            console.log("Data:", JSON.stringify(content))
        }
    } else {
        console.warn("Unsupported topics", topic)
    }
    //发送ACK，注意不要在回调函数有耗时逻辑。
    context.delivery.accept();
});

//计算password签名。
function hmacSha1(key, context) {
    return Buffer.from(crypto.createHmac('sha1', key).update(context).digest())
        .toString('base64');
}