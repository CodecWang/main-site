# Polyfill和Shim

- Author: CodecWang
- date: 2020/08/30

![](http://cos.codec.wang/what-is-polyfill.jpg)

说实话，这两个术语名字取的，真的是让人难以一下子理解。理解了之后呢，又不得不佩服这取名：妙啊。

## 示例

比如你想在代码中判断一个数是不是整数，那么你可能会用JavaScript的`Number.isInteger()`

```javascript
Number.isInteger(9);      // true
Number.isInteger(4 / 3);  // false
```

你在Chrome开发者工具的console中运行，没问题，但在IE上却报错了：*对象不支持“isInteger”属性或方法*。这是因为IE并不支持这一特性（你可以通过[浏览器兼容性自查](/web/compatibility-check-for-web-api)来查看）。

那怎么办呢？我们可以自己写一段代码来实现`Number.isInteger()`

```javascript
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" && 
         isFinite(value) && 
         Math.floor(value) === value;
};
```

这样，在原生支持`isInteger`的浏览器上(如Chrome)，还是用的原生接口，而在不支持的浏览器上(如IE)就会调用我们自己写的函数。这种代码块就叫polyfill。大家在MDN上查资料的时候，上面经常会给出该接口的Polyfill代码，很贴心，如[Number.isInteger()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill)

## polyfill

polyfill本身是一个网络词汇，意思是软质的填充物。创造者是Remy Sharp，在他的网站上做了详细的解释：[What is a Polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill)

"*如果浏览器没有原生实现某个API，就用JavaScript(或flash或其他手段)来实现它。"*"Remy Sharp有次喝咖啡的时候就想着用一个词来表达这种含义，于是他就从一个叫Polyfilla的墙料产品上获得灵感，拍脑袋造了这个词🤣……

![](http://cos.codec.wang/polyfill-life-example.jpg)

现在还没有标准的中文译法，可以理解为"**腻子代码**"，腻(ni)子是一种用来填充和清除墙面缺陷的材料：把IE和Chrome想像成两面墙，Chrome这面墙很平整，可以做很多事，IE这面墙上有各种裂缝缺陷。通过腻子可以填充这些裂缝，抹平缺陷，让两面墙用起来没差别。现在看前面的例子：IE浏览器原生不支持`Number.isInteger()`，我们自己用JavaScript代码弥补了这一缺陷，这段代码就叫polyfill。

下面是[维基百科](https://en.wikipedia.org/wiki/Polyfill_(programming))上的定义，我觉得相比作者Remy Sharp的定义更易理解：

> A polyfill is code that implements a feature on web browsers that do not support the feature.

总结：Polyfill是代码补丁，它将缺陷功能按照标准"修复"，**如果浏览器A支持标准规定的功能，那么polyfill可以让浏览器B的行为与浏览器A一样**。

## Shim

### 示例

和Polyfill常出现的一个术语是Shim。Shim单词的意思是垫片，相当于在API和调用者之间加了一层。举个形象的例子：小王是名新员工，老板要求他写个项目汇报。秘书看小王是新来的，所以在转达老板话的时候就加了一些提示，比如记得写上人员、排期等。

![](http://cos.codec.wang/understand-what-shim-is.png)

理解了这个例子再来看[维基百科](https://en.wikipedia.org/wiki/Shim_(computing))上的定义就容易多了：

> A shim is a library that transparently intercepts API calls and changes the arguments passed, handles the operation itself or redirects the operation elsewhere.

shim通常是一个代码库，它能够"透明地"拦截API请求并修改参数，自行处理操作或者重定向。也就是大家知道老板的话经过了秘书传达，所以秘书的拦截是"透明"的。但秘书自己做了哪些操作，老板(调用者)是不知道的，当然也不关心，他只要得到小王的项目汇报就行。

回到开头那个例子，如果你自己封装了一个判断是否是整数的接口：

```javascript
function myIsInteger(value) {
  // 重定向
  if (Number.isInteger) return Number.isInteger(value);
  
  // 自行操作
  return typeof value === "number" && 
         isFinite(value) && 
         Math.floor(value) === value;
};
```

这段代码乍看上去跟polyfill没啥区别，都能解决兼容性问题，但在架构思想上差别很大：**polyfill并没有封装自己的API，只是实现了标准的API**，开发人员不需要知道新的东西，正常用标准的`Number.isInteger`就行。而上面这段代码，你就需要额外学习一个非标准的API`myIsInteger`。**这就是polyfill和shim的区别**。

总结：Shim可以封装自己的API，所以概念比polyfill大一点，两者并不冲突。有人也从两个单词的"软/硬"含义理解：polyfill的填充你感受不到它的存在，而shim的填充则让你明显地感知到。

![](http://cos.codec.wang/understand-shim-and-polyfill-example.jpg)

## 使用场景

前面的例子是偏向解决IE兼容问题。一来微软现在已经拥抱了Chromium，发布了基于它的Edge浏览器，二来IE的市场份额已逐步下降，所以IE类的场景会越来越少。更多的其实是Web新技术、新标准的兼容使用，有些新技术尚未纳入规范，只是提议，或者是规范刚发布，支持的浏览器很少。


- [core-js](https://github.com/zloirock/core-js): 最新JavaScript标准库的polyfill

```javascript
import "core-js/features/promise"; // 按需引入core-js
Promise.resolve(32).then(x => console.log(x)); // 32
```

- [HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills): 收集了Web各类polyfill库

## 引用

- [本节源码](https://github.com/CodecWang/Blog/tree/master/code/web/polyfill-and-shim.js)
- [What is a Polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill)
- [A short recap on polyfills](https://javascript.christmas/2019/21)
- [HTML5逸事：一袋“腻子粉”的故事](https://www.ituring.com.cn/article/details/766)