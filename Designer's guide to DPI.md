# DESIGNER'S GUIDE TO DPI
===================


##### [原文地址](http://sebastien-gabriel.com/designers-guide-to-dpi/home)
##### [翻译：00_悦](http://weibo.com/u/1850506467)
原创翻译，有不当的地方欢迎指出。转载请指明出处。谢谢！

----------


本文是为“初学者”或者作为从一开始就想要学习更多跨DPI和跨平台设计知识的中级设计师准备的序言读物。
没有复杂的计算和不可分析的图表，只是按照划分直截了当地将内容呈献给读者，便于读者理解或是直接运用到设计过程中。

作者[Sebastien Gabriel](http://sebastien-gabriel.com/)：
如果你发现有错误的地方，需要了解更多细节或者有任何问题或建议，请联系sgabriel.contact@gmail.com
[Twitter](https://twitter.com/KounterB), [G+](https://plus.google.com/+sebastiengabriel/posts) 或者 [Facebook](https://www.facebook.com/sebastien.gabriel)




### 什么是DPI、PPI

DPI(Dots Per Inch)是测量空间点密度的单位，最初应用于打印技术中，它表示每英寸能打印上的墨滴数量。较小的DPI会产生不清晰的图片。

后来DPI的概念也被应用到了计算机屏幕上，计算机屏幕一般采用PPI（Pixels Per Inch）来表示一英寸屏幕上显示的像素点的数量，现在DPI也被引入。

安装Windows操作系统的电脑屏幕PPI的初始值是96，Mac的初始值是72，虽然这个值从80年代起就不是很准确了。
一般来说，非retina桌面（包括Mac）的PPI的取值区间在72-120之间，因为这个取值区间能够确保你的作品在任何地方都能保持大致相同的比例。

这里有一个应用实例：
27寸Mac影院显示屏的PPI是109，这表示在每英寸的屏幕上显示了109个像素点。斜角长是25.7英寸（65cm），实际屏幕的宽度大概是23.5英寸，23.5*109约等于2560，因此原始屏幕分辨率就是2560*1440px。

*我知道23.5*109不是恰好等于2560.实际上是23. 486238532英寸。要是用每厘米的像素点计算，会更加准确，但是这里你知道就行。
 ![](http://p6.qhimg.com/t01d984e4a0201a471d.png)




### 影响

在屏幕上设计一个前面我们讨论过的109*109px的蓝色正方形。

这个正方形在1*1英寸的屏幕上有一个初始的物理尺寸，但是如果用户的PPI是72，蓝色正方形就会显得更大。因为PPI是72时，屏幕需要大约1英寸半的尺寸来展示109px的蓝色正方形。模拟效果如下图所示：
 ![](http://p7.qhimg.com/t012f8cfd2c30bd7176.png)
 
附加：
不考虑颜色和分辨率差异，因为每个人看到的设计都是不同的。你应该力求达到平衡，满足大多数的用户的需求就可以了。不要期待用户拥有和你一样好的屏幕。




### 屏幕分辨率（原始分辨率）

屏幕分辨率对用户如何理解设计有很大的影响。幸运的是，自从LCD显示器代替了CRT，现在的用户更趋向于使用原始分辨率，它保证了好的屏幕尺寸或者说PPI比例。

分辨率定义了屏幕上显示的像素数量（比如：27寸的显示器分辨率是2560*1440px，2560是宽，1440是高）。在了解了PPI之后，我们就知道它不是一个测量物理大小的单位。你可以有一个2560*1440屏幕，它能跟墙一般大，也可以跟脑袋一般小。

如今的LCD显示器有分辨率初始值或者原始分辨率来确定屏幕上展示像素点的数量。它和过去的CRT显示器稍有不同，这里就不赘述了。

一个27寸的影院显示屏，原始分辨率为2560*1440px，PPI为109。如果减小分辨率，元素将会显示得更大，因为有23.5英寸的水平宽度需要数量远远不够的像素点来填满。
 ![](http://p1.qhimg.com/t017330cee08d7a3a19.png)
 
如例子所示，屏幕的原始分辨率是2560*1440px。如果分辨率减小，像素点还是被展示在PPI为109的屏幕上。你的操作系统会自动拉伸所有元素来填补间隙，使得整个屏幕被填满。GPU/CPU会捕获所有像素点并且使用新的比例重新计算他们。

如果想要设置27寸屏幕分辨率为1280*720（之前宽的一半，高的一半），GPU会让一个像素点变成原来的2倍大来填充屏幕，那么结果就是会变得模糊。在分辨率为原来一半的时候，因为有简单分频器的存在可能看着还算可以。但是如果使用原来的1/3或者3/4，最终会以小数点结束，就不能等分一个像素点了。我们来看下面的例子：
 ![](http://p7.qhimg.com/t0186ffe5be906661ed.png)
 
思考后面的例子：在原始分辨率的屏幕上画一条1px的线，然后设置分辨率为50%。为了填满屏幕，CPU需要制造150%的视觉效果，所有像素点都要乘以1.5，1*1.5=1.5，但是因为不能有半个像素点，这就使得填充周围的像素点的颜色只有一部分，便产生了模糊。
 ![](http://p4.qhimg.com/t0133bc14835137ddeb.png)
 
这就是为什么当你想要改变一台Retina Macbook Pro的分辨率的时候，系统会展示下面的窗口来让你知道（下面的屏幕截图）这个分辨率会“看着像”1280*800px，它采用用户的分辨率经验来表达尺寸比例。
 ![](http://p9.qhimg.com/t014194747764b5522f.png)
 
这些描述带有浓重的主观色彩，因为它用像素分辨率作为衡量物理尺寸的单位，虽然不够严谨，但至少他们觉得是对的。

附加: 
如果你希望你的设计精确到像素，那么最好不要改变原始分辨率。你也许觉得使用小的比例会更舒服，但是当涉及到像素点时，这样会影响精确性。有些时候，用户会把调整分辨率当作在控制屏幕（特别是桌面）美观程度的方式，这样虽然会让设计看起来不太好，但是可以满足用户对易读性的需求。




### 什么是4K

你也许听到过很多次4K，它在最近非常流行。在了解它是什么之前，我们需要先弄明白“HD”的含义。
 
需要事先声明的是，本文是简化版本，所以这里只考虑最常见的分辨率。HD有不同的类别。

它适用于从1280*720px或720p开始的720水平的任何分辨率。一些地方也将这个分辨率SD叫做标清。

全高清适用于1920*1080px的屏幕。大多数的TV以及越来越多的高端手机（Galaxy SIV, HTC one, Sony Xperia Z, Nexus5）都是这个分辨率。

4K始于3840*2160像素，它也叫做Quad HD，被称为UHD超高清。简而言之，你可以放4个1080p的像素点在4K的屏幕上。

另外一个4K的分辨率是4096*2160，这个稍微大一点，一般用在投影仪和大画幅相机上。
 ![](http://p1.qhimg.com/t01e33ca7765ae9206c.png)

 
#### computer如果我外接一个4k的显示器到电脑会发生什么呢？

最新的OS不再参照4K的比例，这意味着给Chromebook或者macbook外接一个4K显示器，将会使用最高的DPI。假如这样，200%或者@2x，按照正常比例展示就会看起来很好但是有点小。

假设的例子：如果你外接一个12寸4k屏幕到12寸高清屏幕（2x）的电脑，所有东西都会显得小了两倍。

附加: 
- 4k就是四倍全高清。
- 如果现在的OS掌握了4k但是又不按照比例来，这说明现在还没有特定的4k资源。
- 如今没有手机或者平板电脑使用4k.




### 显示器赫兹

稍微从PPI和屏幕分辨率中休息一下，来看个小知识。你可能注意到在屏幕设置中靠近分辨率的地方有显示器的Hz值，它和PPI没什么关系，显示器赫兹或者刷新频率是显示器每秒展示固定图像或者帧的速度单位，比如一个60 Hz的显示器每秒可以显示60帧，同样，一个120 Hz的显示器每秒可以显示120帧。

在UI环境中，显示器赫兹(Hz)决定了动画的流畅和精细程度，大多数的屏幕都是60Hz。而每秒显示的帧数依赖于设备处理图像的能力，像在Atari 2600使用120Hz屏幕就没有太大的用处。

下面这个例子，可以帮助大家更好地理解。T-rex同时在60Hz和120Hz的屏幕上以完全相等的步伐快速从A点到B点，60fps的屏幕上展示了9帧动画，而在相同时间内120fps的屏幕展示了2倍帧数，并且动画在120Hz屏幕上会显得更加流畅。
 ![](http://p5.qhimg.com/t0193d410318c839943.png)
 
附加: 
也许有人会说，每秒显示60帧以上人眼是无法识别的，这是错误的。




### What is a retina display什么是视网膜显示屏

“Retina（视网膜）显示屏”是Apple公司在发布iPhone 4时引入的。之所以叫做Retina是因为设备的PPI非常高以至于人的视网膜也不能在屏幕上分辨出像素点来。

这个说法在现在的设备的屏幕范围内是正确的，但是随着屏幕越来越好，我们的眼睛也会被训练得足够感知像素点，特别是圆形的UI元素。

从技术的角度来讲，他们做的就是在完全相同的物理大小上展示比原来高和宽多一倍的像素点。

iPhone 3G/S是3.5英寸的斜角，分辨率为480*320px，PPI为163。
iPhone 4/S是3.5英寸的斜角，分辨率为960*640px，PPI为326。
 ![](http://p3.qhimg.com/t010e06da3608c18896.png)
 
事实证明正好是两倍的关系，同样的物理大小，屏幕上的元素却有两倍的清晰度，因为他们有两倍的像素点。1个标准的像素＝4个Retina像素，像素的四倍。

思考下面的例子，在复杂设计中如何直接应用：
 ![](http://p1.qhimg.com/t0194e590e2849b5b98.png)
 
图注：在第三方设备上很难模拟出来自不同设备的不同图片质量，如上图所示，Retina的音乐播放器虽然与iPhone 4的音乐播放器有相同的物理空间，但图片质量看上去比iPhone 4好了两倍并且更清晰。如果大家想在本地进行验证，我会提供免费的演示事例源码，供大家[下载](http://sebastien-gabriel.com/freebies/Grey-UI.zip)。

因为“Retina”显示屏的命名归Apple公司所有，所以其他公司使用“HI-DPI”或者“超大像素sp33d显示器”（我将注册这个）或者其他的来表示。

附加: 
使用Apple的产品是熟悉DPI换算，理解分辨率、PPI、物理尺寸比例之间差异的极佳方式，因为你只需要考虑一个像素比。




### 什么是像素比

当你的设计需要在不同PPI下转换时，像素比就是你的救星。当你知道像素比后，就不需要再考虑设备的详细规格了。

以iPhone 3G和4为例，相同物理大小上iPhone4的像素点是3G两倍，因此像素比就是2，这表示只需要用你的资源乘以2，就可以兼容4G的分辨率了。

让我们先创建一个44*44px的iOS上被推荐的touch按钮（我后面会介绍），定义为典型按钮“Jim”。
为了让Jim在iPhone 4上看起来更好，需要创建一个它两倍大小的版本。下面就是我们做的。
 ![](http://p6.qhimg.com/t015c3321519d59ab50.png)
 
很简单。现在的Jim，一个是标准PPI（iPhone 3）的Jim.png版本，一个是200%PPI（iPhone 4）的Jim@2x.png版本。

现在你也许会问，“等等啊！我很确定还有其他的像素比，不止这两个。”有，这是一个噩梦。好吧，也许不是噩梦，但是我很肯定你宁愿花一天时间熨袜子也不想处理无数的像素比。幸好这也没有你想象的那么严重，我们后面再说。

让我们先说说单位，因为现在比起像素，你更需要单位来规范多DPI设计。这就是DP和PT起作用的地方。

附加: 
对于每一个你正在做的设计，像素比都是需要知道的。像素比把屏幕大小和PPI结合起来，让人们更理解它们。




### 什么是DP、PT、SP

DP或PT是测量单位，你可以用来规范你的各种设备和多DPI的app模型。
DP(Dip)表示独立于设备的像素点，PT表示点。DP用在Android上，PT用在Apple上，但是他们本质上是相同的。

简而言之，它能定义独立于设备的像素比的大小，这会包含在不同角色（如设计师和工程师）之间的讨论规则中。

继续说前面“Jim”按钮的例子。
Jim在标准的非Retina屏幕上宽度为44px，在Retina屏幕上是88px。从技术上给Jim添加20px的padding，在Retina上padding是40px。但是，当你基于非Retina屏幕设计时计算Retina的像素值并没什么意义。

因此我们需要做的就是以标准的100%非Retina比例作为一切设计的基础。
 ![](http://p1.qhimg.com/t01bb605a90f390b670.png)
 
在这种情况下，Jim的大小就是44*44DP（PT），padding为20DP（PT）。你可以在任何PPI上执行你的规范，Jim仍然是44*44dp/pt.

Android和iOS会调整自身大小适应屏幕并且使用正确的像素比来进行换算，这就是为什么我发现使用屏幕的原始的PPI设计会更简单。

SP和DP、PT从用途上来讲是不同的，但是工作方式相同。SP表示与比例无关的像素，通常用来定义字体大小，SP受用户Android设备字体设置的影响。作为一个设计师，为任何事物定义SP就像定义DP，最好基于清晰的1x的比例（以16sp为例，它是非常便于阅读的字体大小）。

附加: 
始终使用分辨率或者非比例的值作为规范。屏幕尺寸、分辨率种类越多，它就越重要。




### PPI配置

现在，你已经知道PPI、Retina、像素比是什么了，接下来我们要讨论的是 “如果我在设计工具里改变PPI配置，会发生什么呢？”

如果你问自己这个问题，那就表示你对设计软件比较熟悉。

  任何非打印的设计使用像素大小不用考虑原始PPI配置。

软件PPI配置是打印的一个传统。如果你只是做web设计，PPI对位图大小没有影响。

这就是我们使用像素比而不直接用PPI值的原因。你的画布和图像总是会被被软件按照对应的像素比换算成像素点。

这里有个例子。你可以在允许配置PPI值的软件（比如Photoshop）里面进行试验。我在Photoshop上画了两个80*80px的正方形和16pt的文本，一个配置的PPI值是72，另一个是144。
 ![](http://p9.qhimg.com/t018f6f9525c1771e9e.png)
 ![](http://p4.qhimg.com/t01087a71195fdfa064.png)
  
如你所见，文本变大了，准确点说是两倍大，然而正方形还保持不变，原因就是Photoshop按照PPI值放大了pt值，结果在PPI值变为两倍的情况下文本大小增加为原来两倍。而用像素定义的蓝色正方形，保持了原来大小。像素就是一个像素点，不管PPI怎么配置它会一直保持一个像素。造成这个差异的是用来显示它的屏幕的PPI值。

我们需要记住的是在做数字化设计的时候，PPI只会影响你对设计的感知、你的工作流和以pt为单位的图案例如字体。如果你在工作资源文件里包含了各种PPI配置，程序就会根据接收到的文件的PPI比例在不同的文件里调整转移视觉的大小，这会成为一个需要解决的问题。

那么，解决方案是什么呢？就是坚持使用PPI（对于1x设计，最好控制在72-120之间）。我个人使用72PPI，因为这是Photoshop的默认配置，我的同事也是。

附加: 
- PPI配置对输出到web上的设计毫无影响。
- PPI配置只对基于PPI独立计量（比如PT）产生的图案有影响。
- 像素是任何数字化设计的度量单位
- 保持像素比以及设计的目标，而不是PPI
- 在进行数字化设计时使用实际的PPI配置，你会感受到它在目标设备上的样子（以1x的web/桌面设计72-120ppi为例）。
- 在你的文件中自始至终保持相同的PPI配置

关于这个的额外趣味阅读[StackExchange post](http://graphicdesign.stackexchange.com/questions/13777/is-it-mandatory-to-keep-72-dpi-for-web-design-what-if-i-create-in-200dpi). 




### iOS上的PPI处理

是时候钻研下特定平台的设计了。

让我们花点时间看看2014年年初时的iOS设备。
从屏幕大小和DPI的角度来看，iOS有两种类型的手机设备和两种类型的笔记本/台式电脑屏幕。
 
对于手机，有iPhone和iPad。
在手机分类中，有过去的3GS（iOS6依旧支持）和更高版本，其中只有iPhone 3GS是非Retina。iPhone 5以及后来的都用了和iPhone 4/4s有相同DPI的更好的屏幕。让我们来看看下面的列表：
 ![](http://p8.qhimg.com/t01d8b37a500f0dd582.png)

2014年9月Apple宣布，现在又有2个新类别的iPhone：iPhone 6和iPhone 6 Plus。

iPhone 6比5要大一点（0.7英寸左右），但是PPI相同。iPhone 6 Plus由于它的尺寸，5.5英寸，产生了iOS上新的像素比，@3x。
 ![](http://p5.qhimg.com/t014db279ea03d1b599.png)

相较于其他iPhone，iPhone 6 Plus控制展示比较特殊的是：视觉效果降频。

以为iPhone 6设计为例，设计的画布为1334*750px，手机上就呈现1334*750的物理像素。当为iPhone 6 Plus时，手机的分辨率小于渲染的图像，因此你设计的分辨率为2208*1242px，展示时降频为1920*1080px。如下图：
 ![](http://p4.qhimg.com/t01087a71195fdfa064.png)

物理分辨率比渲染分辨率小15%，会造成一些细节问题，比如半像素使得精细的地方变模糊。分辨率如此高也是很微妙的，除非你近距离观察。因此，在2208*1242px的画布上设计，需要注意设计中真正精细的地方，像是分隔符。模拟如下：
 ![](http://p0.qhimg.com/t019069429098a7c63b.png)
感谢[Paintcode](http://www.paintcodeapp.com/)的说明，看看他们专门的页面。[点击查看](http://www.paintcodeapp.com/news/iphone-6-screens-demystified)
 
在iPod touch分类中，iPod第四代出来的时候使用的是iOS6和非Retina。iPod第五代以及后面的都使用Retina屏幕并且兼容iOS7，它的屏幕大小与iPhone 5相同。

最后说说iPad。除了iPad 第一代，其余的都用的是iOS7，同时只有iPad2和iPad mini是非Retina屏幕。从设计的角度来看，iPad mini只是普通的iPad（一样的PPI屏幕），但是物理体积更小，也就是说它们拥有相同的分辨率，只是大小从9.7英寸减小到了7.9英寸。保持同样的比例，便会相应地增大像素点的密度，你的虚拟资源就会显得更小了。
 ![](http://p7.qhimg.com/t01f87bde23a62d810f.png)
 ![](http://p4.qhimg.com/t017d8b32db776d9977.png)
  
至于台式机和笔记本，我们不会全面讨论Apple提供的各种尺寸的屏幕。在今天，Apple提供的几乎都是1x像素比的Retina屏幕（Macbook，Macbook Air，旧版Macbook Pros，台式机显示器），Retina只应用于13和15寸的Macbook Pro。iPad和iPhone像素比是2x。为台式机设计与手机设计不同的是，你需要以相同方式设计来覆盖这两种不同类别的屏幕。

当只使用一种像素比时，基于iOS和OSX的设计是非常简单的。我建议开始设计时先用基础的PPI（例如，100%/1x）然后增加到2x并在2x的屏幕上校验你的设计并且生成2x的资源。当你熟悉在1x和2x之间切换设计后，就能够直接在2x上进行设计了，低分辨率时资源更小。如果你正在为Retina屏幕设计的话（Macbook Pro），这就特别有用。


#### 引入资源，chrome为例
 ![](http://p4.qhimg.com/t016679f7780642640c.png)

如图所示，每次请求资源需要传送两张图片。非Retina下图片名为name.png，Retina的图片增加到@2x命名为@2x.png，这是iOS开发约定的命名规范。

如果你创建了一个图片只用在iPad上，我们在.@2x后面加上~iPad，这仅仅只是chrome的约定。对需要的资源都这样处理，不要只用一个版本的资源来覆盖所有DPI。

附加, iOS规则集:
- @2x的资源必须始终是1x资源的两倍。
- Retina资源加上@2x.
- 始终创建100%和200%比例的图片。
- 1x和2x的资源始终要保持名字相同。
- 在100%比例下开始设计，然后做乘法。
- 传递.png格式的图片。
- 使用pt创建规范而不是px。




### Android上的PPI处理

Android平台的设备种类比iOS多，因为任何OEM都可以生产设备并且几乎没有比例的限制，然后加上自己版本号。结果就是生产出几乎无限制的屏幕大小和DPI种类，电话和平板电脑一样大，或者电话和平板电脑一样小的情况比比皆是。为此，你的设计总是需要做适配。

在这个部分，我们将采用不同于iOS的方法，我们先来讨论下像素比和DPI分类。

Android设备可以分为两类：手机和平板电脑。这两种设备又可以按照不同DPI分为：ldpi、mdpi、 tvdpi、 hdpi、 xhdpi、 xxhdpi和xxxhdpi。

幸好，有些比其他使用得更加频繁，有些甚至已经弃用了。

首先我们要找到等价于iOS上1x的基础单位。在Android上，这个基础单位就是MDPI。

让我们看看下面列表的像素比。
 ![](http://p6.qhimg.com/t01b9522b73325c38f5.png)
 
是的，很多，而且还没有完，还有一个落下了。
 ![](http://p6.qhimg.com/t0105727e95b0cd8847.png)
 
实际上，目前正在使用的DPI有4个：MDPI, HDPI, XHDPI和XXHDPI。
LDPI是过时的DPI，现在已经不再使用，TVDPI是TV UI的特殊例子，在2012年版的Nexus 7中短暂使用过，在手机和平板电脑的使用中没有考虑的必要。尽管如此，TVDPI的像素比（1.33x）还是被用在一些安卓系统的设备上，像是LG G手表，我们后面来讨论这个。

让我们结合带着各自DPI的Android手机和平板电脑全面客观地看待事物。
 ![](http://p3.qhimg.com/t019ea0bf889b12539b.png)

 ![](http://p4.qhimg.com/t01751a57134c9f0f8e.png)

 ![](http://p5.qhimg.com/t011c20633b40ce7a5c.png)

 ![](http://p6.qhimg.com/t01b0ce546071a09191.png)

 ![](http://p5.qhimg.com/t010810bc954c96fed0.png)

 ![](http://p5.qhimg.com/t0195c735b96953cb0f.png)

 ![](http://p6.qhimg.com/t01581b7ba47c168785.png)
 
也许在现在这个时候有一个设备使用XXXHDPI的实际app资源，但也不是很常见。如果你能用额外时间生产XXXHDPI资源，你的app便不会过时。


#### 引入资源，chrome为例

每次请求资源都需要传递一组4张图片，从MDPI到XXHDPI，无需考虑LDPI。注意，在下面的chrome版本中，TVDPI的输入在这个例子里的5张图片里也很清楚。

和iOS一样，我建议把100%或者1x的像素比作为你设计的基础，这会让设计在适配其他像素比的时候容易一点，特别是在像素比为1.33和1.5的安卓系统上。

看看下面安卓上chrome的返回按钮的例子。
 ![](http://p7.qhimg.com/t01fc3e2b9d8c0bba19.png)
 
DPI后面跟着的建议名称不是安卓官方指南强制要求的，这是我们为资源取名的方式，因为现在有限的设计工具很难给每个资源定义一个路径。
考虑到一个资源有时有上百个资源文件，站在设计师的角度来说这是使输出过程不那么痛苦以及避免重命名错误的一个途径。资源在资源仓库里面的存储方式是有结构的，参考后面：

  - drawable-mdpi/asset.png
  - drawable-hdpi/asset.png
  - etc...

如你所见，资源被截成了32*32dp的正方形，Android像素比也会是小数。当用1.33或者1.5乘以一个数的时候，最后的结果很有可能就是小数。在这种情况下你需要通过四舍五入来让数字变得有效。在这个例子中，32*1.33=42.56所以四舍五入之后是43px。

你需要注意以像素为单位的元素，比如笔画。你需要确保你的笔画既不是1px宽也不是2px同时也不像屏幕分辨率部分描述的那样模糊。

附加, Android规则集:
- Android有7种不同的DPI，你需要关注其中的4个：mdpi,hdpi,xhdpi,xxhdpi，如果希望你的app面向未来，可以关注XXXHDPI。
- MDPI是基础的DPI或者1x像素比
- Android使用dp代替pt当作参数规格，但是他们是一样的。
- 用你最好的判断来处理小数像素比。
- 传递.png格式图片。
- 确保检验命名约定，与执行负责人共同完成输出进程。




### Mac、Chrome OS上的PPI

Mac（OSX）和Chrome OS在处理PPI方面是十分相似的。
两个OS都支持常规的PPI（100%）和hi-res/retina PPI(200%)。像iPhone和iPad，就只有2x像素比。
 
即使大多数的用户都使用Mac和Chrome OS，但是也有用户会在低分辨率的设备上使用，我强烈建议将你的app面向未来的高端屏幕。面向未来对于ChromeOS意味着为Web-app或者网站创建hi-res资源，那绝不是浪费时间。当前有3种笔记本处理PPI，13寸、15寸Macbook pro以及Chromebook Pixel。除此之外，Chromebook Pixel还处理了touch。
 ![](http://p1.qhimg.com/t0132d677167e0a7b0a.png)


#### 引入资源，chrome为例

Chrome的工具栏按钮资源就是相似性最好的例子。我们在两个平台上使用完全相同按钮，即使代码不同，视觉上也是一样的。看下面这个chrome菜单按钮的例子。
 ![](http://p8.qhimg.com/t018854ad3e583920fa.png)
 
附加:
- Chrome OS和OSX像素比相同，都是2.
- Chrome OS高分辨率展示也处理touch。




### 可拉伸资源

不管你的app是在桌面或者手机上。你通常都会引入可拉伸资源。

可拉伸资源的建立会使代码在没有减少渲染的情况下比实际需要的多。

他们与可重复资源即使有的时候展示结果一样，工作方式也是不同的。

看看下面这个Chrome的例子。iOS上的工具栏在整个屏幕上只用了一个在x轴上平铺的超细资源。
 ![](http://p7.qhimg.com/t01c2c12f816ca25710.png)
 
现在这种方式已经过时了，让我们来看看不同平台如何处理可拉伸资源。


#### iOS上的可拉伸资源

对iOS的设计师来说这个很简单，因为拉伸在代码里面定义比资源片段或者标记方式好。所有需要做的就是提供一个基础图片，如果你自己还没有实现这个，可以将你的资源规范定义为水平或者竖直可扩展，或者两者均可。看看下面这个iOS上Chrome的默认按钮的例子。
 ![](http://p1.qhimg.com/t01979f8b5178c966b1.png)

 
#### Android上的可拉伸资源

Android有和iOS不一样的处理可拉伸资源的方式，它更依赖设计师一点。

在这个平台你将采用九宫格，这些辅助线包括了4条围绕资源本身的线。他们必须被当作资源的一部分来传递片段/图片，用它来准确的呈现视觉规格。

他们定义了两个区域：可拉伸区域和填充区域。一旦定义好，代码就只会拉伸可拉伸区域，并把内容放在你定义的填充区域。

看看下面的例子，就是你前面看到的Chrome默认按钮的Android版本。为了演示，我把他放大了。
 ![](http://p3.qhimg.com/t01bdbfac545ddd1676.png)
 
如你所见，这个九宫格是一组4条纯白色的bar。他们在任何DPI下都是宽1px，这是代码表示的。可拉伸区域不包括圆角因为圆角不能平铺开（否则看起来很难看）。在这个例子中，我们给按钮添加了规格允许范围内10dp的padding。.9也需要平铺并且截断部分要100%透明。如果不这样，他就不能正常工作，需要修改。
 ![](http://p9.qhimg.com/t0140cadf16b1150f8c.png)
 
使用九宫格要求在名称后面加上.9，和在iOS资源上添加@2x的方式一样。重命名按钮的例子如下：
 ![](http://p8.qhimg.com/t018175915339ea2559.png)
 
现在你需要非常注意你的资源大小。如果我在演示中放大了它，你就需要通过减小它的尺寸到一个最小限度来优化资源，如后面所示。保持了圆角的原样，但是将可拉伸和内容区域减小到最小限度。
 ![](http://p9.qhimg.com/t01e011a923d9a0abde.png)
 
需要注意的是九宫格的标记不会和设计重叠，并且资源切割是合理的。.9需要尽可能靠近资源并不与之重叠，试着不内置padding。前面的例子因为阴影而内置了padding。

九宫格不会代替你导出每种DPI的资源。它需要在每个资源版本都实行。

最后一点，.9可以有许多可拉伸区域（上面和左边），虽然我没有经常遇到这样的情况，但它也是很值得尝试的。

附加:
总是采取最好的解决方案来实现设计，特别是桌面设计。图片越多，app就会变得越沉重。追踪和更新资源也变得困难。九宫格应该使用在命名有规范、组织结构良好的资源中。




### Touch和触摸目标

首先需要知道的是做触屏相关的准备和DPI一点关系也没有。但是当涉及到设计UI或者创建资源，弄清楚触屏和DPI的关系就很重要。

选择触屏或者非触屏很大程度上取决于app的适用范围，它被部署在哪里以及希望得到怎样的用户体验。
我们可以简单地将他们分为：非触屏的桌面应用和手机app。


#### 台式机, 非触屏

直到2005年，触屏才开始出现在计算机技术中。
我们使用鼠标和键盘，它们能够非常准确的操作UI。鼠标光标的精度是1pt，也就是说理论上你可以创建一个能让任何人点击的1*1pt的按钮。

请看下面图解。
 ![](http://p2.qhimg.com/t01a051035a88230838.png)
  
这是个Chrome OS光标的20x版本。
红色区域是能在UI上触发一个事件的实际区域，十分准确。
你知道我的标题。什么是不准确的呢？手指。

那么如何为触屏设计呢？最好的办法就是让所有东西变得更大。


#### 手指大小

这里有交互中最常用到的两根手指（食指和大拇指）的平均大小，这代表了触摸区域和被手指遮挡了的区域。实际的触摸区域（例如，你手指接触屏幕的那部分）当然会小一点并且更准确，除非你把你的手指压在屏幕上。

在设计触屏的时候，放大触摸目标的尺寸比低估更安全。
 ![](http://p7.qhimg.com/t013e3530d6b282ed34.png)

 
#### 如何将此应用到我的设计流程

如我们已经看到的，在像素世界英寸或者厘米并不是一个好的计量方法，即使是像素也不是真正好的计量方法。所以你怎么确保你的设计是可被触摸的呢？

我虽然讲了很多理论知识，但是更重要的是自己试着在目标设备/台式机上设计。
但是为了避免浪费更多时间，有一些基础的像素的大小使用起来是比较安全的，并且被推荐使用在每个OS上。


#### 各平台推荐的触屏目标

需要注意的是，这些大小都是为了方便，都不是现实生活中的测量单位，他们依赖于OEM和各厂商遵守这个指南来生产屏幕，使之保持大小、dpi比例一致。
 ![](http://p0.qhimg.com/t01c88e94570896ac2c.png)
 
如你看到的，每个OS都有一系列自己的推荐规范，但是都在48pt左右。Windows的规格是包含了padding的，所以我把它加到这里。

尺寸的不同是源于不同的因素。 
Apple可以控制它的硬件，因此知道触屏的质量并且能够控制这个确切的比例，它可以触摸更小的目标，另外，本身的物理尺寸也更小。

另一方面，Android和Windows有不同的OEM，都各自生产自己的硬件，有更大的触摸目标会更“安全”。他们的UI更加无规范（特别是Windows），物理尺寸也越来越大了。


#### chrome为例

这是在Chrome上的应用，编码使触摸目标呈蓝色。
 ![](http://p4.qhimg.com/t01b2f9ac819657391d.png)
 
如你所见，两个平台上工具栏都是被推荐的触摸目标的高度。可视范围在iOS和Android上分别是44*44pt和48*48pt的正方形，这不仅使得UI在大小方面和其他OS保持一致，而且也能让与用户交互的部分都保持最小的规格。


#### Windows 8以及Chrome OS

Windows 8和Chrome OS都支持触屏和非触屏的接口。如果你在为Windows 8 设计app，我强烈建议按照它们[guidelines for touch targets](http://msdn.microsoft.com/en-us/library/windows/apps/hh465326.aspx)来做。
 
Chrome OS准则目前尚未发布，但是Pixel使用问题不大。因为所有Chrome OS的app都是基于web开发，我的建议是按照触屏设计并且遵照[Android touch targets guidelines](http://developer.android.com/design/style/metrics-grids.html)来进行开发。


#### web，混合设备和未来

如果你在为手机设计，触屏是不二选择。如果你在设计桌面应用，参照非触屏。这听起来很简单但是在混合设备兴起的时候很容易被忽略，。
 
混合设备是一种既支持触屏又支持非触屏的设备。Chromebook Pixel，Surface Pro和Lenovo Yoga就是很好的例子。
在这样的情况下，我们该做什么呢？没有简单的答案，但是我会首先给一个答案，触屏方向，因为那是未来的发展趋势。
如果你为web或者其他相关的设计，首先考虑触屏。

附加:
- 移动和触屏设计几乎是未来发展趋势。
- 参考每个OS上建议的触摸目标。这能帮助你更好地设计并让你的产品在OS中保持一致。触摸目标有参考价值，但是不代表你需要不折不扣地遵守，同时你也需要根据经验判断。




### 设计软件

软件不能制造设计师，但是在完成任务时选择使用正确的软件可以提高效率，更快完成工作。软件“诀窍”不应该是你唯一的技能，但是学习和操作正确的工具可以帮助你产生灵感。

当涉及到在设计界面处理DPI变化，不同的软件采用不同方式。在特定任务中有些软件比其他的更好。下面是最常见的：
 ![](http://p7.qhimg.com/t01b4545887e75d546d.png)

 
#### Photoshop

界面设计工具之母。也许也是如今使用最广泛的工具。关于它的资源、教程、文章数不胜数，Photoshop几乎几乎贯穿界面设计的每一个阶段。

正如其名，软件最开始的目的并不是界面设计而是图像或者位图处理。随时间推移以及界面设计的产生，设计师们再次使用起来。部分人是因为他们以前就用并且是那时仅有的能够把事情做得足够好的软件。

在今天，Photoshop是主要的位图编辑工具，也是UI设计中使用最广泛的软件。数十年的积累使得它成为学习和使用比较困难的软件。作为软件中的瑞士军刀，你可以用来做任何事，但是并不总是最有效的。

因为最初是基于位图的，所以Photoshop十分依赖DPI，下面描述的是与之相反的Illustrator和Sketch。


#### Illustrator

Illustrator的矢量是基于同级的。顾名思义，它重点在插画，但是也可以作为界面设计工具。

Illustrator也很适合平面设计，因此它的界面，颜色管理，缩放，标尺和单位首先就吸引你，只需要一些补丁就会更便于使用。和Photoshop一样，他也是一款很强大的工具，同时也需要付出努力去学习。

和Photoshop不同的是，它是独立于DPI的，因为它依赖矢量图。与点阵图或者光栅图相反，图像生成采用矢量图，依靠数学公式计算，以编程方式重新调节大小并且不会损失图片质量。

了解栅格化和矢量化图片的不同是建立可扩展视觉设计和资源的关键。

如果你想学习使用Illustrator来进行web/界面设计，我推荐你阅读[@janoskoos](https://twitter.com/@janoskoos)的["My vector workflow"](https://medium.com/@janoskoos/my-vector-workflow-dd1357d28d7c)。


#### Sketch 3.0

与Photoshop和Illustrator比起来，Sketch还很年轻。虽然只产生了四年，但它在UI设计行业里面引起了巨大的反响。因为从一开始，Sketch的目标就是供界面和UX设计师使用，没有Photoshop和Illustrator的历史积累，Sketch把自己定位成针对小众用户——界面设计师的一款完美的调整工具。

Sketch适合快速设计框架以及复杂的视觉设计。它像Illustrator一样是完全基于矢量的，简单轻量化同时还拥有美观的UI。它结合了铜版纸使用方便和灵活的资源生成系统，让它成为跨DPI、跨平台设计最快的工具。最近发布的3.0版本也是可以用来替代Photoshop的产品。

但是也有不足的地方，Sketch是小团队开发的，而且出来得比较晚。尽管它的团队能够积极响应需求的变化，但是也没有Adobe（Photoshop和Illustrator）公司这样的规模。在位图编辑时，Sketch只能满足（设计时）最低的需求，但是Photoshop的功能就更加全面。同时，因为它的年轻，在源文件、教程和社区方面在数量上也远少于Photoshop，不过，社区用户都很积极上进。

另外私人方面，从8年前我就是是Photoshop的用户，但是最近我把我设计中的最重要部分切换到了Sketch3.0。这不是对质量的判断，Photoshop仍然是一个好软件，只是Sketch3.0更加适合我。

如果你想了解更多关于我的特别的经验，建议你阅读我的["A month with Sketch 3.0 "](https://medium.com/@KounterB/a-month-with-sketch-3-68c443fe5041)或者["Sketch tutorial_01"](https://medium.com/@KounterB/sketch-tutorial_01-b76271a095e3).

想要了解更深入以及矢量是如何在sketch工作的？去看[@pnowelldesign](https://twitter.com/@pnowelldesign)的文章 ["Harnessing vector awesomeness in Sketch"](https://medium.com/sketch-app/harnessing-vector-awesomeness-in-sketch-3c9621408138)

附加:
并没有完美的工具但是有最适合你的。如果你有足够的时间和钱，我建议你都试试，然后再决定。




### 文档和资源

这篇指南只是一个介绍，真正开始做的时候能学到更多。如果你想要了解更多或者获取我们讨论的主题相关的更详细的内容，可以点击下面的链接：


#### 平台文档
[Android UI guidelines](https://developer.android.com/design/index.html)
[Google Material guidelines](http://www.google.com/design/spec/material-design/introduction.html)
[iOS7 UI guidelines](https://developer.apple.com/library/ios/documentation/userexperience/conceptual/MobileHIG/index.html)
[Windows UI guidelines](http://msdn.microsoft.com/en-us/library/windows/apps/hh465424.aspx)
[Google dev Principles of site design](https://developers.google.com/web/fundamentals/principles/)


#### 速查表和模板
[iPhone 6 Screens Demystified](http://www.paintcodeapp.com/news/iphone-6-screens-demystified)
[Ultimate guide to iphone resolutions](http://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions) by [PaintCodeApp](http://www.paintcodeapp.com/)
[Screen sizes, ratio and PPI](http://screensiz.es/phone)
[iOS7 designer cheat sheet](http://ivomynttinen.com/blog/the-ios-7-design-cheat-sheet/)
[iOS7 design resource](https://developer.apple.com/library/prerelease/ios/design/index.html) (requires Apple account)
[App icons template, Android and iOS](http://appicontemplate.com/)
[Bjango blog](http://bjango.com/articles/) (A design article gold mine)
[iPhone GUI and iPad GUI(.psd)](http://www.teehanlax.com/tools/ipad/) by [@teehanlax](https://twitter.com/teehanlax)


#### 工具
[Density converter](http://density.brdrck.me/) by [@brdrck](https://twitter.com/brdrck)
[Android asset generation](http://dribbble.com/shots/1237570-Asset-Creation-Process?list=searches) by [@brdrck](https://twitter.com/brdrck)
[Android design tips](http://www.androiddesign.tips/) by [@destroywerk](https://twitter.com/destroywerk) and [@BPScott](https://twitter.com/BPScott)
[9patch creation in Android](http://developer.android.com/guide/topics/graphics/2d-graphics.html#nine-patch) by [@romannurik](https://twitter.com/romannurik)
[Android asset studio](http://romannurik.github.io/AndroidAssetStudio/index.html) by [@romannurik](https://twitter.com/romannurik) 


#### 更多文章
[Device independent pixel formula for Mobile devices](http://www.brandbuilderwebsites.com/blog/2012/03/29/device-independent-pixel-formula-for-mobile-devices/)
[More information about 4K by Cnet.com](http://reviews.cnet.com/8301-33199_7-57364224-221/what-is-4k-uhd-next-generation-resolution-explained/)
[More informations about touch targets by Smashing Mag](http://uxdesign.smashingmagazine.com/2012/02/21/finger-friendly-design-ideal-mobile-touchscreen-target-sizes/)
[The Android Screen Fragmentation Myth](http://rustyshelf.org/2014/07/08/the-android-screen-fragmentation-myth/)



