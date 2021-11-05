# 禁用浏览器的同源策略

- Author: Codec.Wang
- Date: 2020/08/25

![](
http://cos.codec.wang/disable-browser-same-origin-policy.png)

> 禁用同源策略 (Same Origin Policy) 会降低浏览器的安全性和稳定性，建议只在部分调试场景下使用。

如前端项目在本地开发时出现跨域问题，在不修改后端且不配置代理的情况下，临时禁用同源策略是最为简单的方式。

## MAC

Chrome 可以直接用启动参数--disable-web-security 来禁用，打开终端或命令行：

- Chrome

```bash
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev" --disable-web-security
```

- Edge(Chromium)

```bash
open -n -a /Applications/Microsoft\ Edge.app/Contents/MacOS/Microsoft\ Edge --args --user-data-dir="/tmp/edge_dev" --disable-web-security
```

- Safari

菜单栏 - 开发 - 停用跨源限制

![](http://cos.codec.wang/safari-disable-same-origin-policy.jpg)


## 引用

- [MDN: 浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)