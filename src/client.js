"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This file is auto-generated, don't edit it
/**
* write your Darabonba code here...
*/
const iot20180120_1 = __importStar(require("@alicloud/iot20180120")), $Iot = iot20180120_1;
const tea_util_1 = __importDefault(require("@alicloud/tea-util"));
const $OpenApi = __importStar(require("@alicloud/openapi-client"));
const tea_console_1 = __importDefault(require("@alicloud/tea-console"));
const $tea = __importStar(require("@alicloud/tea-typescript"));
const { base64encode } = require("nodejs-base64")
const { ALIYUN } = require("./config/constant.js");

class Client {
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @param regionId
     * @return Client
     * @throws Exception
     */
    static createClient(accessKeyId, accessKeySecret) {
        let config = new $OpenApi.Config({});
        // 您的AccessKey ID
        config.accessKeyId = accessKeyId;
        // 您的AccessKey Secret
        config.accessKeySecret = accessKeySecret;
        // 您的可用区ID
        config.regionId = "cn-shanghai";
        return new iot20180120_1.default(config);
    }
    /**
     * 向指定批量设备发布消息
     *
     * @param client
     * @param productKey
     * @param iotInstanceId
     * @param messageContent
     * @param topicShortName
     * @param deviceName
     */
    static async BatchPubSample(client, productKey, iotInstanceId, messageContent, topicShortName, deviceName) {
        try {
            let request = new $Iot.BatchPubRequest({
                // 物联网平台实例ID
                iotInstanceId: iotInstanceId,
                // 产品ProductKey
                productKey: productKey,
                // 要发送的消息主体，hello world Base64 String
                messageContent: messageContent,
                // 指定消息的发送方式，支持QoS0和QoS1
                qos: 0,
                //自定义Topic的后缀
                topicShortName: topicShortName,
                deviceName: [
                    deviceName
                ],
            });
            let response = await client.batchPub(request);
            tea_console_1.default.log(tea_util_1.default.toJSONString($tea.toMap(response)));
        }
        catch (error) {
            tea_console_1.default.log(error.message);
        }
    }
    static async main(args) {
        if (args[0] === "GROUP") {
            await this.publishGroupsOrder()
        } else if (args[0] === "JUMP") {
            await this.publishJumpingOrder()
        } else {
            console.warn("Please enter GROUP | JUMP")
        }
    }

    // 发送分组指令
    static async publishGroupsOrder() {
        const topic = "get";
        const sn = ALIYUN.DEVICE_NAME;
        const data = {
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
        let client = Client.createClient(ALIYUN.ACCESS_KEY, ALIYUN.ACCESS_KEY_SECRET);
        await Client.BatchPubSample(client, ALIYUN.PRODUCT_KEY, ALIYUN.IOT_INSTANCE_ID, base64encode(JSON.stringify(data)), topic, sn);
    }

    // 发送跳绳指令
    static async publishJumpingOrder() {
        const topic = "get";
        const sn = ALIYUN.DEVICE_NAME;
        const data = {
            type: 'SET',
            subType: 'GROUPING',
            data: {
                groupId: 2453, // 2 byte 0-65535
                devices: ['1C9DC2585C04', '1C9DC2585BB0']
            }
        }
        let client = Client.createClient(ALIYUN.ACCESS_KEY, ALIYUN.ACCESS_KEY_SECRET);
        await Client.BatchPubSample(client, ALIYUN.PRODUCT_KEY, ALIYUN.IOT_INSTANCE_ID, base64encode(JSON.stringify(data)), topic, sn);
    }
}
exports.default = Client;
Client.main(process.argv.slice(2));
//# sourceMappingURL=client.js.map