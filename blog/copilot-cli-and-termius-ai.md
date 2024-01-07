---
date: 2024-01-01
authors: arthur
image: https://cos.codec.wang/gh-copilot-explain.jpg
tags: [Copilot, AI, Termius, GitHub, "大模型"]
---

# AI 写指令？GitHub Copilot CLI VS Termius Autocomplete

2023 可谓是大模型 AI 爆火的一年，除了 ChatGPT 这类面向大众的大模型 AI 外，各行各业都在把握风口，比如笔记类的 Notion AI、办公类的 Office Copilot 等。面向开发者的不疑最出名的就是[GitHub Copilot](https://github.com/features/copilot)，它不仅有包含 Chat 形式的 IDE 插件，还在如 CLI、Code Review(Pull Request)、Docs 等开发的各个环节都有探索，大家可以在[GitHub Next](https://githubnext.com/)中找到相关的项目。前段时间 GitHub Copilot CLI 发布了 Beta 版本，本文就简单分享下它的使用体验、跟我平常在用的 Termius Autocomplete 的对比。

![](https://cos.codec.wang/gh-copilot-termius.gif)

## 前提条件

- [About billing for GitHub Copilot](https://docs.github.com/en/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot)

<!--truncate-->

GitHub Copilot 需要付费订阅，个人版本的话$10/月，$100/年，并不便宜 💔。一些公司会订阅企业版本，员工可免费使用，可自行留意下。

## 安装 Copilot CLI

首先安装 GitHub CLI，大家可以根据所用平台选择对应的安装方式：[Install GitHub CLI](https://github.com/cli/cli#installation)，以 Mac + homebrew 为例：

```bash
# Mac: install with homebrew
brew install gh
```

安装好之后需先关联你的 GitHub 账号来进行认证，然后以插件的形式安装 Copilot CLI：

```bash
# Authenticate with GitHub account
gh auth login

# Install Copilot CLI
gh extension install github/gh-copilot

# Update Copilot CLI
gh extension upgrade gh-copilot
```

现在通过`gh copilot -h`验证是否安装完成并查看使用提示。

## 使用：解释 + 建议

目前 Copilot CLI 有两个功能，解释指令`explain`和将自然语言转换为建议的指令`suggest`，比如：

```bash
gh copilot explain "tar -czvf filename.tar.gz filename"
```

![](https://cos.codec.wang/gh-copilot-explain.jpg)

可以看到它会详细解释命令整体和每个参数的用途，还是比较实用的，只不过目前暂不支持中文。自然语言转换为建议的指令是支持中文的，比如：

```bash
# 中文
gh copilot suggest "查看端口80是否被占用"

# 英文
gh copilot suggest "check whether port 80 is occupied"
```

![](https://cos.codec.wang/gh-copilot-suggest.jpg)

中英文都是可以得到`lsof -i :80`的建议，在给出建议后可以将指令复制到剪贴板。如果对给出的指令不满意的话，可以选择修订`Revise command`，这时候就跟 Chat 一样可以用自然语言继续补充描述：

![](https://cos.codec.wang/gh-copilot-suggest-revice.jpg)

Copilot CLI 的使用方式很直观，响应速度和准确率也很不错，唯一不太便利的地方在于交互：一来它的所有指令都需要通过`gh copilot suggest/explain`来触发，二来它使用的是传统的命令行交互形式，也就是说每次都需要一定的选择和步骤才能得到结果，下面结合 Termius 对比下大家会更清楚。

## Termius

[Termius](https://termius.com/)是一个跨平台的 SSH/SFTP 客户端和终端工具，手机端也有。它支持多端同步、代码片段、安全加密、团队协同等，颜值很高，只不过大部分功能都需付费 😀，免费版个人觉得没有用的必要（学生可以免费使用 Termius 高级版本）。

![](https://assets-global.website-files.com/5c7036349b5477bf13f828cf/63740534a0506693ddd927b6_Macbook%20Pro%20Hero-min.png)

Termius Autocomplete 是**将终端输入的自然语言文本直接转换为指令的 AI 功能**。目前也是 Beta 版本，默认是关闭的，可以在 Settings - Terminal - Autocomplete 中打开。

![](https://cos.codec.wang/gh-copilot-termius.gif)

相比 GitHub 虽然没有主动进行命令解释的功能，但就`suggest`功能而言，明显更加顺手，不需要去想指令，也不需要额外的交互步骤，只需自然语言。总的来说，个人认为在 CLI 中进行自然语言转换指令或解释指令本身的需求量其实并不大。虽然两者的速度和准确率都很不错，但这类产品更应该考虑的是易用度，也就是能让用户想到且成本不高地在 CLI 中使用 AI，从这点看，自身就是终端工具的 Termius 明显更占优势，也有更多的发挥空间。**Anyway, the AI era has arrived!**

## 引用

- [About billing for GitHub Copilot](https://docs.github.com/en/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot)
- [Using GitHub Copilot in the CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli/using-github-copilot-in-the-cli)
