---
date: 2020-08-29
authors: codec
image: http://cos.codec.wang/can-i-use-browser-compatiblity-fetch.jpg
tags: ["兼容性", "浏览器"]
---

# 浏览器兼容性自查

在解决浏览器兼容性问题或使用一些较新的 Web 技术时，经常需要查看各浏览器对 HTML/CSS/JS/SVG/Web/HTTP 等某些接口的支持程度。以下是两种不错的自查方式：

## CanIUse

https://caniuse.com/

<!--truncate-->

![](http://cos.codec.wang/can-i-use-browser-compatiblity-fetch.jpg)

搜索关键字就会给出该特性在桌面和移动端主流浏览器中的兼容数据：

1. 该特性在全球浏览器中支持 + 部分支持的比例，可以点击搜索栏旁边的设置来显示中国的数据
2. 浏览器的当前版本，往上是旧版本，往下是未来的版本
3. 详情浮窗：该版本的发布时间和使用率等，浏览器使用率数据来自 [StatCounter](https://gs.statcounter.com/)
4. **附加资源**：很多实用的链接，比如该特性的规范定义、功能演示、不支持该特性时可使用的 [Polyfill](./polyfill-and-shim.md) 等等

## MDN

在 MDN(Mozilla Developer Network) 上查看接口的相关资料时，一般都会在最后给出浏览器的兼容数据，如：

https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API

![](http://cos.codec.wang/mdn-browser-compatiblity-fetch-api.jpg)
