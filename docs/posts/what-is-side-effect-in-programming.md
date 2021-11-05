# 编程中的 Side effect 是什么？

- Author: CodecWang
- Date: 2021/04/17

![](http://cos.codec.wang/understand-side-effect.jpg)

[Side effect](https://en.wikipedia.org/wiki/Side_effect_%28computer_science%29)，中文可以叫 “副作用”。这个词第一次听的话有种负面的感觉，但如果你使用过 React Hooks 中的`useEffect`或接触过函数式编程，对它应该不陌生。

## 概念

来看下[维基百科](https://zh.wikipedia.org/wiki/%E5%89%AF%E4%BD%9C%E7%94%A8_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)) 的定义：

> 函数副作用是指当调用函数时，除了返回函数值之外，还对主调方产生了附加的影响。比如修改全局变量（函数外的变量），修改参数或改变外部存储。

举个例子：

```js
let number = 0;

const plusOneA = () => number =+ 1;

const plusOneB = (number) => number + 1;
```

调用`plusOneA()`后，外部环境的 number 就会变化，而调用`plusOneB()`后只是执行了一次数学运算，并没有改变什么。

除了这种外部变量的变更外，像文件、数据库、屏幕等输入输出都可以看作是独立于运行环境之外的系统全局变量，也就是说`print()`在屏幕上打印出日志这个效果也叫副作用。

所以这里的副作用更像是 “**附作用**”：**一个函数除自身数学意义上的输入和输出外附加产生的效果都可以叫 Side effect**。

## 纯函数

与副作用常常关联的一个概念是纯函数（Pure function），[维基百科](https://zh.wikipedia.org/wiki/%E7%BA%AF%E5%87%BD%E6%95%B0)定义：

> 若一个函数符合以下要求，则它可能被认为是纯函数：
> 1. 此函数在相同的输入值时，需产生相同的输出。函数的输出和输入值以外的其他隐藏信息或状态无关，也和由 I/O 设备产生的外部输出无关。
> 2. 该函数不能有语义上可观察的函数副作用，诸如 “触发事件”，使输出设备输出，或更改输出值以外物件的内容等。

纯函数的输出可以不用和输入值有关，但不能和输入值以外的任何状态有关。像前面例子中的`plusOneA()`就是纯函数。

## 误解

- 常见误解：副作用是编程中未预料到的、意外的效果，应该尽量避免

大部分人从字面意思上理解副作用就会产生这样的误解。副作用很多时候正是我们的预期效果，比如打印日志`print()`或写入文件`writeFile()`，所以并不一定要全部避免，但要尽量避免真正**意外的**副作用。

## useEffect

像 React/Vue 等框架都是靠状态驱动 UI 渲染，所以说每次状态的变更都会产生 Side effect。这就是`useEffect`这个 React hook 的意思，默认情况下，任何状态变更导致的重新渲染都会触发 useEffect 函数。