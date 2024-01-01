---
date: 2024-01-01
authors: arthur
image: https://cos.codec.wang/gh-copilot-explain.jpg
tags: [Copilot, AI, Termius, GitHub, "大模型"]
---

# 命令行中的 AI：Copilot CLI VS Termius Autocomplete

去年可谓是大模型 AI 爆火的一年，除了 ChatGPT 这类面向大众的大模型 AI 外，各行各业都在把握风口，比如笔记类的 Notion AI、办公类的 Office Copilot 等。面向开发者的不疑最出名的就是 GitHub Copilot，它不仅有包含 Chat 形式的 IDE 插件，还在开发相关的其他很多领域如 CLI、Code Review(Pull Request)、Docs 等都有探索，大家可以在[GitHub Next](https://githubnext.com/)找到相关的项目。前端时间 Copilot CLI 发布了 Beta 版本，本文就分享下它的使用体验还有和我平常在用的 Termius Autocomplete 的对比。

## 前提条件

- [About billing for GitHub Copilot](https://docs.github.com/en/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot)

GitHub Copilot 需要付费订阅，个人版本的话$10/月，$100/年，并不便宜。很多公司会订阅企业版本，员工可免费使用，大家可以留意下。

## 安装 Copilot CLI

首先需要安装 GitHub CLI，不同平台的安装方式不尽相同，具体可参考[Install GitHub CLI](https://github.com/cli/cli#installation)。以 Mac 为例：

```bash
# Mac: install with homebrew
brew install gh
```

安装好之后需要使用`gh auth login`先关联你的 GitHub 账号，然后以插件的形式安装 Copilot CLI：

```bash
# Install Copilot CLI
gh extension install github/gh-copilot

# Update Copilot CLI
gh extension upgrade gh-copilot
```

现在通过`gh copilot -h`就可以查看使用方法。

## 使用：解释 + 建议

目前 Copilot CLI 有两个功能，解释指令`explain`和将自然语言转换为建议指令`suggest`。比如：

```bash
gh copilot explain "tar -czvf filename.tar.gz filename"
```

![](https://cos.codec.wang/gh-copilot-explain.jpg)

可以看到它会详细解释命令整体和每个参数的用途，还是比较实用的，只不过目前解释是不支持中文的。建议`suggest`是支持中文的，比如：

```bash
# 中文
gh copilot suggest "查看端口80是否被占用"

# 英文
gh copilot suggest "check whether port 80 is occupied"
```

![](https://cos.codec.wang/gh-copilot-suggest.jpg)

中英文都是可以得到`lsof -i :80`的建议，在给出建议后可以将指令复制到剪贴板。如果对给出的命令不满意的话，可以选择修订`Revise command`，这时候就跟 Chat 一样可以用自然语言继续补充描述。

> `gh copilot SUBCOMMAND`后面的引号我实测可以不用加！

使用方式很直观，响应速度和准确率也都很不错，唯一不太便利的地方在于交互形式，下面结合 Termius 对比下。

## Termius

[Termius](https://termius.com/)是一个跨平台的 SSH/SFTP 客户端和终端工具，甚至手机端也有。它支持多端同步、代码片段、安全加密、团队协同，颜值也很高，只不过大部分功能都需付费，免费版个人觉得没有用的必要。

![](https://assets-global.website-files.com/5c7036349b5477bf13f828cf/63740534a0506693ddd927b6_Macbook%20Pro%20Hero-min.png)

Termius Autocomplete 是将终端输入的自然语言文本直接转换为命令的 AI 功能。目前也是 Beta 版本，默认是关闭的，可以在 Settings - Terminal - Autocomplete 中打开。

![](https://cos.codec.wang/gh-copilot-termius.gif)

相比 GitHub 虽然没有主动进行代码解释的功能，但就`suggest`功能而言，个人觉得更加顺手，不需要去想指令，一切皆可“自然”语言，而 Copilot 所有指令都需要通过`gh copilot suggest/explain`来触发。总的来说，个人认为 CLI 中进行自然语言转换指令或解释指令本身的需求量其实并不大，虽然两者的速度和准确率都可以满足，但这类产品更应该考虑的是易用度，也就是能让用户更主动地使用 AI，这点两者都还是需要改进的！

## 引用

- [About billing for GitHub Copilot](https://docs.github.com/en/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot)
- [Using GitHub Copilot in the CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli/using-github-copilot-in-the-cli)
