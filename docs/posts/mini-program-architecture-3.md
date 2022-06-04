# 实例：小程序工程结构

- Author: [CodecWang](http://codec.wang)
- Date: 2020/04/13

我是去年 10 月开始负责小程序的开发维护工作，一开始我是冲着 UI/UX 去改的，因为旧版在设计和交互上存在太多问题，为此我用 Sketch 重新设计了一套全新 UI/UX。但阅读代码时，发现代码实在写的...太烂了，接口调用、基础配置、数据处理、页面逻辑、日志处理等等都写在一起，随便一个函数就是百来行，看的我简直不要太崩溃……咋办呢？唉，作为一名强迫症患者，重~~构~~写走起呗 🙃<!-- more -->

---

> 本篇描述的工程架构完全是我依靠自己的工程经验构建，接手时我也是新手～

## demo

为便于说明，我这里简化一个小程序的案例并一步步介绍如何建立工程目录。

假设有一个新闻小程序，只有一个页面 home，如下图。启动时会调用登陆接口，登陆成功就获取新闻列表。

![](http://cos.codec.wang/my-mini-program-architecture-3-news-app.png_webp)

很简单，只有 2 个 GET 接口。此外页面还有个刷新按钮，功能就是获取新闻列表。

## 1.0

暂且称我接手时的架构版本为 1.0，这个版本的架构简单来说就是没有架构，只为实现功能。各类逻辑都写在一起，UI 上重复的代码也未提取成组件。

```bash
.
└── home	# 页面
    ├── home.js
    └── home.wxml
```

这也是新手常常写出来的代码，大家要不要尝试阅读下 🤒(看不下去可以直接略过)：

- home.js

```javascript
/* 以下代码仅作为示例，并非实际运行代码 */
const ENV = 'test';
const domain = ENV === 'test' ? 'http://api.jl.com/test/' : 'http://api.jl.com/prod';
const loginData = {
    appID: 'testappid',
    loginCode: 'testloginCode',
}

onLoad: function () {
    wx.showLoading({ title: '数据加载中' });
    wx.request({
        url: domain + '/v1/login/?AppID=' + loginData.appID + '&Code=' + loginData.loginCode,
        method: 'GET',
        success(result) {
            wx.hideLoading();
            console.log('login succeed: ', result);
            if (result.statusCode == 200 && result.data.Status === 'Succeed') {
                wx.request({
                    url: domain + '/v1/getNews/',
                    method: 'GET',
                    success(result) {
                        console.log('get news succeed: ', result);
                        if (result.statusCode == 200 && result.data.Status === 'Succeed') {
                            if (result.data.news.length > 0) {
                                let news = result.data.news;
                                news = news.map((item, index) => {
                                    item.color = index % 2 === 0 ? 'red' : 'green';
                                });
                                this.setData({ news });
                            }
                        }
                    },
                    fail(error) {
                        console.log('get news failed: ', error);
                        this.showToast(`你已到火星～${error}`);
                    },
                    complete() {
                        /* Do Nothing. */
                    }
                });
            } else {
                this.showToast('你已到火星～');
            }
        },
        fail(error) {
            console.log('login failed: ', error);
            wx.hideLoading();
            this.showToast(`你已到火星～${error}`);
        },
        complete() {
            /* Do Nothing. */
        }
    });
},
```

这已经是我从实际代码中提取并简化很多后的代码了。其实逻辑很简单，就是两个接口的调用。那为什么看上去这么复杂呢？原因就是将各类模块和功能都揉杂在了一起。接下来我们一步步拆分。

## 2.0

### 配置层

这是最简单的一块：代码的前两行是 API 的环境，测试环境 test 还是线上环境 prod，这属于项目的基础配置项，不应该出现在页面逻辑代码中。所以我们提取一个叫 config 的目录。

```bash
.
├── config	# 配置层
│   └── config.js
└── home	# 页面
    ├── home.js
    └── home.wxml
```

- config.js

```javascript
/**
 * 配置文件
 * @author: codec.wang
 */
module.exports = {
  ENV: "test",

  GetEnv: function () {
    return envConfig[this.ENV];
  },
};

const envConfig = {
  test: {
    domain: "http://api.jl.com/test/",
    debug: true,
  },
  prod: {
    domain: "http://api.jl.com/prod/",
    debug: false,
  },
};
```

### 接口层

这部分是 2.0 架构重构中的关键：`onLoad`中主要执行的是接口调用，大量重复代码集中在这里，比如接口调用成功的判断：

```javascript
if (result.statusCode == 200 && result.data.Status === "Succeed") {
}
```

接口调用成功或失败时的处理 (日志打印)：

```javascript
success(result) {console.log('succeed: ', result);}
fail(error) {console.log('error: ', error);}
```

显然这些重复的代码都需重构。但这里还有个最关键的维护性问题：接口散落在页面代码中。

举例来说，登陆接口的接口名是`/v1/login`。假设这个接口后续变了：接口名变为 `/v2/loginServer`，参数多加了一个`Time`字段。此时，你需要找到使用此接口的所有页面，一个个更改字符文本，这种操作简称"作死"🙂

综上，我们需要把`wx.request`封装一层，将接口成功或失败时的通用处理写在这层中。然后把所有的接口调用写在一个文件`api.js`中。

```bash
├── api		# 接口层
│   ├── api.js		# 所有接口调用
│   └── request.js	# HTTP 请求封装
├── config	# 配置层
│   └── config.js
└── home	# 页面
    ├── home.js
    └── home.wxml
```

要封装一层小程序的 HTTP 请求，需要用到[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。此处逻辑其实也比较简单，但需要对 Promise 有所了解：

- request.js

```javascript
/**
 * 封装 wx.request 为 Promise 对象
 * @author: codec.wang
 */

class Request {
  constructor(params) {
    this.baseUrl = params.baseUrl; // API 根地址
    this.enableBaseUrl = params.enableBaseUrl; // 是否启用根地址
  }

  get(url, data) {
    return this.request(url, data, "GET");
  }

  post(url, data) {
    return this.request(url, data, "POST");
  }

  put(url, data) {
    return this.request(url, data, "PUT");
  }

  request(url, data, method = "GET") {
    const actualUrl = this.enableBaseUrl ? this.baseUrl + url : url;

    return new Promise((resolve, reject) => {
      wx.request({
        url: actualUrl,
        data,
        header: {},
        method: method,
        dataType: "json",
        responseType: "text",
        success: function (res) {
          // 简化小程序请求，Promise 的 then 即为请求 + 数据正常，catch 为请求失败或数据有无
          if (res.statusCode === 200 && res.data.Status === "succeed")
            resolve(res.data.Data);
          else {
            console.log(`${url} Return failed: ${JSON.stringify(res.data)}`);
            reject(res.data);
          }
        },
        fail: function (res) {
          console.log(`${url} Request failed: ${JSON.stringify(res)}`);
          reject(res.data);
        },
        complete: function (res) {
          /* Do Nothing. */
        },
      });
    });
  }
}

/* 小程序的 Promise 没有 finally 方法，需要自己扩展 */
Promise.prototype.finally = function (callback) {
  let Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(function () {
        return value;
      });
    },
    function (reason) {
      Promise.resolve(callback()).then(function () {
        throw reason;
      });
    }
  );
};

export { Request };
```

这段代码是整个接口层的重点，大家细品下。封装好之后，在`api.js`中统一编写接口调用：

- api.js

```javascript
/**
 * 统一接口定义
 * @author: codec.wang
 */

import { Request } from "request";
const CONFIG = require("../config/config");
const REQUEST = new Request({
  baseUrl: CONFIG.GetEnv().domain,
  enableBaseUrl: true,
});

const API = {
  Login(data) {
    /* 登陆 */
    return REQUEST.get("/v1/login/", data);
  },

  GetNews(data) {
    /* 获取新闻列表 */
    return REQUEST.get("/v1/getNews", data);
  },
};

export default API;
```

不过有可爱的小伙伴要问了，你这代码咋越写越多呢，感觉更复杂了啊。

这样提问的童鞋一定是没做过较为复杂的工程项目。抽离分隔的目的是使每个模块各司其职，提升逻辑架构，使页面只关心自己的数据结构和算法逻辑。举例来说，经过上述的重构，home 页面的接口调用就很简单了：

- home.js

```javascript
onLoad: function () {
    wx.showLoading({ title: '数据加载中' });
    API.Login(loginData)
        .then(_ => this.getNews())
        .catch(error => this.showToast(error))
        .finally(() => wx.hideLoading());
},

getNews: function () {
    API.GetNews({})
        .then(data => this.setData({news: data}))
        .catch(error => this.showToast(error))
        .finally(() => {/* Do Nothing. */});
},
```

此时，页面上的刷新按钮直接调用`getNews`就行，整个页面的逻辑非常明了。

### 日志层

代码中用了很多的`console.log()`来打印日志，线上环境不应该直接这样使用，而是应该有专门的日志模块。小程序正好也提供了[实时日志](https://developers.weixin.qq.com/miniprogram/dev/framework/realtimelog)功能，因此，在测试环境上统一使用`console.log`打印日志，便于本地调试，而线上环境则使用实时日志在小程序后台管理端记录。

```bash
.
├── api		# 接口层
│   ├── api.js
│   └── request.js
├── config	# 配置层
│   └── config.js
├── home	# 页面
│   ├── home.js
│   └── home.wxml
└── log		# 日志层
    └── log.js
```

- log.js

```javascript
/**
 * 小程序实时日志（本地调试打印）
 * @author: codec.wang
 */
const CONFIG = require("../config/config");
let _log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
const _isLogMode = CONFIG.GetEnv().debug;

module.exports = {
  Info() {
    if (!_log) return;
    if (!_isLogMode) _log.info.apply(_log, arguments);
    else console.log(arguments[0]);
  },

  Warn() {
    if (!_log) return;
    if (!_isLogMode) _log.warn.apply(_log, arguments);
    else console.log(arguments[0]);
  },

  Error() {
    if (!_log) return;
    if (!_isLogMode) _log.error.apply(_log, arguments);
    else console.log(arguments[0]);
  },
};
```

### 工具层

到目前为止所有的改动我称为 2.0。当然实际代码中还有很多内容，比如一个通用的数据编码算法，我会提到工具层 utils 中去。还有一些枚举字段的定义，比如性别，我会放到配置层的`fields.js`中等等。最终 2.0 版的目录架构如下：

![](http://cos.codec.wang/my-mini-program-architecture-3-2.0-chart.png_webp)

```bash
.
├── api		# 接口层
│   ├── api.js
│   └── request.js
├── config	# 配置层
│   ├── config.js
│   └── fields.js
├── home	# 页面
│   ├── home.js
│   └── home.wxml
├── log	# 日志层
│   └── log.js
└── utils	# 工具层
    └── utils.js
```

## 3.0

在前面的重构中，我们忽略了这样一个处理：大家看下 1.0 版本获取新闻列表后的操作 (25 ～ 30 行)。这里是对后端返回数据的校验 + 预处理。实际开发中，我发现基本所有接口数据都需要在前端做一次单独的校验和预处理，那么为什么不把它提取到一个模块中呢？

![](http://cos.codec.wang/my-mini-program-architecture-3-data-pre.png_webp)

另外，在 1.0 的登陆接口中 (13 行)，前后端参数名称不一致：前端是`{appID, loginCode}`，但请求实际需要的字段是`{AppID, Code}`。同样，这种问题基本不可避免，因为前后端分离的开发模式和接口文档更新的时间差 (研发流程)，开发人员用各自的命名规范很正常。

### Norm 层

这两个操作都与页面本身无关。理想状态下，页面就是发送请求后拿数据渲染就行。而正好，这两个操作都跟 API 请求有关，分别发生在请求后和请求前。那么，就可以加入一个控制层`controller`或标准化层`norm`用来对数据进行校验 + 预处理：

![](http://cos.codec.wang/my-mini-program-architecture-3-norm.png_webp)

由于是在请求前后加的，所以需要修改下请求的封装来使用`fNormIn`和`fNormOut`。重新编写前面的`request.js`文件：

- api/request.js

```javascript
get(url, data, fNormIn, fNormOut) {
    return this.request(url, data, 'GET', fNormIn, fNormOut);
}

request(url, data, method = 'GET', fNormIn, fNormOut) {
    if(fNormIn) data = fNormIn(data);

    return new Promise(
        (resolve, reject) => {
            wx.request({
                // 省略部分代码
                success: function (res) {
                    if (res.statusCode === 200 && res.data.Status === 'succeed') {
                        if (fNormOut) {
                            const ret = fNormOut(res.data.Data);
                            ret.isNormed ? resolve(ret.data.Data) : reject(ret.msg);
                        } else resolve(res.data.Data);
                    } else {/* 省略 */}
                },
                fail: function (res) {/* 省略 */},
                complete: function (res) {/* Do Nothing. */},
            })
        }
    )
}
```

此时，只需定义各个接口的`Norm`函数即可，放置于`norm`层。最终 3.0 版的目录架构如下：

```bash
.
├── api		# 接口层
│   ├── api.js
│   └── request.js
├── config	# 配置层
│   ├── config.js
│   └── fields.js
├── home	# 页面
│   ├── home.js
│   └── home.wxml
├── log	# 日志层
│   └── log.js
├── norm	# 控制/标准化层
│   ├── normIn.js
│   └── normOut.js
└── utils	# 工具层
    └── utils.js
```

当然这只是我自己定的架构，还有很多需要优化的地方，向各位大佬学习 👊

## 引用

- [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [小程序：实时日志](https://developers.weixin.qq.com/miniprogram/dev/framework/realtimelog/)
