---
date: 2023-04-23
authors: arthur
image: https://cos.codec.wang/arc-browser-cover.jpg
tags: [Arc, "浏览器", Arc Browser, Edge]
---

# "改变交互认知" 的 Arc 浏览器深度体验，适合程序猿吗？

Arc 浏览器，官方宣称语是：`we're building a better way to use the internet`，很多博主的文章和视频也经常以"改变了我的工作方式"、"改变了浏览器的交互"为标题。目前还是得先加入等待列表，通过后才可以使用，这让我一个纯情理工男 🙃 觉得有点营销过度啊。

之前我申请到了 Arc 的权限，最近一直当作主力浏览器浏览和开发调试，下面就分享下深度体验。会和 Edge 浏览器做对比，优缺点都会讲到，尤其是对开发人员是否适合等问题。

![](https://cos.codec.wang/arc-browser-cover.jpg)

<!--truncate-->

## 安装

目前只支持 MacOS/IOS 设备：前往[官网](https://thebrowser.company/)填写邮箱后进入候补列表，之后等待通知就行。也可以通过邀请链接获取访问权限，已申请通过的会有 5 个赠送名额（有需要的可以 [EMail](mailto:codecwang@outlook.com)）。

第一次打开先进行简单的配置，比如登录、从其他浏览器导入数据、设置主题等，**Arc 浏览器必须登录才能使用**。y1s1，这这好看是真滴好看，操作也很流畅。

![](https://cos.codec.wang/arc-browser-setup.jpg)

## 界面和交互

![](https://cos.codec.wang/arc-browser-main-ui.jpg)

整体主界面如上图。右侧是网页内容区域，被 Arc 主体边框包裹，浏览器其他元素基本都在左边侧边栏。侧边栏可以调整大小、隐藏和显示（⌘ + S），从上到下依次是：

- 地址栏
- Favorites
- Pinned tabs
- Today tabs
- 快捷操作栏（媒体中心 - 空间 - New）

这里有几个 Arc 的新概念，其实或多或少在其他浏览器里见过，比如垂直标签页和标签页分组，Edge 浏览器都有。刚好今天更新 Windows Edge，我靠，网页内容区域也变成了圆角矩形，啊这...

![](https://cos.codec.wang/arc-browser-edge-round-corner.jpg)

### 空间 Space

Arc 的管理核心是空间 Space，在快捷操作栏中间的三个图标就是我创建的三个空间：开发、日常和创作。左右滑动可以切换空间，滑至最左侧就可以看到所有空间：

![](https://cos.codec.wang/arc-browser-workspaces.gif)

空间可以自定义图标/名称/深浅渐变主题等，每个空间可以有不同的主题，切换很丝滑：

![](https://cos.codec.wang/arc-browser-customize-space.jpg)

空间可以指定 Profile，**Profile 拥有独立的历史记录、密钥信息、浏览器插件等**，这个对工作/个人分开的场景非常实用。大家如果用过 VSCode Profile 的话，两者很类似。另外 **Arc 对快捷键支持非常好**，很多操作都会直接或间接将快捷指令显示在旁边，如果熟练掌握的话效率会很高。

![](https://cos.codec.wang/arc-browser-workspace-profile.jpg)

### 收藏 Favorites

Arc 的 Favorites 会以图标固定显示在地址栏下方，它不属于空间，所以空间切换时它不会变。其实 这个收藏并不像传统浏览器的收藏，更像是固定几个极其常用的网页。个人推荐保持一行，不然占用空间太大，比如我固定了四个：Google、ChatGPT、Phind AI 搜索、YouTube。

![](https://cos.codec.wang/arc-browser-favorites.jpg)

### 标签 Tabs

Tabs 归属于空间，空间切换时它也会跟着切换。Tabs 分为上面的 Pinned tabs 和下面的 Today tabs。

- Pinned tabs：类似传统浏览器的收藏夹，可以分目录/子目录管理，不会随时间清除掉
- Today tabs：日常浏览打开的标签页。标签页不活动的话，**Arc 默认会每 12 小时清除掉**，这个时间可以自行设置。Arc 管这一操作叫归档，归档后想要查看或恢复的话，可以滑至最左侧，其实它就是历史记录

![](https://cos.codec.wang/arc-browser-tabs.jpg)

这里有个挺有意思的功能，打开目录选项，按下 option(⌥) 键可以将链接复制为 Markdown 格式：

![](https://cos.codec.wang/arc-browser-copy-as-markdown.jpg)

Arc 对拖拽支持也很好，可以将 tab 在 Favorites、Pinned 和 Today 间任意拖动转换。

### 控制中心 New Tab

当点击地址栏或者按下 ⌘ + T 都会打开 Command bar，在这里不仅可以直接搜索内容，还可以调用 Arc、网络上的各种指令等，很强大。下面是我常用到的几个场景：

![](https://cos.codec.wang/arc-browser-new-tab-control-center.jpg)

- 搜索并跳转任意 tabs
- 搜索内容或直接输入 URL
- 触发 Arc 集成的网页快捷指令，比如以`new`、`add`等词开头
- 在特定搜索引擎搜索，比如 bing、baidu 等。当然它是基于 Chromium，所以可以在设置中自定义网站搜索。Arc 在某些场景下也会自动识别并询问你是否添加，**比如我最常用的是 github 和 npm**：

![](https://cos.codec.wang/arc-browser-search-engine.jpg)

### **分栏 Split**

**Arc 支持左右和上下分栏**，同时只能生效一个。这是个非常实用的功能，我们经常需要两个或多个网页对照，之前需要把标签页拖出来一个新窗口，分栏就不用了。我试了下最多分 4 栏（不确定是否跟屏幕尺寸有关），但绰绰有余了，多了显示也拥挤（毕竟我不是时间管理大师 🙃）。

![](https://cos.codec.wang/arc-browser-split-view.jpg)

每一栏都可以调整大小或者点击右上角分栏选项弹出。有多种分栏方式：

1. **拖动任意 tab 到内容区进行分栏**，这个操作是最自然最常用的
2. 鼠标浮动到浏览器右上角，然后点击分栏按钮
3. 使用快捷键 ^ + ↑ + =
4. 打开控制中心，输入关键字 add 或 split

**Arc 可以将分栏后的标签组当作正常标签直接拖到 Pinned 区域，下次直接打开**，很强 👍。比如我把前面 GPT 相关的三个网页改名叫 GPT 对比，并且改了个图标：

![](https://cos.codec.wang/arc-browser-split-tabs-pinned.jpg)

### **预览 Little Arc**

这个是我经常用到也是用的最舒服的一个功能。如果大家用过 MacOS 的按空格预览功能，就知道很多时候我们只想预览文件，并不想打开它。同理，对别人分享过来的链接或者网页上的链接，我们大概率只是想预览下，并不想让它成为一个 tab。成为 tab 意味着你需要手动关闭它，浏览器开一堆标签页的痛点应该很多人都有吧 🙃。

比如我点击我的笔记或微信里的链接，它并不会在浏览器开一个页签打开，而是像下面这样打开一个 Little 版。如果想继续浏览，可以点击右上角在特定的工作空间打开，如果不想叉掉即可。

![](https://cos.codec.wang/arc-browser-little-arc.jpg)

**如果将网页固定到 Arc 的 Favorites 和 Pinned tabs，那么打开网页链接就会自动先预览**，这对我来我非常实用。比如在 Google 搜索内容就可以随时打开预览：

![](https://cos.codec.wang/arc-browser-preview.gif)

### **Boost**

点击快捷操作栏的 +，会有一个 New Boost 的选项，可以理解为提取网页或给网页注入 JS 脚本或 CSS 样式表，达到修改网页的目的，类似[油猴脚本](https://www.tampermonkey.net/index.php?browser=chrome&locale=zh)。官方也有脚本库供大家使用：https://arcboosts.com/boosts

![](https://cos.codec.wang/arc-browser-boost.jpg)

比如这里我使用一个[YouTube 自适应 Arc 主题的脚本](https://arcboosts.com/boosts/122/arcify-youtube)。复制脚本内容，新建一个 Inject 脚本，然后指定 YouTube 的网站地址即可。现在切换空间时，YouTube 的主题也会跟着变。如果想移除的话，它跟扩展在一个地方：

![](https://cos.codec.wang/arc-browser-boost-sample.jpg)

### Easel & Note

Easel 是 Arc 自带的类似白板的功能，Note 是笔记功能，使用和协同都只限 Arc 浏览器。我其实比较反感浏览器加这些非本职工作的功能，就像 Edge 浏览器老是加一些自以为很好但用户反馈很差的功能，也算是微软产品一贯作风了。另外这两个功能我都有更好更通用的工具，笔记我用的是[Notion](https://www.notion.so/)，白板用的[Miro](https://miro.com/)，所以就没咋使用。

![](https://cos.codec.wang/arc-browser-easel.jpg)

可以点击快捷栏的加号或者控制中心就可以新建一个 Easel/Note，同样滑动到最左侧可以看到所有的 Easels & Notes。

![](https://cos.codec.wang/arc-browser-note.jpg)

### 截图

鼠标浮动到地址栏会有个截图按钮，也可以按快捷键截图，但这些都很普通，没什么好讲的。Arc 有个更快捷的方式，任何时候，**只要按住 ⌘ + ↑ 然后在网页中拖动鼠标就可以截图**，虽然我是用的是系统级的 iShot 截图。截图可以选择保存/编辑等常规操作。

这里有个有趣的点，如果将截图存到 Arc 自带的 Easel 中，那么这个图是”活“的，简单来说就是保留了原始的网页 link 信息：

![](https://cos.codec.wang/arc-browser-screenshot.jpg)

## 对开发人员

对前端开发人员，浏览器除了日常浏览外，还会用于调试，用到的功能主要是浏览器插件、开发者工具。Arc 有个插件快捷入口，在浏览器右上角也就是分栏按钮的下面。前面提到 Arc 是基于 Chromium，所以插件商店也是 chrome web store，开发者工具也是 Chrome DevTools。除一些特定插件外都通用，比如我最近常用的 React 调试工具和 Accessibility 检查插件：

![](https://cos.codec.wang/arc-browser-plugins.jpg)

开启网页服务时，比如 localhost:3000，**Arc 会在页面的最上方显示一个调试条，包含当前 url 和很多快捷指令**，这个功能虽小，但却很人性化。

![](https://cos.codec.wang/arc-browser-dev-bar.jpg)

从插件和开发者工具角度来看 Arc 其实跟 Chrome/Edge 没有差别。

## 资源占用

以下是我的测试基准：

```
Device: Mac
RAM: 16 GB
System: macOS Ventura 13.3.1
Arc version: 0.100.0
Edge version: 112.0.1722.58
场景1：同时打开 10 个标签页，查看资源占用
场景2：进行常见的浏览、笔记编辑、观看视频等操作，查看资源占用
```

将 CPU 和内存的占用过程录制视频，截取后取平均值。测试不是很严谨，仅供参考哈：Arc 和 Edge 的内存占用差不多，Edge 甚至要高出 Arc。当播放视频时两者都会变高，Arc 的幅度要高于 Edge。而 CPU 占用 Arc 比 Edge 通常情况高出 2%，播放视频大概高 4 ～ 6% 左右。下面是部分截图：

![](https://cos.codec.wang/arc-browser-cpu-ram.jpg)

## 是否选择？

从功能层面，不论对普通人还是对前端开发人员 Arc 没有任何问题，甚至 Arc 提供的很多小功能非常实用。其实从各种反馈来看，真正有争议的主要是下面三点，我谈谈个人看法：

1. 垂直标签且无法修改成水平标签

垂直标签或者说侧边栏的缺点显而易见，就是占用了太多的空间，尤其是在屏幕小的设备，比如笔记本上，网页内容会显的很局促。Edge 浏览器还好，因为 Edge 开启垂直标签页并且将标签页收缩后，会在侧边留有网页图标，还是比较容易识别的。Arc 就很干脆，隐藏侧边栏后就啥都没了，只有网页内容。

还有就是很多人并不习惯垂直标签，这点对我来说还行，个人感觉垂直标签更高效页更符合交互习惯。

![](https://cos.codec.wang/arc-browser-vertical-tabs.jpg)

2. 资源占用很高

就我目前的测试来看，Arc 确实会比 Edge 高一点但并不明显。由于手头没有更多的测试资源，也没找到比较全的 benchmark，后续有数据我会更新在这里。

3. 花里胡哨

这点对我来说完全是优点，在使用的这段时间里，它的 UI 美观，动画和交互自然且流畅。如果在相同功能且性能牺牲不大的情况下，我肯定会选择颜值高的。不过 Arc 自带的笔记和白板对我是减分项。

总结：已经很久没有让我眼前一亮或者用着很舒服的软件产品了。我目前用了一个月，Arc 基本没遇到让我糟心的点，反而是不断会发现一些小功让我会心一笑。虽然 Arc 并没有营销说的那么夸张，但它就像一个牛逼的设计师主导开发的产品，完全能在如今的浏览器市场上脱颖而出，即使不适合所有人，但我依然很喜欢。不过目前它的 IOS 移动端做的确实很差，对于有数据同步和移动端需求的用户并不友好。**所以如果你能习惯垂直标签且在大屏设备上使用，那我是强烈推荐去体验的，否则依然首推 Edge。**
