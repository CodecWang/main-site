---
date: 2023-04-05
authors: codec
image: https://cos.codec.wang/undefinedcopilot-chat-main-ui.jpg
tags: [Copilot, Github, ChatGPT]
---

# Github Copilot Chat 模式体验

今天更新 VSCode 的时候在更新日志中看到了 Github Copilot，最近 ChatGPT 这么火爆，Copilot 也是跟进了 Chat 模式啊，这还不得马上体验体验...

![](https://cos.codec.wang/undefinedcopilot-chat-vscode-changelog.jpg)

目前还处于 beta 版，使用起来有几个条件：

<!--truncate-->

1. 有 Chat 模式的权限，没有可以先加入候补：[GitHub Copilot chat waitlist](https://github.com/github-copilot/chat_waitlist_signup/join)
2. 使用 [VSCode Insiders](https://code.visualstudio.com/insiders/?utm_source=VsCode&utm_medium=ReleaseNotes&utm_content=1) 版本
3. 安装 [GitHub Copilot Nightly](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-nightly) 插件

> Insiders 和 Nightly 都是日常构建的体验版本，并不适合生产环境哈！

准备就绪后，VSCode 的侧边栏会多出一个对话图标，打开就是 Copilot 的 Chat 模式了。界面很简洁，聊天框内可以输入普通的文本，也可以用`/`来触发特定的指令，有对话内容后，聊天框上方还会显示一条推荐问题：

![](https://cos.codec.wang/undefinedcopilot-chat-main-ui.jpg)

## 非技术类问题

首先是可以把它当作简化版的 ChatGPT 来使用的。默认回答是英文，你可以直接让它用中文回复。但你问一些它答不上来或者非技术相关的问题时，它会拒绝回答，或者虽然回答但会提示说：“我作为一个编程助手，xxx”（翻译：老子不是干这个的...🙃）

![](https://cos.codec.wang/undefinedcopilot-chat-test.jpg)

我目前测试下来，一些常识类或者数理逻辑的问题它是可以回答的，创作类的就不行了。接下来我们还是看看它的强项：编程助手。

## 编程类问题

在聊天框内输入`/`，目前可以针对你**当前鼠标的位置/选择的代码/当前文件或项目**做到：

- `/explain` 解释代码逻辑
- `/fix` 修复问题
- `/simplify` 简化代码
- `/tests` 编写单元测试

![](https://cos.codec.wang/undefinedcopilot-chat-slash-topics.jpg)

当然`/`这些指令是帮助你使用它，**实际可以不用输**。比如我在 [LeetCode](https://leetcode.cn/problems/generate-parentheses/) 上随便找了道题，先让它帮我把代码写出来。生成的代码可以复制或者直接插入到编辑器中鼠标所在的位置：

![](https://cos.codec.wang/undefinedcopilot-chat-result-insert.jpg)

这时候输入`一步步解释代码`或者`/explain`，它会开始解释这个函数。以后再也没有看不懂的代码了 🙃..

![](https://cos.codec.wang/undefinedcopilot-chat-explain.jpg)

编写单元测试、修复和简化代码都是类似的，就不演示了。它还提供了一些辅助类的指令：`/clear` 清除对话/开启新对话，`/vscode` VSCode 的相关帮助，`/help` Copilot 的相关帮助，比如：

![](https://cos.codec.wang/undefinedcopilot-chat-vscode-minimap.jpg)

## Chat 模式的意义

这里谈下跟原来的 Copilot 的区别，我的理解是之前的 Copilot 是在限定场景下的被动式触发，比如当你输入了信息后，不论是代码还是注释，Copilot 会根据上下文自动生成接下来的文字，可以参考我之前写的体验：[AI 结对编程：Microsoft Github Copilot 探索实践](https://codec.wang/blog/microsoft-github-copilot)

![](https://cos.codec.wang/copilot-func-03.gif)

Chat 模式加成的 Copilot 首先毋庸置疑功能肯定是更强大，但最关键的是用户掌握了所有权，整个交互流程也更自然。比如通常我们遇到开发问题，**它是一个可以用自然语言描述的问题**，比如“这段代码怎么优化下？“、”我这里需要一个方法，实现从 URL 中提取参数？”。新版的 Copilot 就比较符合我们解决问题的流程，**开发者主动定位代码 -> 提出问题 -> 解决问题**。当然原来 Copilot 的所有功能新版都有保留。

实话说，这普通程序猿是真的“危”，不过这个趋势必然是这样的，不可挡啊。当下考虑怎么把这类产品当作一个好的工具，然后给自己带来更多的价值我觉得更实际一些。
