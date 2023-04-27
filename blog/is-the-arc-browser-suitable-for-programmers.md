---
date: 2023-04-18
authors: arthur
image: https://cos.codec.wang/arc-browser-cover.jpg
tags: [Arc, "浏览器", Arc Browser, Edge]
---

# [Draft]"改变认知" 的 Arc 浏览器深度体验，适合程序猿吗？

Arc 浏览器，官方宣称语是：`we're building a better way to use the internet`。很多博主的文章和视频也是经常以"改变了我的工作方式"、"改变了浏览器的交互"为标题。本文编写前还是得先加入等待列表，通过后才可以使用，这让我这么一个纯情理工男 🙃 觉得有点营销过度啊。

之前我申请到了 Arc 的权限，最近一直当作主力浏览器浏览和开发调试，下面就分享下深度体验。会和 Edge 浏览器做对比，优缺点都会讲到，尤其是对开发人员是否适合等问题。

![](https://cos.codec.wang/arc-browser-cover.jpg)

<!--truncate-->

## 安装

目前只支持 MacOS/IOS 设备：前往[官网](https://thebrowser.company/)填写邮箱后进入候补列表，之后等待通知就行。也可以通过邀请链接获取访问权限，已申请通过的人有 5 个赠送名额（有需要的可以 [email](mailto:codecwang@outlook.com) 我）。

第一次打开先进行简单的配置，比如登录、从其他浏览器导入数据、设置主题等，**Arc 浏览器必须登录才能使用**。y1s1，这这好看是真滴好看，操作也很流畅。

![](https://cos.codec.wang/arc-browser-setup.jpg)

## 界面和交互

![](https://cos.codec.wang/arc-browser-main-ui.jpg)

整体主界面如上图，右侧是网页内容区域，被 Arc 主体边框包裹，浏览器其他元素基本都在左边侧边栏。侧边栏可以调整大小，点左上角图标隐藏或 ⌘ + S 隐藏和显示。侧边栏从上到下依次是：

- 地址栏
- Favorites
- Pinned tabs
- Today tabs
- 快捷操作栏

这里有几个 Arc 的新概念，其实或多或少在其他浏览器里见过，比如垂直标签页和标签页分组，Edge 浏览器都有。刚好今天更新 Windows Edge，我靠，网页内容区域也变成了圆角矩形，啊这...

![](https://cos.codec.wang/arc-browser-edge-round-corner.jpg)

### 空间 Space

Arc 的管理核心是空间 Space，在快捷操作栏中间的三个图标就是我创建的三个空间：开发、日常和创作。左右滑动可以切换空间，滑至最左侧就可以看到所有空间：

![](https://cos.codec.wang/arc-browser-workspaces.jpg)

空间可以自定义图标/名称/深浅渐变主题等，每个空间可以有不同的主题，切换很丝滑：

![](https://cos.codec.wang/arc-browser-customize-space.jpg)

空间可以指定 Profile，**Profile 拥有独立的历史记录、密钥信息、浏览器插件等**，这个对工作/个人分开的场景非常实用。大家如果用过 VSCode Profile 的话，两者很类似。另外 **Arc 对快捷键支持非常好**，很多操作都会直接或间接将快捷指令显示在旁边，如果熟练掌握的话效率会很高。

![](https://cos.codec.wang/arc-browser-workspace-profile.jpg)

### 收藏 Favorites

Arc 的 Favorites 会以图标固定显示在地址栏下方，它不属于空间，所以空间切换时它不会变动。其实 Arc 的收藏并不太像传统浏览器的收藏，更像是固定几个极其常用的网页。推荐保持一行，不然会很拥挤，比如我固定了四个：谷歌搜索、ChatGPT、Phind AI 搜索、YouTube。

![](https://cos.codec.wang/arc-browser-favorites.jpg)

Arc 对拖拽支持也很好，可以将 tab 在 Favorites、Pinned 和 today 间任意拖动转换。

### 标签 Tabs

Tabs 归属于空间，空间切换时它也会跟着切换。Tabs 分为上面的 Pinned tabs 和下面的 Today tabs。

- Pinned tabs：在空间上方，类似传统浏览器的收藏夹，可以分目录/子目录管理，不会随时间清除掉
- Today tabs：在空间下方，就是日常浏览打开的标签页。标签页不活动的话，**Arc 默认会每隔 12 小时清除掉**，这个时间可以在设置中配置。Arc 管这一操作叫归档，归档后想要查看或恢复的话，可以滑至最左侧，其实它就是历史记录

![](https://cos.codec.wang/arc-browser-tabs.jpg)

这里有个挺有意思的功能，点击目录选项后按下 option(⌥) 键所有链接复制为 markdown 格式：

![](https://cos.codec.wang/arc-browser-copy-as-markdown.jpg)

### 控制中心 New Tab

当点击地址栏或者按下 ⌘ + T 都会打开 New Tab 面板，在这里不仅可以直接搜索内容，还可以调用 Arc、网络上的各种指令等，很强大，我觉得叫它控制中心会好点。下面是我常用到的几个场景：

![](https://cos.codec.wang/arc-browser-new-tab-control-center.jpg)

- 搜索并跳转任意 tabs
- 搜索内容或直接输入 URL
- 触发 Arc 集成的网页快捷指令，比如以`new`、`add`等词开头
- 在特定搜索引擎搜索，比如 bing、baidu 等。当然它是基于 Chromium，所以可以在设置中自定义网站搜索，Arc 在某些场景下也会自动识别并询问你是否添加，比如我最常用的是 github 和 npm：

![](https://cos.codec.wang/arc-browser-search-engine.jpg)

### **分栏 Split**

Arc 支持左右和上下分栏，同时只能生效一个。这是个非常实用的功能，我们经常需要两个或多个网页对照，之前需要把标签页拖出来一个新窗口，分栏就不用了。我试了下最多分 4 栏（不确定是否跟屏幕尺寸有关），但我感觉绰绰有余了，多了显示也拥挤（毕竟我不是时间管理大师 🙃）。

![](https://cos.codec.wang/arc-browser-split-view.jpg)

每一栏都可以调整大小或者点击右上角弹出。分栏方式也有多种：

1. **拖动任意 tab 到内容区进行分栏**。这个操作我觉得是最自然最常用的
2. 鼠标浮动到浏览器右上角，然后点击分栏按钮
3. 使用快捷键 ^ + ↑ + =
4. 使用 New Tab 中心，输入关键字 add 或 split

**Arc 可以将分栏后的标签组当作正常标签直接拖到 Pinned 区域，下次直接打开**，很强 👍。比如我把前面 GPT 对比的三个网页改名叫 GPT 对比，并且改了个图标：

![](https://cos.codec.wang/arc-browser-split-tabs-pinned.jpg)

### **Little Arc**

这个是我个人觉得 Arc 让我的最舒服的一个功能，因为它经常被用到。

### Easel & Note

Easel 是 Arc 自带的类似白板的功能，Note 是笔记功能呢。我其实比较反感浏览器加这些非本职工作的功能，并且它的使用和协同都只限 Arc 浏览器。另外这两个功能我都有更好更通用的工具，笔记我用的是 Notion，白板用的 Miro，所以我个人是没咋用这两个，这里大致体验下：

![](https://cos.codec.wang/arc-browser-easel.jpg)

可以点击快捷栏的加号或者控制中心就可以新建一个 Easel/Note，它也具备协同功能，但对方必须也是 Arc 浏览器。同样滑动到最左侧可以看到所有的 Easels & Notes。

![](https://cos.codec.wang/arc-browser-note.jpg)

### 截图

鼠标浮动到地址栏会有个截图按钮，也可以按快捷键截图，但这些都很普通，没什么好讲的。Arc 有个更快捷的方式，任何时候，**只要按住 ⌘ + ↑ 然后在网页中拖动鼠标就可以截图**，虽然我个人是用系统级别的 iShot 截图，但这个体验确实不错。截图可以选择保存/编辑等常规操作。

这里有个有趣的点，如果将截图存到 Arc 自带的 Easel 中，那么这个图是”活“的，简单来说就是保留了原始的网页 link 信息：

![](https://cos.codec.wang/arc-browser-screenshot.jpg)

### 拓展插件

这个没啥好说的，基于 Chromium 大部分插件都可以使用，后面程序员章节我会安装几个常用的开发插件测试。Arc 有个插件快捷入口，在浏览器右上角也就是分栏按钮的下面。
