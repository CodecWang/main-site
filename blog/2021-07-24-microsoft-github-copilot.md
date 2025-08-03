---
slug: microsoft-github-copilot
title: AI 结对编程：Github Copilot 探索实践
authors: [arthur]
tags: [Copilot, AI, GPT]
---

- [官网](https://copilot.github.com/)
- [Introducing GitHub Copilot: your AI pair programmer](https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/)
- [The Truth about Github Copilot // AI Programming First Look](https://www.youtube.com/watch?v=4duqI8WyfqE&ab_channel=Fireship)

最近，Github 联手 OpenAI 发布了 AI 编程神器[Github Copilot](https://copilot.github.com/)预览版。它基于 GPT-3 自回归语言模型，我们只需要编写一个好的函数名或注释，它就会自动编写好细节代码。**这并非简单的智能提示或代码片段，而是真正的代码逻辑！**

比如你要编写一个从 URL 中获取查询参数的方法，通常我们就面向 Google 和 StackOverflow 编程了，而现在，你只需要写个好的函数名即可：

![](https://cos.codec.wang/copilot-overview.png)

<!--truncate-->

## 注册申请

Copilot 预览版暂未公开使用，需[提交申请](https://github.com/features/copilot/signup)，使用 Github 账号登录。审核会参考你 Github 的仓库和活跃度等因素，我在 7.15 下午申请，7.17 早上申请通过。预览版在 Python/JavaScript/TypeScript/Ruby/Go 几门语言下的表现最好，官网展示了很多例子，大家可以去参考，本文以 JavaScript 为例。

![](https://cos.codec.wang/copilot-join-copilot.png)

审核通过会发送两份邮件。一份是使用指引，点击`Install Github Copilot`会跳转到 VSCode 的插件下载地址。另一份是邀请你对`github/copilot-preview`仓库进行协同共建，感兴趣可加入。

## 上手体验

首先按照指引，安装 VSCode 插件[github.copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)，然后登陆 Github 账号就可以激活使用了。

![](https://cos.codec.wang/copilot-vs-plugin.png)

从官网的描述看，目前 Copilot 提供的特色功能有：强大的代码智能补齐、将注释转换为完整的代码逻辑块、自动填充重复代码、自动编写单元测试等。

### AI 写代码

假设现在界面上有个 id 为 my-button 的按钮，点击按钮，计算两个两个日期间隔的天数并打印。代码逻辑就是：编辑 index.js，获取 id 为 my-button 的按钮，然后添加 Click 事件。

首先我们尝试用写注释的方式生成代码。Copilot 不仅支持英文注释，也支持中文注释：

![](https://cos.codec.wang/copilot-func-01.gif)

而当你继续输入时，AI 会推测出你接下来可能是要添加 Click 事件：

![](https://cos.codec.wang/copilot-func-02.gif)

我们先定义一个计算两个日期间隔天数的方法 countDaysBetweenDates，这次我们不写注释，而是直接写函数名：

![](https://cos.codec.wang/copilot-func-03.gif)

如果对生成的代码不满意，将鼠标悬浮在智能提示处，可以切换选择不同的算法方案：

![](https://cos.codec.wang/copilot-alternative-algorithm.png)

也可以点击 Open Copilot，这样会并排显示 Copilot 所有的可选方案，点击 Accept Solution 就应用到了实际代码中：

![](https://cos.codec.wang/copilot-func-04.gif)

以上就是 Copilot 的核心功能：AI 代码生成。实际体验中，AI 的速度普遍都非常快，偶尔会卡顿一下，但基本都是秒级的响应速度。

### 自动生成单元测试用例

countDaysBetweenDates 方法写完后，我们可以给它编写单元测试用例。这里我没有写任何注释，是 Copilot 自动生成的单测用例：

![](https://cos.codec.wang/copilot-auto-test-01.png)

也可以先编写描述性的注释，然后根据注释自动生成：

![](https://cos.codec.wang/copilot-auto-test-02.png)

官网还有个测试 React 计数组件 Counter 的例子，我把英文注释改成了中文注释，同样是可以的：

![](https://cos.codec.wang/copilot-auto-test-03.png)

### "重复代码"自动填充

这里的"重复代码"更多的是指 Copilot 识别出了你正在编写的某种算法模式，然后预判你接下来的动作。如官网的例子，在 time.js 中编写日期之间的对应关系：

![](https://cos.codec.wang/copilot-func-05.gif)

再比如编写一个标识各语言注释的变量：

![](https://cos.codec.wang/copilot-auto-fill-code.png)

## 安全性和版权

Github Copilot 是基于数亿级别的开源代码进行 AI 训练，将本地代码的上下文信息发送至其服务器，一方面我们的代码是否也会被作为训练样本，另一方面如此庞大的代码量是否存在版权纠纷问题，目前均尚未可知。

实际体验下来，Copilot 绝对给了我非常大的惊喜，没想到完成度会如此高。个人认为在现有的工作流中引入 Copilot 是完全可以的，不过建议在个人的项目中尝试体验，在公司项目或敏感项目上使用时，需结合公司安全规范再考虑使用。
