---
date: 2023-04-08
authors: arthur
image: https://cos.codec.wang/new-bing-frontend-html-mode.jpg
tags: [New Bing, Bing, ChatGPT]
---

# 从前端角度看 New Bing: Web Components、WebSocket...

相信大家今年以来有关 ChatGPT、谷歌 Bard、微软 New Bing 的文章或新闻看过不少了。今天呢，闲着没事我们换个角度来看下 New Bing 都用了哪些前端技术。

## Web Components 和 Fast

首先打开 [Bing](https://www.bing.com/?mkt=en-us&cc=us) 首页，搜索任意内容，打开开发者工具（Windows: F12，Mac: ⌥ + ⌘ + i），然后定位 Chat 的元素。可以发现整个 New Bing 都是在 id 为`b_sydConvCont`的 div 下，它的全称应该是`bing sydney conversation content`，sydney 就是 Chat 聊天机器人的内部代号。

![](https://cos.codec.wang/new-bing-frontend-html-mode.jpg)

<!--truncate-->

当我们在 Search 和 Chat 模式来回切换的时候，可以发现`cib-serp`标签的 mode 属性会在`off-stage`和`conversation`之间变化，手动更改这个 mode 值也可以实现两个模式的切换。继续展开`cib-serp`组件的 shadow-root 就可以看到整个 Chat 模式的 DOM 结构了。

![](https://cos.codec.wang/new-bing-frontend-web-components.jpg)

到这大家应该也发现了：用中划线连接的标签名，又用了 Shadow DOM，没错**整个 Chat 模式都是用 Web Components 来实现的**，它是现代浏览器原生支持的组件化技术，不过目前用的不算多，大部分还是 React/Vue。既然用了 Web Components，那样式自然就可以做到组件化封装。查看元素的样式可以发现，为了复用和更好地控制样式，Bing 使用了 CSS 的变量。

另外，在 HTML 元素中会看到`fast-xxx`之类的注释。为了便于看源码（虽然都是压缩过的...），可以保存网页，然后用 VSCode 打开，搜索 fast，结果如下。所以 Bing 使用的应该是 [Fast](https://www.fast.design/) 框架，毕竟 Fast 也是微软自家的，没毛病。

![](https://cos.codec.wang/new-bing-frontend-fast.jpg)

整体看下来 Chat 的布局还是蛮简单的，相信熟悉 React/Vue 的同学应该很快就能复刻出一套。

```bash
cib-serp
├── cib-conversation
│   ├── cib-chat-main
│   │   ├── cib-welcome-container
│   │   ├── cib-chat-turn
│   │   │   └── cib-message-group
│   │   │       └── cib-message
│   │   └── cib-notification-container
│   └── cib-suggestion-bar
└── cib-action-bar
```

## WebSocket 长连接

GPT 是一种 Generative 生成式的语言模型，简单理解就是每次生成的文本都会拼接到原来的文本后面用于下一次生成，如此循环直到结束。这也是为什么我们看到 Bing 的回答是一段一段“冒”出来的，而不是直接出来。那从前端来看，就需要一个长连接的通讯方式，让服务端不断地发送消息到前端渲染。

打开开发者工具 - 网络，为了便于查看先清空列表，这时候如果我们在 Chat 里发送一条消息，Bing 会发起一个 `wss://sydney.bing.com/sydney/ChatHub` 的请求，`wss`也就是 WebSocket Secure 协议的缩写。WebSocket 是支持客户端和服务端之间双向通信的长连接协议，Secure 的意思是在 WebSocket 基础上提供 `SSL/TLS` 加密，有点类似于 HTTP 和 HTTPS 的关系：

![](https://cos.codec.wang/new-bing-frontend-wss.jpg)

查看`wss`的消息列表，在答案生成的过程中，服务端会不断地向浏览器发送 JSON 消息，下面是我格式化后的一条。可以看到其中`text`字段就是实际的消息内容，它会不断地拼接："a" -> "ab" -> "abc"...，前端也会跟着不断地渲染，**仔细看会发现它实际是 Markdown 格式**。

````json
{
  "type": 1,
  "target": "update",
  "arguments": [
    {
      "messages": [
        {
          "text": "Here's an example Python code to extract URL parameters using `urlparse` and `parse_qs` functions from the `urllib.parse` module:\n\n```\nfrom urllib.parse import urlparse, parse_qs\n\nurl = \"https://www.example.com/some_path?some_key=some_value&another_key=another_value\"\nparsed_url = urlparse(url)\nparams = parse_qs(parsed_url.query)\n\nprint(params)\n```\n\nIn this example, we first import the necessary modules. Then we define",
          "author": "bot",
          "createdAt": "2023-04-08T13:16:20.1700814+00:00",
          "timestamp": "2023-04-08T13:16:20.1700814+00:00",
          "messageId": "23f57b4c-467f-4271-83bd-59a839cf910e",
          "offense": "Unknown",
          "adaptiveCards": [...],
      "requestId": "2ae3d244-c6a5-4f8a-82f7-45ce0e07e6f5"
    }
  ]
}
````

## Markdown 渲染

既然后台返回的是 Markdown，前端就需要将它转换成 HTML 渲染出来。有很多成熟优秀的库可以做这件事，比如 marked、markdown-it 等等。我在 Bing 的代码里面全局搜了一下，Bing 用的是 [markdown-it](https://github.com/markdown-it/markdown-it)。

![](https://cos.codec.wang/new-bing-frontend-markdown-it.jpg)

markdown-it 配合一些插件就可以显示比较丰富的格式，比如 LaTex 公式、脚注等等。

## iframe 嵌入 Bing 搜索结果

New Bing 有时候会在回答结果的下面多一个更多内容的卡片，比如问它"北京的天气"、"最新的新闻"、"Tom Cruise 的照片"等等，这让 Bing 的功能体验更加丰富。前面我们说到 message 实际上是 Markdown，显然用 Markdown 是很难渲染出这么复杂的 UI/UX 内容的。查看元素会发现这一块其实是 iframe，再看 [iframe/src](https://www.bing.com/search?showselans=1&IG=0947A48C570E4219857147B1BCF67105&IID=SERP.5027&cw=561&ch=733&kseed=7500&SFX=2&q=Tom+Cruise%E7%9A%84%E7%85%A7%E7%89%87&iframeid=ed7c3dd6-226b-44ae-87fe-16622956b590) 属性值，它实际是将 Bing 的搜索结果页面嵌入了进来：

![](https://cos.codec.wang/new-bing-front-end-iframe.jpg)

## CIB

以上就是大概扒了扒 New Bing 前端的内容，总结下 New Bing 用到的前端技术：Web Components、Shadow DOM、WebSocket、iframe 等。当然还可以更深地挖，比如我们前面看到所有的组件都以`cib`开头，假如你在源码中搜索`cib`，会找到`window.CIB`这个全局挂载的变量，然后在控制台打印`CIB`，会发现很多 Chat 模式的配置选项和方法，非常好玩，就留给大家去摸索吧（其实是我写不动了 🤣）。需要提醒的是网上有些绕开 Bing 限制的手段，尽量还是少用，避免被 ban。最后，有谁能猜到缩写`cib`代表什么～？🙃

![](https://cos.codec.wang/new-bing-frontend-window-cib.jpg)
