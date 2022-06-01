/**
* write your Darabonba code here...
*/
import Iot from '@alicloud/iot20180120';
export default class Client {
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @param regionId
     * @return Client
     * @throws Exception
     */
    static createClient(accessKeyId: string, accessKeySecret: string): Iot;
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
    static BatchPubSample(client: Iot, productKey: string, iotInstanceId: string, messageContent: string, topicShortName: string, deviceName: string): Promise<void>;
    static main(args: string[]): Promise<void>;
    static publishGroupsOrder(): Promise<void>;
    static publishJumpingOrder(): Promise<void>;
}
