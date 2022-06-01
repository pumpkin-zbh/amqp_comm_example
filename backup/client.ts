// This file is auto-generated, don't edit it
/**
* write your Darabonba code here...
*/
import Iot, * as $Iot from '@alicloud/iot20180120';
import Util from '@alicloud/tea-util';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Console from '@alicloud/tea-console';
import * as $tea from '@alicloud/tea-typescript';
import { base64encode, base64decode } from 'nodejs-base64';

export default class Client {

  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @param regionId
   * @return Client
   * @throws Exception
   */
  static createClient(accessKeyId: string, accessKeySecret: string): Iot {
    let config = new $OpenApi.Config({ });
    // 您的AccessKey ID
    config.accessKeyId = accessKeyId;
    // 您的AccessKey Secret
    config.accessKeySecret = accessKeySecret;
    // 您的可用区ID
    config.regionId = "cn-shanghai";
    return new Iot(config);
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
  static async BatchPubSample(client: Iot, productKey: string, iotInstanceId: string, messageContent: string, topicShortName: string, deviceName: string): Promise<void> {
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
      Console.log(Util.toJSONString($tea.toMap(response)));
    } catch (error) {
      Console.log(error.message);
    }
  }

  static async main(args: string[]): Promise<void> {
    // try {
    //   let data = {
    //     type: "scan",
    //     groupId: 2453, // 2 byte 0-65535
    //     devices: ['00124b0025237fb3']
    // }

    //   let client = Client.createClient("LTAI5tLurvTyfVNWCHSiomsz", "YnzDNNih5RAy5XaI2ymlR00pf38GMr");
    //   let productKey = args[0] || "harqueuJcDg";
    //   let iotInstanceId = args[1] || "iot-06z00am23b82gbc";
    //   let messageContent = args[2] || base64encode(JSON.stringify(data)) as string;
    //   let topicShortName = args[3] || "get";
    //   let deviceName = args[4] || "MC987654321A";
    //   await Client.BatchPubSample(client, productKey, iotInstanceId, messageContent, topicShortName, deviceName);
    // } catch (error) {
    //   Console.log(error.message);
    // }

    // 发送跳绳分组指令

    // 发送跳绳指令
  }
  // 发送分组指令
  static async publishGroupsOrder(): Promise<void> {
    const data = {}
    // await Client.BatchPubSample(client, productKey, CONSTANT.ALIYUN.IOT_INSTANCE_ID, base64encode(JSON.stringify(data)) as string;, 'get', deviceName);
  }

  // 发送跳绳指令
  static async publishJumpingOrder(): Promise<void> {

  }

}

Client.main(process.argv.slice(2));