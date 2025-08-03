---
slug: mono-repo-in-js
title: 大仓实践录：Lerna/NPM/Yarn Workspace 方案组合和性能对比
authors: [arthur]
tags: [mono-repo, "大仓", Lerna]
---

## 单仓和大仓

仓就是仓库（repository，简称 repo）。通常我们使用多个仓库（简称多仓，multi-repo）来管理项目代码，也就是每个仓库负责一个模块或包的编码、构建、测试和发布，代码规模相对较小，所以也称为小型规模仓库（简称小仓）。而单一（mono）仓库（简称单仓，mono-repo）是指在一个仓库中管理多个模块或包，当代码规模达到一定程度后可称为大型规模仓库（简称大仓），至于这个程度大小并没有明确定义，通常说的大仓可理解为就是单仓。

我们以一个通常的 Node JS 项目为例，简要说明这几种仓库管理方式，如下图：

![](https://cos.codec.wang/monolith-multi-repo-mono-repo.jpg)

<!--truncate-->

> 为便于理解，这里我从软件架构层面引出大仓，但其实仓库管理方式和软件架构并没有直接关系，大仓也并非“银弹”，本文重点在 JS 生态的实践。

当业务系统不复杂时，通常只用一个仓库管理项目，项目为单体架构（Monolithic），依赖和工作流都是统一的。随着业务复杂度的提升，项目的复杂性会巨幅增长，由此导致了一系列问题：比如技术债务越积越多、部署效率/频率低、扩展受限等等。此时就需要业务和模块的拆分，比如从软件架构层面提出了微服务架构（Microservices），而在代码管理上通常会使用多个仓库，每个仓库都独立进行各模块的编码、测试和发版等。这种方式虽然在业务逻辑上解耦了，但却增加了项目的工程管理难度，比如：

1. 代码和配置很难共享：每个仓库都需要做一些重复的工程化能力配置（如 eslint/test/ci 等）且无法统一维护
2. 依赖治理复杂：

- 假设有多个工程依赖 lib，每个工程都会重复安装 lib
- lib 升级时，所有工程需各自升级，这点很难做到，往往各工程的依赖版本并不一致，由此经常引发一些调试和维护问题
- 多个工程间互相依赖且同时开发时调试相对困难，如 pkgA 依赖 pkgB，通常需要手动 link pkgB

大仓管理正好解决了这些问题：所有包的依赖统一交由顶层 node_modules，具备统一的工作流，共享基础的库和工程化配置等。

## 大仓能力和工具链

为了更好地实现大仓管理，需要配合使用相关的工具。大仓管理工具应该至少具备以下两大能力：

1. **依赖管理**：可管理所有 package 的依赖和彼此之间的关联，并将安装的依赖提升到顶层 node_modules
2. **更精准的执行和发布控制**：能够进行独立或统一的测试、构建和精准发布等

如果没有这两个能力，那大仓就相当于把各个项目用一个目录管理了起来，并没有什么实际用处。在 Node 生态中，主要有 NPM/Yarn 两种包管理器，两者都可以通过开启 Workspace 特性来支持能力 1 并对能力 2 提供部分支持。[Lerna](https://github.com/lerna/lerna) 和 [Bolt](https://github.com/boltpkg/bolt) 等工具对能力 2 的支持较好，综合两者在 Github 的活跃度和用量，本文选择 Lerna（主要是 Bolt 我也没用过 🙃）。使用 Lerna 的开源项目有：[jest](https://github.com/facebook/jest)、[create-react-app](https://github.com/facebook/create-react-app)、[webpack-cli](https://github.com/webpack/webpack-cli)...最后，总的方案有以下几种：

- 方案 1：Lerna(NPM)
- 方案 2：Lerna(Yarn)
- 方案 3：Yarn Workspace
- 方案 4：NPM Workspace
- 方案 5：Lerna + NPM/Yarn Workspace

## 方案对比

### 运行和测试环境

后面性能对比部分我们主要看下依赖的安装耗时，首先说明下测试条件：

- 版本号：lerna@4.0.0、npm@8.1.2、yarn@1.22.17
- 系统：DevCloud 开发容器 tlinux-2.2、CPU：8 核（型号未知）、RAM/ROM：16G/200G
- 每次测试前均删除 node_modules、package-lock.json、yarn.lock，使用`npm cache clean --force`和`yarn clean`清空缓存
- 使用 [gnomon](https://www.npmjs.com/package/gnomon) 统计时间，如：`lerna bootstrap | gnomon`，每个方案测试三次

### Lerna + NPM

使用`lerna init`快速创建一个 Lerna 工程：

```bash
mkdir mono-repo && cd $_
lerna init
```

接下来用`lerna create`在 packages 下面添加两个包：

```bash
lerna create pkgA -y
lerna create pkgB -y
```

Lerna 并不会初始化 git 仓库信息，所以需要执行`git init`，并添加一个 .gitignore 文件，将 node_modules 忽略，目录结构如下：

```bash
mono-repo
├── .gitignore
├── lerna.json
├── package.json
└── packages
    ├── pkgA
    │   └── package.json
    └── pkgB
        └── package.json
```

接下来我们来看下 Lerna 在大仓上的能力体现。

- 依赖初始化和提升：`lerna bootstrap`

该命令会执行类似`npm install`的功能，不过 Lerna 会一次性安装所有包的所有依赖，默认将依赖安装在各个包的 node_modules 下，并不会将共同的依赖提升到顶层 node_modules，可以通过添加`--hoist`来做到：`lerna bootstrap --hoist`。

![](https://cos.codec.wang/lerna-hoist.jpg)

每次都加上`—-hoist`会比较麻烦，可以配置 lerna.json 的 bootstrap 选项默认执行提升：

```json
{
  "packages": ["packages/*"],
  "command": {
    "bootstrap": {
      "hoist": true
    }
  },
  "version": "0.0.1"
}
```

**Lerna 判断版本号的字符串一模一样时才认为是同样的依赖，并不是特别的智能**（后面介绍的 Yarn Workspace 是根据语义版本判断，无此问题）。比如 pkgA 依赖的 lodash 是 4.17.21，pkgB 依赖的是 ^4.17.21，lerna 认为这是两个版本，所以仍然会保留 pkgB 的 node_modules 和 package-lock.json...

![](https://cos.codec.wang/lerna-hoist-version-judge.jpg)

- 安装依赖

如果切换到某个包下，用`npm install xxx`安装依赖，则会安装在当前目录的 node_module 下，大仓的依赖管理能力会失效。Lerna 提供了 add 指令：

```bash
# 给所有包安装 xxx 依赖
lerna add xxx
# 给 pkgA 包安装 xxx 依赖
lerna add xxx --scope=pkgA
```

安装时也支持添加参数`-D`(—dev devDependencies 开发依赖) 和`-E`(—exact 精确版本)。**但 Lerna 的 add 命令每次只能安装一个依赖，不能像 npm install 和 yarn add 一次可装多个依赖**。

- 移除依赖

Lerna 并未提供相关的指令，只能手动编辑该包的 package.json，手动移除对应的依赖项，最后再运行`lerna bootstrap`指令更新依赖。

其他的一些指令大家可自行体验，如：`lerna clean`：删除所有包的 node_modules、`lerna list`：列出所有的包。

以上三项：依赖初始化和提升、安装依赖、移除依赖是大仓依赖管理的基本能力，Lerna 做到了不同程度的支持。Lerna 也提供了一些高级能力：

- 统一/全局执行包的 scripts 脚本：

`lerna run <script> -- [..args]`

```bash
# 执行所有包的测试指令
lerna run test
# 执行所有包的构建指令
lerna run build
# 执行 pkgA 包的 xxx 指令
lerna run xxx --scope=pkgA
```

- 在各个包下执行统一的命令：

`lerna exec -- <command> [..args]`

比如在各个包下执行`rm -rf dist/`来删除各个包下的 dist 目录：

```bash
# 在所有包下执行 rm -rf dist/
lerna exec -- rm -rf dist/
# 在 pkgA 下执行 rm -rf dist/
lerna exec -- rm -rf dist --scope=pkgA
```

- 统一的发布：`lerna publish`

Lerna 支持两种版本发布模式，默认为固定模式，也就是所有包的版本号会跟随 lerna.json - version 字段中定义的版本号。将 version 的值更改为 independent 后，就变成了独立模式，此时对于变更的包，Lerna 会让开发者决定每个包是语义版本中的哪种变更：patch、minor 还是 major。

![](https://cos.codec.wang/publish-version.jpg)

```json
{
  "packages": ["packages/*"],
  // "version": "0.0.1"
  "version": "independent" // 独立模式
}
```

另外通常发布还伴随着 changelog 生成、添加发布 commit、创建发布 tag 等操作，这些都可以通过 lerna.json 精细控制。比如设置发布源和发布时的 git 提交信息：

```json
{
  "version": "0.0.1",
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"],
      "message": "chore(release): publish",
      "registry": "https://mirrors.tencent.com/npm/"
    }
  },
  "packages": ["packages/*"]
}
```

| 命令            | 第一次   | 第二次   | 第三次   |
| :-------------- | :------- | :------- | :------- |
| lerna bootstrap | 65.6626s | 61.8620s | 62.9221s |

### Lerna + Yarn

这种方案其实并不能实现，因为在 lerna.json 中将 npmClient 字段设置为 yarn 后：

```json
{
  "packages": ["packages/*"],
  "command": {
    "bootstrap": {
      "hoist": true
    }
  },
  "version": "0.0.1",
  "npmClient": "yarn"
}
```

运行`lerna bootstrap`会与 Yarn 冲突，提示是直接使用 Yarn Workspace：

```bash
➜  lerna bootstrap
lerna notice cli v4.0.0
lerna ERR! EWORKSPACES --hoist is not supported with --npm-client=yarn, use yarn workspaces instead
lerna ERR! EWORKSPACES A guide is available at https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/
```

### Lerna + Yarn Workspace

首先配置 Lerna 使用 Yarn 并启用 workspaces：

```bash
{
  "npmClient": "yarn",
  "useWorkspaces": "true",
}
```

然后在根目录的 package.json 中配置 workspaces，此时 lerna.json 中的 packages 设置会失效：

```bash
{
  "name": "root",
  "workspaces": [
    "packages/*"
  ],
}
```

这样就相当于依赖管理全部交由 Yarn 来管理了：

- 依赖初始化和提升：`yarn`
- 安装依赖，比如给 pkgA 安装依赖：`yarn workspace pkgA add xxx`。不同于`lerna add`，Yarn 就是正常的包管理器，可以一次装多个依赖
- 移除依赖，比如移除 pkgA 包的 xxx 依赖`yarn workspace pkgA remove xxx`

Yarn Workspace 也提供了一些全局和统一的执行能力，比如：

```bash
# 执行 pkgA 的 scripts 脚本命令
yarn workspace pkgA test
yarn workspace pkgA build
yarn workspace pkgA publish
yarn workspace pkgA xxx
```

```bash
# 执行所有包的测试指令
yarn workspaces run test
# 执行所有包的 xxx 指令（package.json - scripts）
yarn workspaces run xxx
```

可以看到，**Yarn 无法直接做到`lerna publish`/lerna.json 的更精准控制能力**。

| 命令 | 第一次   | 第二次   | 第三次   |
| :--- | :------- | :------- | :------- |
| yarn | 51.9236s | 59.0584s | 58.1938s |

### Lerna + NPM Workspace

NPM 在 7.x 及以上版本中也支持了 Workspace 特性：[https://docs.npmjs.com/cli/v7/using-npm/workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)。能力与 Yarn Workspace 基本类似，只是语法不同，同样先更改 lerna.json 开启 workspaces：

```bash
{
  "useWorkspaces": "true",
}
```

然后在根目录的 package.json 中配置 workspaces：

```bash
{
  "name": "root",
  "workspaces": [
    "packages/*"
  ],
}
```

- 依赖初始化和提升：`npm install`
- 安装依赖，比如给 pkgA 安装依赖：`npm install xxx -w pkgA`
- 移除依赖，比如移除 pkgA 包的 xxx 依赖：`npm uninstall xxx -w pkgA`

同样 NPM Workspace 提供了一些统一和全局的执行能力：

```bash
# 执行 pkgA 的 scripts 脚本命令
npm run test -w a
npm run xxx -w a

# 执行全部包的 scripts 脚本命令
npm run test --workspaces
```

| 命令        | 第一次   | 第二次   | 第三次   |
| :---------- | :------- | :------- | :------- |
| npm install | 72.9516s | 83.0750s | 86.5041s |

## 结论

| 命令                   | 能力                                      | Lerna(NPM)                                        | NPM Workspace                                               | Yarn Workspace                                                                                |
| :--------------------- | :---------------------------------------- | :------------------------------------------------ | :---------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| 依赖管理               | 依赖初始化和提升                          | `lerna bootstrap`                                 | `npm install`                                               | `yarn`                                                                                        |
|                        | 安装依赖                                  | `lerna add xxx --scope=pkg`                       | `npm install xxx -w pkg`                                    | `yarn workspace pkg add xxx`                                                                  |
|                        | 移除依赖                                  | 无                                                | `npm uninstall xxx -w pkg`                                  | `yarn workspace pkg remove xxx`                                                               |
| 更精准的执行和发布控制 | 全局执行 scipts 指令                      | `lerna run xxx --scope=pkg`                       | `npm run xxx -w pkg`                                        | `yarn workspace pkg run xxx`                                                                  |
|                        | 统一执行 scipts 指令                      | `lerna run xxx`                                   | `npm run xxx --ws`                                          | `yarn workspaces run xxx`                                                                     |
|                        | 在每个包下动态执行指令                    | `lerna exec -- command`                           | `npm exec -c 'command' --ws`                                | `yarn workspaces foreach command`（[需插件支持](https://yarnpkg.com/cli/workspaces/foreach)） |
|                        | 统一发布配置、changelog、tag 和 commit 等 | lerna.json/`lerna publish`                        | 无                                                          | 无                                                                                            |
| 依赖初始化耗时         | /                                         | 65.6626s、61.8620s、62.9221s                      | 72.9516s、83.0750s、86.5041s                                | 51.9236s、59.0584s、58.1938s                                                                  |
| 相对缺点               | /                                         | 1. 无法一次安装多个依赖<br/>2. 未提供依赖移除能力 | 1. 未提供更为精细的发布控制配置<br/>2. 依赖安装耗时相对较长 | 1. 未提供更为精细的发布控制配置<br/>2. 不原生支持在每个包下动态执行指令                       |

综上，只使用 Lerna 和只使用 Yarn/NPM Workspace 都能完成大部分大仓的管理能力，前者的依赖管理弱一些，后者的发布控制弱一些。从工作流的完整度上看，Lerna 会更全面，不过也有像[babel/babel](https://github.com/babel/babel/blob/main/doc/design/monorepo.md)这种只使用了 Yarn Workspace，然后再额外开发一些插件的用法。**当然日常最佳实践就是将两者结合，依赖管理/测试/构建等统一交由 Workspace 处理，发布统一用 Lerna。**至于 NPM 和 Yarn 的选择，就是另一个话题了，Yarn 稍快，但选择通常看个人风格，我会更加倾向于 NPM。至于大仓下的工程化能力搭建和最佳实践，我们下个话题见～

## 引用

- [Why Lerna and Yarn Workspaces is a Perfect Match for Building Mono-Repos](https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/)
