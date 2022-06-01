### 客户系统与网关之间的交互示例

#### 项目初始化
- npm install

#### 项目运行
- 模拟网关发布信息
  + node src/gateway
- 客户系统连接AMQP
  + node src/amqp.js
- 客户系统发布分组通知
  + node src/client.js GROUP
- 客户系统发布跳绳通知
  + node src/client.js JUMP

#### 文档指南
- 阿里云物联网AMQP服务端订阅
  + https://help.aliyun.com/document_detail/130827.html

- 阿里云物联网云端开发指南
  + https://help.aliyun.com/document_detail/386371.html
#### 文件目录
```
.
├── package.json
└── src
    ├── amqp.js # 客户系统建立AMQP连接
    ├── client.js # 客户系统
    ├── gateway.js # 网关发布信息(未完善)
    ├── config
        ├── client_report.json # 客户系统发布配置
        └── constant.js # 阿里云IOT相关配置信息

```