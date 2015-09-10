$.fn.page = function(pageCount, initPage, showCount) {
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
	var nextPageBtn = $('#ul li').length - 2;
	var result = nextPage();
	nowIndex = initPage;
	var index = 0;
	var selfPage = Math.ceil((nowShowMax - nowShowMin) / 2) + nowShowMin;
	init();
	var _thisUl = null;
	$('#ul li:eq(' + (initPage + 1) + ')').css(liActive);
	if (initPage == 1) {
		$('#ul li:eq(1)').css(liForbid);
		$('#ul li:eq(0)').css(liForbid);

	}

	function init() {
		_thisUl = $('<ul>');
		$('<li>').text('首页').css(liCss).appendTo('#ul');
		$('<li>').text('上一页').css(liCss).appendTo('#ul');
		for (var i = nowShowMin; i <= nowShowMax; i++) {
			var newLi = $('<li>');
			newLi.click(selectPage);
			newLi.text(i).css(liCss).appendTo('#ul');
		}
		$('<li>').text('下一页').css(liCss).appendTo('#ul');
		$('<li>').text('尾页').css(liCss).appendTo('#ul');
		if (!result) {
			$('#ul li:eq(' + nextPageBtn + ')').css(liForbid);
		}
		$('#ul li:eq(' + nextPageBtn + ')').click(nextPageCount);
		$('#ul li:eq(0)').click(firstPage);
		$('#ul li:last-of-type').click(lastPage);
		$('#ul li:eq(1)').click(frontPageCount);
	}

	function nextPageCount() {
		result = nextPage();
		$('#ul').empty();
		init();
		$('#ul li:eq(' + (nowIndex - nowShowMin + 2) + ')').css(liActive).siblings('li').css(liCss);
		if (!result) {
			$('#ul li:eq(' + nextPageBtn + ')').css(liForbid);
			$('#ul li:last-of-type').css(liForbid);
		}
		alert(nowIndex);
	}

	function frontPageCount() {
		result = frontPage();
		$('#ul').empty();
		init();
		$('#ul li:eq(' + (nowIndex - nowShowMin + 2) + ')').css(liActive).siblings('li').css(liCss);
		if (!result) {
			$('#ul li:eq(1)').css(liForbid);
			$('#ul li:first-of-type').css(liForbid);
		}
		alert(nowIndex);
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
		$('#ul').empty();
		init();
		$('#ul li:eq(' + (nowIndex - nowShowMin + 2) + ')').css(liActive).siblings('li').css(liCss);
		$('#ul li:eq(1)').css(liForbid);
		$('#ul li:first-of-type').css(liForbid);
		alert(nowIndex);
	}

	function lastPage() {
		while (nextPage()) {};
		$('#ul').empty();
		init();
		$('#ul li:eq(' + (nowIndex - nowShowMin + 2) + ')').css(liActive).siblings('li').css(liCss);
		$('#ul li:eq(' + nextPageBtn + ')').css(liForbid);
		$('#ul li:last-of-type').css(liForbid);
		alert(nowIndex);
	}

	function selectPage() {
		var _this = $(this);
		nowIndex = _this.index() - nowShowMin;
		$(this).css(liActive).siblings('li').css(liCss);
		if (_this.index() == 2) {
			$('#ul li:eq(1)').css(liForbid);
			$('#ul li:first-of-type').css(liForbid);
		}
		if (_this.index() == ($('#ul li').length - 3)) {
			$('#ul li:eq(' + (_this.index() + 1) + ')').css(liForbid);
			$('#ul li:last-of-type').css(liForbid);
		}
		alert(nowIndex);
	}




}