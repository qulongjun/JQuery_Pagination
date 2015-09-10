$.fn.paging = function(pageCount, initPage, showCount, fn) {
	var pagingParam = {
		'parent': $(this),
		'liCss': {
			'display': 'inline-block',
			'border': '1px solid gray',
			'padding': '3px 10px',
			'cursor': 'pointer',
			'margin-right': '5px',
			'background': 'inherit',
			'pointer-events': 'auto'
		},
		'liActive': {
			'background': '#b5c06b',
			'cursor': 'default',
			'pointer-events': 'none'
		},
		'liForbid': {
			'background': 'red',
			'cursor': 'default',
			'pointer-events': 'none'
		},
		'nowShowMin': 0,
		'nowShowMax': 0,
		'nowIndex': initPage,
		'selfPage': 0
	}
	if (!pageCount) {
		console.log('pageCount(页码总数)参数必须设置！');
		return false;
	}
	if (!initPage) {
		initPage = 1;
	}
	if (!showCount) {
		showCount = pageCount;
	}
	var parent = $(this);
	var liCss = {
		'display': 'inline-block',
		'border': '1px solid gray',
		'padding': '3px 10px',
		'cursor': 'pointer',
		'margin-right': '5px',
		'background': 'inherit',
		'pointer-events': 'auto'
	}
	var liActive = {
		'background': '#b5c06b',
		'cursor': 'default',
		'pointer-events': 'none'

	}
	var liForbid = {
		'background': 'red',
		'cursor': 'default',
		'pointer-events': 'none'
	}
	var nowShowMin = 0;
	var nowShowMax = 0;
	var nowIndex = initPage;
	var _thisUl = $('<ul>');
	_thisUl.appendTo(parent);
	var nextPageBtn = 0;
	var result = nextPage();
	nowIndex = initPage;
	var selfPage = Math.ceil((nowShowMax - nowShowMin) / 2) + nowShowMin;
	init();
	_thisUl.children('li:eq(' + (initPage + 1) + ')').css(liActive);
	if (initPage == 1) {
		_thisUl.children('li:eq(1)').css(liForbid);
		_thisUl.children('li:eq(0)').css(liForbid);

	}

	function init() {

		$('<li>').text('首页').css(liCss).appendTo(_thisUl);
		$('<li>').text('上一页').css(liCss).appendTo(_thisUl);
		for (var i = nowShowMin; i <= nowShowMax; i++) {
			var newLi = $('<li>');
			newLi.click(selectPage);
			newLi.text(i).css(liCss).appendTo(_thisUl);
		}
		$('<li>').text('下一页').css(liCss).appendTo(_thisUl);
		$('<li>').text('尾页').css(liCss).appendTo(_thisUl);
		nextPageBtn = _thisUl.children('li').length - 2;
		if (!result) {
			_thisUl.children('li:eq(' + nextPageBtn + ')').css(liForbid);
		}
		_thisUl.children('li:eq(' + nextPageBtn + ')').click(nextPageCount);
		_thisUl.children('li:eq(0)').click(firstPage);
		_thisUl.children('li:last-of-type').click(lastPage);
		_thisUl.children('li:eq(1)').click(frontPageCount);
	}

	function nextPageCount() {
		result = nextPage();
		_thisUl.empty();
		init();
		_thisUl.children('li:eq(' + (nowIndex - nowShowMin + 2) + ')').css(liActive).siblings('li').css(liCss);
		if (!result) {
			_thisUl.children('li:eq(' + nextPageBtn + ')').css(liForbid);
			_thisUl.children('li:last-of-type').css(liForbid);
		}
		fn(getNowPage());
	}

	function frontPageCount() {
		result = frontPage();
		_thisUl.empty();
		init();
		_thisUl.children('li:eq(' + (nowIndex - nowShowMin + 2) + ')').css(liActive).siblings('li').css(liCss);
		if (!result) {
			_thisUl.children('li:eq(1)').css(liForbid);
			_thisUl.children('li:first-of-type').css(liForbid);
		}
		fn(getNowPage());
	}



	function nextPage() {
		//如果总页数大于每一页显示的页数
		if (pageCount > showCount) {
			//当前目录最大值已经是最后一页了
			if (nowShowMax >= pageCount) {
				nowShowMax = pageCount;
				if (nowIndex != pageCount) {
					nowIndex++;
				}
				return nowIndex != pageCount;
			}
			//如果不是最后一页，则往后移动一位
			if (nowIndex < selfPage) {
				nowIndex++;
			} else {
				nowShowMin++;
				nowShowMax = nowShowMin + showCount - 1;
				selfPage = Math.ceil((nowShowMax - nowShowMin) / 2) + nowShowMin; //获取当前屏幕中最中间那一页
				nowIndex++;
			}
			return true;
		} else {
			nowShowMin = 1;
			nowShowMax = pageCount;
			nowIndex++;
			return nowIndex != pageCount;
		}
	}

	function frontPage() {
		//如果总页数大于每一页显示的页数
		if (pageCount > showCount) {
			if (nowShowMin <= 1) {
				nowShowMin = 1;
				if (nowIndex > 1) {
					nowIndex--;
				}
				return nowIndex != 1;
			}
			if (nowIndex > selfPage) {
				nowIndex--;
			} else {
				nowShowMin--;
				nowShowMax = nowShowMin + showCount - 1;
				selfPage = Math.ceil((nowShowMax - nowShowMin) / 2) + nowShowMin; //获取当前屏幕中最中间那一页
				nowIndex--;
			}
			return true;

		} else {
			nowShowMin = 1;
			nowShowMax = pageCount;
			nowIndex--;
			return nowIndex != 1;
		}
	}

	function firstPage() {
		while (frontPage()) {};
		_thisUl.empty();
		init();
		_thisUl.children('li:eq(' + (nowIndex - nowShowMin + 2) + ')').css(liActive).siblings('li').css(liCss);
		_thisUl.children('li:eq(1)').css(liForbid);
		_thisUl.children('li:first-of-type').css(liForbid);
		fn(getNowPage());
	}

	function lastPage() {
		while (nextPage()) {};
		_thisUl.empty();
		init();
		_thisUl.children('li:eq(' + (nowIndex - nowShowMin + 2) + ')').css(liActive).siblings('li').css(liCss);
		_thisUl.children('li:eq(' + nextPageBtn + ')').css(liForbid);
		_thisUl.children('li:last-of-type').css(liForbid);
		fn(getNowPage());
	}

	function selectPage() {
		var _this = $(this);
		nowIndex = parseInt($(this).text());
		$(this).css(liActive).siblings('li').css(liCss);
		if (nowIndex == 1) {
			_thisUl.children('li:eq(1)').css(liForbid);
			_thisUl.children('li:first-of-type').css(liForbid);
		}
		if (nowIndex == pageCount) {
			_thisUl.children('li:eq(' + (_this.index() + 1) + ')').css(liForbid);
			_thisUl.children('li:last-of-type').css(liForbid);
		}
		fn(getNowPage());
	}

	function getNowPage() {
		return nowIndex;
	}
	fn(nowIndex);


}