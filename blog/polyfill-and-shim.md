---
date: 2020-08-30
authors: codec
image: http://cos.codec.wang/what-is-polyfill.jpg
tags: [Polyfill, Shim]
---

# Polyfill 和 Shim

![](http://cos.codec.wang/what-is-polyfill.jpg)

说实话，这两个术语名字取的，确实让人难以一下子理解。但理解了之后又不得不佩服这取名：妙啊。

<!--truncate-->

## 示例

比如你想判断一个数是不是整数，那么你可能会用到 JavaScript 的`Number.isInteger()`

```javascript
Number.isInteger(9); // true
Number.isInteger(4 / 3); // false
```

你在 Chrome 开发者工具的 console 中运行，没问题，但在 IE 上却报错了：_对象不支持“isInteger”属性或方法_，这是因为 IE 并不支持这一特性（[浏览器兼容性自查](/blog/compatibility-check-for-web-api)）。

那怎么办呢？我们可以自己写一段代码来实现`Number.isInteger`

```javascript
Number.isInteger =
  Number.isInteger ||
  function (value) {
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };
```

这样，在原生支持`isInteger`的 Chrome 浏览器上，还是用的原生接口，而在不支持的 IE 浏览器上就会调用我们写的函数。这种代码块就叫 Polyfill。MDN 上有时会给出所查询接口的 Polyfill 代码，很贴心，如[Number.isInteger()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill)

## Polyfill

Polyfill 本身是一个网络词汇，意思是软质的填充物。创造者是 Remy Sharp，在他的网站上做了详细的解释：[What is a Polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill)

Remy Sharp 有次喝咖啡的时候想着用一个词来表达这种含义："_如果浏览器没有原生实现某个 API，就用 JavaScript(或 flash 或其他手段) 来实现它_"。于是他就从一个叫 Polyfilla 的墙料产品上获得灵感，拍脑袋造了这个词 🤣……

![](http://cos.codec.wang/polyfill-life-example.jpg)

现在还没有标准的中文译法，可以理解为"**腻子代码**"，腻 (ni) 子是一种用来填充和清除墙面缺陷的材料：把 IE 和 Chrome 想像成两面墙，Chrome 这面墙光滑平整，能做很多事，IE 这面墙上有各种裂缝缺陷。通过腻子可以填充这些裂缝，抹平缺陷，让两面墙用起来没差别。

下面是[维基百科](<https://en.wikipedia.org/wiki/Polyfill_(programming)>) 上的定义，我觉得相比作者 Remy Sharp 的定义更易理解：

> A polyfill is code that implements a feature on web browsers that do not support the feature.

总结：Polyfill 就是代码补丁，它将缺陷功能按照标准"修复"，使得 A、B 浏览器的行为一致。

## Shim

和 Polyfill 常出现的一个术语是 Shim。Shim 单词的意思是垫片，相当于在 API 和调用者之间加了一层。还是上面的例子，如果你这样封装下：

```javascript
function myIsInteger(value) {
  // 重定向
  if (Number.isInteger) return Number.isInteger(value);

  // 自行操作
  return (
    typeof value === "number" && isFinite(value) && Math.floor(value) === value
  );
}
```

这段代码乍看上去跟 Polyfill 没啥区别，都能解决兼容性问题，但在架构思想上差别很大：**Polyfill 并没有封装自己的 API，只是实现了标准的 API，开发人员不需要知道新的东西，正常用标准的 Number.isInteger 就行**。而上面这段代码，**你需要额外学习一个新的非标准 API: myIsInteger**。这就是两者的区别。

理解了这个例子再来看[维基百科](<https://en.wikipedia.org/wiki/Shim_(computing)>) 上的定义就容易多了：

> A shim is a library that transparently intercepts API calls and changes the arguments passed, handles the operation itself or redirects the operation elsewhere.
> Shim 通常是一个代码库，它能够"透明地"拦截 API 请求并修改参数，自行处理操作或者重定向。

总结：Shim 可以封装自己的 API，概念比 Polyfill 大一点，两者并不冲突。有人也从两个单词的"软/硬"含义理解：Polyfill 填充你感受不到它的存在，而 Shim 填充则能明显地感知到。

![](http://cos.codec.wang/understand-shim-and-polyfill-example.jpg)

## 使用场景

前面的例子是偏向解决 IE 兼容问题。一来微软现在已经拥抱了 Chromium，发布了基于它的 Edge 浏览器，二来 IE 的市场份额已逐步下降，所以 IE 类的场景会越来越少。现在更多的是 Web 新技术、新标准的兼容使用，有些新技术尚未纳入规范，只是提议，或者是规范刚发布，支持的浏览器很少。

常用的 Polyfill 库：

- [core-js](https://github.com/zloirock/core-js): 最新 JavaScript 标准库的 Polyfill

```javascript
import "core-js/features/promise"; // 按需引入 core-js
Promise.resolve(32).then((x) => console.log(x)); // 32
```

- [HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills): 收集了 Web 各类 Polyfill 库

## 引用

- [本节源码](https://github.com/CodecWang/Blog/tree/master/code/polyfill-and-shim.js)
- [What is a Polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill)
- [A short recap on polyfills](https://javascript.christmas/2019/21)
- [HTML5 逸事：一袋“腻子粉”的故事](https://www.ituring.com.cn/article/details/766)
