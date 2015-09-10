# JQuery_Pagination
我制作的基于JQuery的页码生成插件，支持自定义样式和无限页码功能

<h2>基于JQuery的分页页码生成插件Paging.js</h2>
		<img src="demo.jpg"/>
		<p>使用方法：导入JQuery文件，并导入paging-V1.3-final.js文件（压缩版为paging-V1.3-final.min.js）。调用方法为：父容器.paging(object)</p>
		<p>参数列表：
			<ul>
				<li>pageCount（必需）：页码总数</li>
				<li>initPage：初始页码位置</li>
				<li>showCount：每次显示多少页</li>
				<li>fn：回调函数，参数为当前页码数</li>
				<li>liCss：默认页码样式，JSON格式</li>
				<li>liActive：选中时页码的样式，JSON格式</li>
				<li>liForbid：不可用时页码的样式,JSON格式</li>
			</ul>
		</p>
		<p>具体示例见Demo文件：<a href="Demo.html">点击此处访问</a> </p>
