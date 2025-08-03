---
slug: arc-with-ai-arc-max
title: Arc 浏览器 & AI - Arc Max
authors: [arthur]
tags: [AI, ChatGPT, "浏览器", Arc Browser, 大模型]
---

今年随着 ChatGPT 的出圈爆火，出现了一堆集成 AI 大模型的产品，浏览器、游戏甚至车机...之前[分享过 Arc 浏览器](https://codec.wang/blog/is-the-arc-browser-suitable-for-programmers)，它的很多创新我很喜欢，最近它也整合了一些 AI 能力：[Arc Max](https://arc.net/max)，下面就来具体看下。

<div style={{
  position: 'relative',
  width: '100%',
  paddingBottom: '56.25%',
  height: 0,
  overflow: 'hidden',
}}>
  <iframe
    src="//player.bilibili.com/player.html?isOutside=true&aid=789415021&bvid=BV15C4y1d7JF&cid=1293315912&p=1&autoplay=0"
    scrolling="no"
    frameBorder="no"
    allowFullScreen
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }}
  />
</div>

<br/>

先列大家可能关心的几个点：

<!--truncate-->

1. 需要梯子
2. 支持中文，但没英文好
3. 目前免费，官方尚未有收费计划

## 设计思路

> When we first started exploring AI in Arc, we were determined **not to use AI just to use AI**. We wanted to find ways that it could actually be useful in your browser.

<!--truncate-->

这个思路很棒，可以对比下 Edge 浏览器的做法：它在右上角直接放了个大大的 Bing，为 BingChat 和 Edge 侧边栏服务引流，这种简单粗暴的、打断式的交互起码我个人和身边很多人并不喜欢。

![](https://cos.codec.wang/arc-edge-bing-logo-side-bar.jpg)

## 启用 Arc Max

按下 Command + T 打开命令窗口，输入`max`即可打开 Arc Max 的设置。目前提供了 5 个功能，默认关闭，可按需求自行打开。

> 启用 Arc Max 后，浏览器会将一部分数据发送给 AI 合作商，如果你比较重视数据隐私和安全，可以点击底部的[链接](https://arc.net/privacy#what-personal-data-do-we-collect-and-how-do-we-collect-it)了解更多。

![](https://cos.codec.wang/arc-enable-arc-max.jpg)

## 功能体验

### 链接预览：5-Second Previews

将鼠标放在任何链接上按下 shift 键，就可以生成这个链接内容的快速预览，甚至是多媒体内容。**在 Google/Bing 等页面上不用按 shift 就能直接生成（百度暂不支持）**。

![](https://cos.codec.wang/arc-ai-5-seconds-preview.gif)

这个功能在一些长内容（如视频、新闻、百科等）和需要汇总的场景下很实用。目前体验下来，速度已经很快了，但还是有点不太跟手。

### 搜索增强：Ask on Page

通常我们在一个网页上搜索内容，会按下 Command + F，然后输入关键字检索。Arc 不仅能做到这点，还可以用自然语言与当前页面交互（相当于 ChatGPT 中将这个网页作为 Context）：

![](https://cos.codec.wang/arc-ai-ask-on-page.gif)

Edge 浏览器的 BingChat 侧边栏也基本能做到这点，但与搜索框整合显然更加自然，更有创意。

### 重命名页签：Tidy Tab Titles

在收藏网页的时候，收藏的标题默认会跟随网页标题。有时候网页标题会很长或者不太有标识性，如果不及时重命名整理，收藏夹就会很乱。Arc 的这个功能就是在 Pin/收藏网页的时候将标题智能重命名成一个较短的、更具语义的名称，然后如果不满意，双击就可以立马自行重命名。不过目前对中文支持不好，中文的标题会重命名成英文：

![](https://cos.codec.wang/arc-ai-tidy-tab-title.gif)

### 重命名下载：Tidy Downloads

与上一个类似，Arc 会智能重命名你下载的文件。在原始文件名语义不明的情况下是挺有用的，比如我保存一张网页上的图片时，原始文件名是`Screen-Shot-2022-09-22-at-12.55.13-PM`，下载后会变成`Screen Shot Sep 22 LogRocket`。如果觉得不好，也可以一键撤回：

![](https://cos.codec.wang/arc-ai-tidy-downloads.jpg)

但大部分时候网上下载的文件都是有一定的命名规则，比如我经常下一些电影资源，开启重命名后，个人不太习惯，所以我倾向于关闭这个功能。

```bash
# 原文件名：
绿里奇迹4k.The.Green.Mile.1999.2160p.BluRay.REMUX.HEVC.DTS-HD.MA.TrueHD.7.torrent

# 重命名后：
The Green Mile 1999 2160p BluRay REMUX.torrent
```

### ChatGPT 快速启动：ChatGPT in the Command Bar

按下 Option + Command + G 就可以快速调起 ChatGPT，输入问题，就会跳转到[https://chat.openai.com/](https://chat.openai.com/auth/login)。这其实并不算一个“功能”，就相当于 Chromium 的自定义搜索引擎，我之前也自己定义了 GitHub、NPM 这些网站的快捷指令，所以按下 Command + T 打开命令窗口，输入`chatgpt`，按 Tab 键也是这个功能。

![](https://cos.codec.wang/arc-ai-chatgpt-in-command-bar.jpg)

## 总结

总的来说，我很喜欢 Arc Max 的几个功能更新，它在浏览器的日常环节中借助 AI 提升用户体验，是个非常不错的设计思路，学习成本也很低，甚至像重命名页签和下载都是自动完成的。希望能继续更新更多有趣实用的功能，还有，不要收费！😀
