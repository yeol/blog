# Why You Shouldn’t Use ‘var’ Anymore
===================


##### [原文地址](https://hackernoon.com/why-you-shouldnt-use-var-anymore-f109a58b9b70?gi=d0a7a667a468)
##### [翻译出处](http://www.zcfy.cc/article/3021)
##### [翻译：00_悦](http://weibo.com/u/1850506467)
原创翻译，有不当的地方欢迎指出。转载请指明出处。谢谢！

![](http://p0.qhimg.com/t011d2ae6640c39905c.png)

我使用ES2015 (ES6)语法编写JavaScript已经有一阵了，并且对它的许多优雅、简易的变化更加欣赏。首先最简单的变化就是适应了采用`let`/`const`来代替`var`。不管怎样，我认为`let`带来的益处是超过`var`的；它并不是`var`的一个华而不实的新语法，而是提供了重要的范围机制。

> 我认为`let`带来的益处是超过`var`的

值得注意的是，我声明的绝大多数变量都最适合使用`_const_`而不是`let`/`var`。因为`const`声明之后如果企图修改它的值，就会抛出错误，这是预防意外变化的有用特性。然而，通常需要的是可变的变量，特别是在循环中的计数器。如果它们都提供了基础的可变性，为什么还要在这些情况下用`let`来代替`var`呢？

答案很简单，因为`**let**` **提供了块级作用域 **，这是`var`的函数作用域所缺少的。这个解释是一个实际的例子。请允许我用一个经典的前端面试题来证明这个重要的差别：

在例子中，控制台上打印出来的是什么呢？

```

var callbacks = [];

(function() {

  for (var i = 0; i < 5; i++) {

    callbacks.push( function() { return i; } );

  }

})();

```

```

console.log(callbacks.map( function(cb) { return cb(); } ));

```

在这个例子中，我们循环了5次，每次将一个函数添加到`callback`数组中。在数组中填满5个函数后，运行每个函数，将其结果在控制台上打印出来。新人工程师也许会回答（错误地）结果是`[0, 1, 2, 3, 4]`，这是合理的分析，不过成了JavaScript“变量提升”的受害人。

![](http://p0.qhimg.com/t01b71e4519957c640c.gif)

不要变成受害者。使用‘let’来避免变量提升的陷阱！

正确答案实际上是`[5, 5, 5, 5, 5]`，当你考虑下其中的变量提升时，这是讲得通的：

```

var callbacks = [];

(function() {

  **var i;**

  for (**i** = 0; i < 5; i++) {

    callbacks.push( function() { return i; } );

  }

})();

```

```

console.log(callbacks.map( function(cb) { return cb(); } ));

```

注意JavaScript是如何将变量声明提升到函数块的顶部的，导致在每个回调函数执行时，`i`都是`5`，因为`for`循环在这些函数调用之前就添加好了。

有许多经典的方法来解决这个问题，让脚本可以在控制台上打印`[0, 1, 2, 3, 4]`，但是`let`提供了一种最简单的解决方案：

```

var callbacks = [];

(function() {

  for (**let** i = 0; i < 5; i++) {

    callbacks.push( function() { return i; } );

  }

})();

```

```

console.log(callbacks.map( function(cb) { return cb(); } ));

```

就是这样— **只需要用** `**let**` **替换** `**var**`，这个例子就能按预期工作了！这都要归功于`let`的块级作用域行为。比起被提升到函数作用域的顶部，`_let_`保持在循环的块作用域里，为每个迭代提供一个单独的`i`的实例。

那么，你还要使用`var`吗？如同你从本文标题获取到的，我认为**不应该再使用** `**var**`。从技术上讲，`var`在你想要保持函数作用域而不是块级作用域的情况下是有用的，但我确定，如果你需要依赖不直观的变量提升来让你的脚本工作，你自己也是有问题的 😜。

**更新：**针对读者提出的两个最常见的讨论点：

1.  `const`是真的不可变的。例如：

```

const myNotQuiteImmutableObject = {

  thisCanBeChanged: "not immutable"

};

```

```

myNotQuiteImmutableObject.thisCanBeChanged = "see I changed it.";

```

这仍然可以防止根本的变化，如：

```

const immutableString = "you can't change me";

```

```

immutableString = "D'OH!"; // error

```

如果你需要真的不可变，请查看Facebook的优秀[Immutable](https://facebook.github.io/immutable-js/)库。

2.“`{mySuperAncientBrowser}`不支持`let`。”这是真的，甚至[有些最新的浏览器也没有支持](http://caniuse.com/#feat=let) [`let`](http://caniuse.com/#feat=let)。Babel允许你使用JavaScript所有的最佳、最新特性，然后将其转换成即使IE8也能读的语法（除了一些例外）。
