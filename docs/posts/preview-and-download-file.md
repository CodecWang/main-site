# H5 文件预览和下载

- Author: Codec.Wang
- Date: 2020/06/04

今天前端小伙伴遇到这么一个问题：a 标签指向非同源的一个文件，点击后会在浏览器中打开并预览该文件而不是下载它。嗯…很有意思，纪录于此。<!-- more -->

## 同源

你可能跟我一样，网上搜索的大部分解决方案是给 a 标签添加 download 属性，但其实并非所有场景都适用。先来了解下 HTML5 a 标签的 downlaod 属性。

参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#download)，该属性表示让浏览器下载 URL 而不是导航到它。比如项目中有两个文件 ([本节源码](https://github.com/ex2tron/BlogCode/tree/master/Download-InsteadOf-Open))：

```bash
├── index.html
└── config.json
```

index 中我写了两个 anchor 标签：

```html
<a href="config.json">不加 download</a>
<a href="config.json" download>加了 download</a>
```

然后启动 web 服务。如果你用 VSCode 的话，可以安装一个插件`Live Server`。安装好之后，右键 index.html，选择 Open with Live Server，它会自动启动浏览器并访问`http://127.0.0.1:5500/index.html`，很方便。

> 不要直接打开 index.html，因为这样使用的是文件 file 协议，而非 http 协议。

![](http://cos.codec.wang/download-instead-preview-live-server.png_webp)

分别点击两个 a 标签，你会发现不加 download 的会在浏览器中预览 config.json 文件，而加了 download 就会下载。各浏览器对 download 的兼容性可参考[Can I use](https://caniuse.com/#search=download%20attribute)。另外，也可以给它赋值，表示下载后保存的文件名，如：

```html
<a href="config.json" download='imcute.json'>加了 download 并重命名</a>
```

OK，so far so good。但并没有解决我们的问题，因为很多人忽略了同源这一点，[同源](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)表示拥有相同的协议、域名和端口。MDN 上也写的很明确：

```
此属性仅适用于同源 URL
download only works for same-origin URLs.
```

一般情况下，网站资源就是放在网站服务器上，源相同，所以加上 download 属性没毛病。但我们的文件放在腾讯云对象存储系统 COS 上，显然与网站不同源。

## 不同源

不同源时就只能通过 JS 来下载了，这就有很多种方法了，非本节的讨论点，大家可自行 Google。

那有没有即使不同源，a 标签照样点击下载的方法呢？有：配置服务端文件的 HTTP Headers。因为 a 标签点击时也是发送了 HTTP 请求，所以可通过设置响应头方式实现。

首先了解下 Content-Disposition，参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition)，它表示响应的内容以何种形式展示。如果值是 inline，表示是网页的一部分；值为 attachment，表示以附件的形式下载文件。

比如下面两个链接文件内容完全一致，都放在我的对象存储 COS 上面。第二个设置了 Content-Disposition 为 attachment。（腾讯云 COS 请求头的设置方式请参考：[上传和下载](https://cloud.tencent.com/document/product/436/30740)）

- index.html

```html
<a href="https://techblog-1253540739.cos.ap-chengdu.myqcloud.com/download-instead-preview.json">没设置请求头</a>
<a href="https://techblog-1253540739.cos.ap-chengdu.myqcloud.com/download-instead-preview-attachment.json">设置了请求头</a>
```

运行后分别点击这两个 a 标签。第一个还是预览，第二个就直接下载了。搞定！

配置成 attachment 时，也可以添加文件名：

```
Content-Disposition: attachment; filename="imcute.json"
```

此时，如果 a 标签也加了 download='config.json'的属性，将优先使用请求头中配置的，即 imcute.json

## PDF

对于 pdf 文件，Chrome 和基于 Chromium 的 Edge 浏览器在设置中提供了一个是否始终外部打开的选项。打开后，无论服务端有没有设置 Content-Disposition，文件都会下载。

- 打开浏览器设置，搜索 pdf：

![](http://cos.codec.wang/download-instead-preview-chrome-pdf.png_webp)

## 引用

- [本节源码](https://github.com/ex2tron/BlogCode/tree/master/Download-InsteadOf-Open)
- [浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
- [a 标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#download)
- [Content-Disposition](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition)