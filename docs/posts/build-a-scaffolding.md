# 脚手架CLI工具

- Author: CodecWang
- date: 2020/09/07

![](https://www.google.com/url?sa=i&url=http%3A%2F%2Fvasco.com.my%2F&psig=AOvVaw3xuNg0Tnb_tpPOQLut6dKY&ust=1599654427270000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOCxraTH2esCFQAAAAAdAAAAABAJ)

## 引用

- [维基百科: 脚手架](https://en.wikipedia.org/wiki/Scaffold_(programming))

## 概念

[脚手架](https://baike.baidu.com/item/%E8%84%9A%E6%89%8B%E6%9E%B6)(Scaffolding)本身是个建筑行业的术语，它是为了保证施工顺利进行而搭建的基础工作平台，工人们借助它便可以省时省工地开展作业。同样，在编程中，脚手架会帮助开发人员生成项目的基础代码，甚至借助它来完成一些自动化工作。

因为同类项目往往具有相同的项目结构，比如React前端项目，那基本都有`package.json`、`index.html`、`App.js`等文件，都会`npm i react`…。为了避免重复工作，就需要脚手架帮我们自动完成。比如`create-react-app`可以快速生成基于React的单页应用。`Vue Cli`除了生成项目代码外，还有启动web服务器`vue serve`和构建`vue build`等功能。

- CLI: Command line interface命令行界面
- GUI: Graphical user interface图像用户界面

大部分脚手架工具是通过CLI来使用的，对开发人员比较友好，也有些图像界面，比如[vue-ui](https://cli.vuejs.org/zh/guide/creating-a-project.html#%E4%BD%BF%E7%94%A8%E5%9B%BE%E5%BD%A2%E5%8C%96%E7%95%8C%E9%9D%A2)，在网页上点两下便可以生成一个完整项目。总之，**具备代码生成和项目生成技术的都可称为脚手架。**

## 工作流程

当然，实际业务比较复杂，往往需要定制自己的脚手架。脚手架包含的功能差别也比较大，但大致流程是相同的：

![]()

后面我们会用Node.js一步步搭建，上图中的每个功能都会用一个Node的内置模块或第三方模块实现。比如读取