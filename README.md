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
  + 自由跳模式：FREESTYLE 倒计数模式：TARGET_JUMPS 倒计数模式：COUNTDOWN_TIMER

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

### 更新日志
- 新增参数 duration
  + 位置：src/config/client_report.json(START_JUMP)
  + 说明：该字段表示倒计时模式的时间

- 新增参数 jumpDelayTime
  + 位置：src/config/client_report.json(START_JUMP -> data)
  + 说明：该字段表示跳绳开始计时的延迟时间(相对于网关广播接收到开跳指令的时间)

- 新增参数 groupOvertime
  + 位置：src/config/client_report.json(GROUPING -> data)
  + 说明：该字段表示此次跳绳分组连接的限定时间（超过该时间后不会对分组未成功的设备继续进行尝试）

- 新增参数 broadcastDuration
  + 位置：src/config/client_report.json(START_JUMP -> data)
  + 说明：该字段表示此次开跳指令广播的持续时长(持续时间内每200ms广播一次开跳指令)