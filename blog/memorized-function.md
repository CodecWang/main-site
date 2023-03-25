---
date: 2022-06-04
authors: codec
tags: ["记忆化", 闭包, Closure]
---

# Memorized Function

<iframe
  src="https://codesandbox.io/embed/memorized-function-vybjf8?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Ffactorial.js&theme=dark&view=editor"
  style={{width: "100%", height: "325px", border: 0, borderRadius: "4px", overflow: "hidden" }}
  title="memorized-function"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## 记忆化

[记忆化](https://en.wikipedia.org/wiki/Memoization) Memorization（简写 memo），是一种提高程序执行速度的优化技术，简单来说就是把需要重复计算的结果缓存在内存中，下次要用时直接取出来就行，不用再计算一次，属于典型的空间换时间的优化方案，通常会用在有大计算量或者递归、循环应用等一些场景。

<!--truncate-->

举例来说，对于阶乘，通常会使用递归来实现：

```js
function factorial(n) {
  return n === 1 ? 1 : n * factorial(n - 1);
}
```

现在，5 的阶乘就可以这样调用：

```js
factorial(5) = 5! = 5 * 4 * 3 * 2 * 1 = 120;
```

如果我们还想计算 6 的阶乘呢，`factorial(6) = 6 * factorial(5)`，此时又会计算一次 5 的阶乘，这显然是多余的一次计算量。

## 缓存

### 全局缓存

要解决这个问题，最简单的方式就是在外层定义一个缓存：

```js
const cache = [1, 1];
function factorial(n) {
  if (!cache[n]) cache[n] = n * factorial(n - 1);
  return cache[n];
}
```

加入缓存后性能得到了大幅提升：

```js
console.time();
for (let i = 1; i < 1000; i++) {
  factorial(i);
}
console.timeEnd();
// 普通阶乘：10.355ms
// 加入缓存：0.231ms
```

### 记忆化函数

但此时的`cache`缓存变量一来是定义在全局对象上的，二来是为阶乘这个函数量身定制的，并不能用在其他地方。此时就需要利用闭包（Closure）来创建一个可访问局部变量的函数：

```js
function memo() {
  const cache = [1, 1];

  function factorial(n) {
    if (!cache[n]) cache[n] = n * factorial(n - 1);
    return cache[n];
  }
  return factorial;
}

const factorial = memo();
console.log(factorial(5));
```

这里定义了一个高阶函数（HOC），在里面定义了闭包`factorial`，这样就能访问`memo`函数的局部缓存变量`cache`。lodash 中也提供了[memoize](https://www.lodashjs.com/docs/lodash.memoize)方法，[源码](https://github.com/lodash/lodash/blob/master/memoize.js)如下：

```js
function memoize(func, resolver) {
  if (
    typeof func !== "function" ||
    (resolver != null && typeof resolver !== "function")
  ) {
    throw new TypeError("Expected a function");
  }
  const memoized = function (...args) {
    const key = resolver ? resolver.apply(this, args) : args[0];
    const cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || Map)();
  return memoized;
}

memoize.Cache = Map;

export default memoize;
```

原理基本类似，lodash 同样创建了一个内部函数`memoized`，不同的是它把局部缓存数据`cache`放到了这个`memoized`函数上面，这样做的好处就是外界可以直接访问并修改缓存。借鉴该方式，简单改造我们的阶乘函数：

```js
function memo() {
  function factorial(n) {
    const cache = factorial.cache;
    if (!cache[n]) cache[n] = n * factorial(n - 1);
    return cache[n];
  }
  factorial.cache = [1, 1];
  return factorial;
}

const fact = memo();
// 这样就可以在外部直接访问或修改缓存
console.log(fact(5), fact.cache);
```

## 不要滥用

记忆化是**使用空间换取时间**，并且数据会存储在内存中，因此不能滥用以免导致内存消耗过大，需要在内存占用与执行速度间做个平衡，通常可用于频繁调用的大计算量场景。如果大家使用 Redux 的话，可能会碰到 [reselect](https://github.com/reduxjs/reselect)，它就是通过创建一个记忆化的选择器来优化性能。

课后题：https://github.com/lydiahallie/javascript-questions#78-what-is-the-output

## 引用

- [Memoization](https://en.wikipedia.org/wiki/Memoization)
- [\_.memorize](https://www.lodashjs.com/docs/lodash.memoize)
- [学习 Javascript 闭包（Closure）](https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
