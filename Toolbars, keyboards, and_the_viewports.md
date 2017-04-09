# Toolbars, keyboards, and the viewports – Samsung Internet Developers – Medium
===================


##### [原文地址](https://medium.com/samsung-internet-dev/toolbars-keyboards-and-the-viewports-10abcc6c3769)
##### [翻译出处](http://www.zcfy.cc/article/2636)
##### [翻译：00_悦](http://weibo.com/u/1850506467)
原创翻译，有不当的地方欢迎指出。
发在众成翻译平台上，转载请指明出处。谢谢！

----------


Not this kind of viewport ([public domain](https://pixabay.com/en/space-shuttle-earth-clouds-582557/))

所有移动浏览器都有两个viewport。**布局视口**包括了CSS— `width:100%`表示布局视口宽度的100%—而**可视视口**描述了当前页面上呈现在用户眼前的这部分区域。在此提醒，这种两种视口的[可视化](http://quirksmode.org/mobile/viewports/)是很有用的。

今天在这里讨论当viewport的尺寸改变时会发生什么，以及viewport的resize事件。

一些viewport变化是比较好理解的，比如可视视口因为旋转或者缩放产生的resize。另外有一些就比较隐蔽了，比如重写meta标签的viewport。还有一些比较麻烦的，尤其是浏览器工具栏和软键盘的展示隐藏。

### resize 事件

resize事件会在两个viewport中任意一个发生resize时触发。电脑上也是一样，主要在于这两个viewport相当于其浏览器窗口，从Netscape3开始，调整浏览器窗口的大小就会触发resize事件。

在移动端，一切都变得更加复杂。如果你脑子里会有“依赖于浏览器”念头，可以给你加分：你已经达到适合研究浏览器原理的水平了。欢迎来到这里！

resize事件在屏幕旋转或者浏览器工具栏显示、隐藏的时候还是很值得信赖的。其他情况下，却并非如此。


那么旋转和工具栏有啥共同点呢？我也没啥线索。有点疑惑，为什么这两个用例确实很可靠，但是其他的，可能更重要的并不呢。

你知道这是怎么回事对吧？看这里：愉快地仔细阅读[无法避免的兼容性表](http://www.quirksmode.org/dom/events/resize_mobile.html)。不要去记忆太多逻辑，浏览器差异并不是很符合逻辑的。我们会在下文讨论几个重要的点。

我们面临的最大问题是**zoom event**的缺失。屏幕旋转都已经有对应的事件很多年了，但是可以说是更为重要的缩放却没有。

我已经持续六年觉得非常需要一个zoom事件了，因为这对知道用户的缩放行为是很有用的。到现在也只有很少一些浏览器赞同我的观点，（基本只有Edge）会触发resize事件来代替，虽然有一点点帮助，但是其他情况下也会触发。

###常见的可视视口变化

有趣的事：缩放和旋转都改变了可视视口的尺寸。由此，你把他们同等看待——但其实它们并不一样。


所有浏览器都会在用户旋转屏幕时触发resize事件。（你们当中的一些brain-breaker，思考下当用户将屏幕旋转180度的时候会发生什么。会造成方位的改变吗？或者resize？）

不管怎样，只有Edge、BlackBerry10和安卓的WebKit WebViews（但并不是常规浏览器）会在用户缩放时触发resize事件。因此，对于大多数浏览器来说想搞清楚用户什么时候缩放都是不可能的——好吧，你可以执行脚本去检查可视视口的大小，但是这样性能会受到影响。所以不要这样做，OK?

在一些情况下知道用户缩放是很重要的，尤其是使用了`position: fixed`，担心用户可能会看不到整个的fixed元素时。（理论上可以通过 [position: device-fixed](http://www.quirksmode.org/blog/archives/2010/12/the_fifth_posit.html)来解决，但到目前为止，只在Edge中实现了。）

现在，检测zoom变得更加重要，因为[苹果在任何地方都能启用缩放](https://webkit.org/blog/7367/new-interaction-behaviors-in-ios-10/)。不可缩放页面的时代已经过去，这意味着某些设计需要知道用户是在放大还是缩小的情况下。但我们却无法得知。亲爱的浏览器厂商，请添加zoom事件吧，感谢。

### Meta viewport的改变

可以通过动态地重写meta标签的viewport来强制浏览器调整布局视口的大小。（但是完全删除这个标签是不可能的。）如下，能在所有浏览器中运行：
```
	var metaViewport = document.querySelector('meta[name=viewport]');
	metaViewport.setAttribute('width','380');

```

好吧，这是一个非常模糊的效果。我几年前就发现了，但是这些年我都没有找到一个较好的实际用例。此外，这个效果本身就是很难看的，因为网页突然发生了改变，用户也许会晕头转向。


布局视口的调整会触发resize事件，除了Safari/iOS。因此，浏览器正确地处理这种模糊边界的案例是很有价值的。

### 工具栏和软键盘

现在我们进入正题：展示、隐藏的工具栏以及软键盘。一个标准的浏览器工具栏包括一个地址栏可能还有后退和刷新按钮，这在竖直方向占了60px。这个空间不是浏览器窗口的一部分，因此你会觉得可视视口的高度比屏幕高度少了60px。

大多数移动浏览器都会在用户向下滚动页面的时候隐藏地址栏，然后在用户向上滚动的时候展示出来。尽管这是一个非常好的UI特性，但这也会造成可视视口的高度变化60px，在某些情况下可能会引起麻烦。

例如，Jeremy最近[指出](https://adactio.com/journal/11690)，`vh`，这个理论上对于响应式设计很有意义的单位由于可视视口的改变而不正常了。比如你把一个元素设置成`height: 100vh`（i.e.可视视口高度的100%），一开始展现很完美，但是，当用户向上滚动可视视口60px的时候，这个元素的高度也会增加60px，页面布局就乱了。

Jeremy也指出了这个问题并不能单独用CSS解决。你可以采用JavaScript，但正如我们看到的，这也许会让页面变慢。因此，解决方案应该来自浏览器厂商本身。

好像[Chrome团队已经在着手了](https://developers.google.com/web/updates/2016/12/url-bar-resizing)。基本上，从Chromium56开始，100vh就会相对于最大可视视口的高度来计算，i.e.不包括工具栏、软键盘，不管这些工具栏和软键盘是否是可见的。同时，`window.innerHeight`将继续和工具栏的展示隐藏相关联，来给出真正的可视视口的高度。

是很酷，但现在对你的帮助并不大，因为除了最新版的Google Chrome其他浏览器都不支持。但这是目前最好的解决方案，恐怕除了耐心等待并没有其他选择了。


#### Safari/iOS上的软键盘

另外，iOS（surprise！）有独特的问题。对于其他的浏览器，添加软键盘会限制浏览器窗口，从而限制可视视口，在iOS上，软键盘却是一个显示在浏览器窗口上的独立的层。浏览器窗口不会对软键盘的展示隐藏有任何反应。可视视口没有变化，所以resize事件并不会触发。

我花了不止一天来研究，最后不得不挫败地说：确实是无法检测的。视口变化、媒体查询、宽高比、其他事件如blur，都不能提示软键盘在Safari上打开了。

### 结论

让人沮丧的。视口的缩放大部分时候都能有效，Safari的软键盘问题是最大的例外，但是目前的JavaScript事件并不足以监听所有这些改变。尤其是，我们需要zoom事件。

如果你的项目需要可视视口高度的详细知识，算你运气差。不过，浏览器厂商越来越配合开发人员的需求，所以很有可能上面的问题即将有解决方案。

*   [Web Development](https://medium.com/tag/web-development?source=post)

*   [Responsive Design](https://medium.com/tag/responsive-design?source=post)

*   [Mobile](https://medium.com/tag/mobile?source=post)
 
*   [Web](https://medium.com/tag/web?source=post)
                
