// This file is auto-generated, don't edit it
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Console from '@alicloud/tea-console';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';

import { AccessConfig } from './config'

export default class Client {

  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(accessKeyId: string, accessKeySecret: string): Dysmsapi20170525 {
    const config = new $OpenApi.Config({
      // 您的 AccessKey ID
      accessKeyId: accessKeyId,
      // 您的 AccessKey Secret
      accessKeySecret: accessKeySecret,
    });
    // 访问的域名
    config.endpoint = `dysmsapi.aliyuncs.com`;
    return new Dysmsapi20170525(config);
  }

  static async sendMSM(phone: string, code: string) {
    const client = Client.createClient(AccessConfig.ACCESS_KEY_ID, AccessConfig.ACCESS_KEY_SECRET);
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: "coderhhf",
      templateCode: "SMS_250935178",
      phoneNumbers: phone, // 手机号
      templateParam: `"{\"code\":\"${code}\"}"`, // 验证码
    });
    const runtime = new $Util.RuntimeOptions({});
    const resp = await client.sendSmsWithOptions(sendSmsRequest, runtime);
    return resp
    // Console.log(Util.toJSONString($tea.toMap(resp)));
  }

}

// Client.main(process.argv.slice(2));