$.fn.paging = function(param) {
	var pagingParam = {
		'parent': $(this),
		'liCss': param.liCss,
		'liActive': param.liActive,
		'liForbid': param.liForbid,
		'nowShowMin': 0,
		'nowShowMax': 0,
		'nowIndex': 0,
		'selfPage': 0,
		'_thisUl': $('<ul>'),
		'nextPageBtn': 0,
		'result': null,
		'pageCount': param.pageCount,
		'initPage': param.initPage,
		'showCount': param.showCount,
		'fn': param.fn
	}
	if (!pagingParam.pageCount) {
		console.log('pagingParam.pageCount(页码总数)参数必须设置！');
		return false;
	}
	if (!pagingParam.initPage) {
		pagingParam.initPage = 1;
	}
	if (!pagingParam.showCount) {
		pagingParam.showCount = pagingParam.pageCount;
	}


	pagingParam._thisUl.appendTo(pagingParam.parent);
	pagingParam.result = nextPage();
	pagingParam.nowIndex = pagingParam.initPage;
	pagingParam.selfPage = Math.ceil((pagingParam.nowShowMax - pagingParam.nowShowMin) / 2) + pagingParam.nowShowMin;
	init();
	pagingParam._thisUl.children('li:eq(' + (pagingParam.initPage + 1) + ')').css(pagingParam.liActive);
	if (pagingParam.initPage == 1) {
		pagingParam._thisUl.children('li:eq(1)').css(pagingParam.liForbid);
		pagingParam._thisUl.children('li:eq(0)').css(pagingParam.liForbid);
	}

	function init() {
		$('<li>').text('首页').css(pagingParam.liCss).appendTo(pagingParam._thisUl);
		$('<li>').text('上一页').css(pagingParam.liCss).appendTo(pagingParam._thisUl);
		for (var i = pagingParam.nowShowMin; i <= pagingParam.nowShowMax; i++) {
			var newLi = $('<li>');
			newLi.click(selectPage);
			newLi.text(i).css(pagingParam.liCss).appendTo(pagingParam._thisUl);
		}
		$('<li>').text('下一页').css(pagingParam.liCss).appendTo(pagingParam._thisUl);
		$('<li>').text('尾页').css(pagingParam.liCss).appendTo(pagingParam._thisUl);
		pagingParam.nextPageBtn = pagingParam._thisUl.children('li').length - 2;
		if (!pagingParam.result) {
			pagingParam._thisUl.children('li:eq(' + pagingParam.nextPageBtn + ')').css(pagingParam.liForbid);
		}
		pagingParam._thisUl.children('li:eq(' + pagingParam.nextPageBtn + ')').click(nextPageCount);
		pagingParam._thisUl.children('li:eq(0)').click(firstPage);
		pagingParam._thisUl.children('li:last-of-type').click(lastPage);
		pagingParam._thisUl.children('li:eq(1)').click(frontPageCount);
	}

	function nextPageCount() {
		pagingParam.result = nextPage();
		pagingParam._thisUl.empty();
		init();
		pagingParam._thisUl.children('li:eq(' + (pagingParam.nowIndex - pagingParam.nowShowMin + 2) + ')').css(pagingParam.liActive).siblings('li').css(pagingParam.liCss);
		if (!pagingParam.result) {
			pagingParam._thisUl.children('li:eq(' + pagingParam.nextPageBtn + ')').css(pagingParam.liForbid);
			pagingParam._thisUl.children('li:last-of-type').css(pagingParam.liForbid);
		}
		pagingParam.fn(getNowPage());
	}

	function frontPageCount() {
		pagingParam.result = frontPage();
		pagingParam._thisUl.empty();
		init();
		pagingParam._thisUl.children('li:eq(' + (pagingParam.nowIndex - pagingParam.nowShowMin + 2) + ')').css(pagingParam.liActive).siblings('li').css(pagingParam.liCss);
		if (!pagingParam.result) {
			pagingParam._thisUl.children('li:eq(1)').css(pagingParam.liForbid);
			pagingParam._thisUl.children('li:first-of-type').css(pagingParam.liForbid);
		}
		pagingParam.fn(getNowPage());
	}

	function nextPage() {
		//如果总页数大于每一页显示的页数
		if (pagingParam.pageCount > pagingParam.showCount) {
			//当前目录最大值已经是最后一页了
			if (pagingParam.nowShowMax >= pagingParam.pageCount) {
				pagingParam.nowShowMax = pagingParam.pageCount;
				if (pagingParam.nowIndex != pagingParam.pageCount) {
					pagingParam.nowIndex++;
				}
				return pagingParam.nowIndex != pagingParam.pageCount;
			}
			//如果不是最后一页，则往后移动一位
			if (pagingParam.nowIndex < pagingParam.selfPage) {
				pagingParam.nowIndex++;
			} else {
				pagingParam.nowShowMin++;
				pagingParam.nowShowMax = pagingParam.nowShowMin + pagingParam.showCount - 1;
				pagingParam.selfPage = Math.ceil((pagingParam.nowShowMax - pagingParam.nowShowMin) / 2) + pagingParam.nowShowMin; //获取当前屏幕中最中间那一页
				pagingParam.nowIndex++;
			}
			return true;
		} else {
			pagingParam.nowShowMin = 1;
			pagingParam.nowShowMax = pagingParam.pageCount;
			pagingParam.nowIndex++;
			return pagingParam.nowIndex != pagingParam.pageCount;
		}
	}

	function frontPage() {
		//如果总页数大于每一页显示的页数
		if (pagingParam.pageCount > pagingParam.showCount) {
			if (pagingParam.nowShowMin <= 1) {
				pagingParam.nowShowMin = 1;
				if (pagingParam.nowIndex > 1) {
					pagingParam.nowIndex--;
				}
				return pagingParam.nowIndex != 1;
			}
			if (pagingParam.nowIndex > pagingParam.selfPage) {
				pagingParam.nowIndex--;
			} else {
				pagingParam.nowShowMin--;
				pagingParam.nowShowMax = pagingParam.nowShowMin + pagingParam.showCount - 1;
				pagingParam.selfPage = Math.ceil((pagingParam.nowShowMax - pagingParam.nowShowMin) / 2) + pagingParam.nowShowMin; //获取当前屏幕中最中间那一页
				pagingParam.nowIndex--;
			}
			return true;

		} else {
			pagingParam.nowShowMin = 1;
			pagingParam.nowShowMax = pagingParam.pageCount;
			pagingParam.nowIndex--;
			return pagingParam.nowIndex != 1;
		}
	}

	function firstPage() {
		while (frontPage()) {};
		pagingParam._thisUl.empty();
		init();
		pagingParam._thisUl.children('li:eq(' + (pagingParam.nowIndex - pagingParam.nowShowMin + 2) + ')').css(pagingParam.liActive).siblings('li').css(pagingParam.liCss);
		pagingParam._thisUl.children('li:eq(1)').css(pagingParam.liForbid);
		pagingParam._thisUl.children('li:first-of-type').css(pagingParam.liForbid);
		pagingParam.fn(getNowPage());
	}

	function lastPage() {
		while (nextPage()) {};
		pagingParam._thisUl.empty();
		init();
		pagingParam._thisUl.children('li:eq(' + (pagingParam.nowIndex - pagingParam.nowShowMin + 2) + ')').css(pagingParam.liActive).siblings('li').css(pagingParam.liCss);
		pagingParam._thisUl.children('li:eq(' + pagingParam.nextPageBtn + ')').css(pagingParam.liForbid);
		pagingParam._thisUl.children('li:last-of-type').css(pagingParam.liForbid);
		pagingParam.fn(getNowPage());
	}

	function selectPage() {
		var _this = $(this);
		pagingParam.nowIndex = parseInt($(this).text());
		if (pagingParam.nowIndex == 1) {
			pagingParam._thisUl.children('li:eq(1)').css(pagingParam.liForbid);
			pagingParam._thisUl.children('li:first-of-type').css(pagingParam.liForbid);
		}
		if (pagingParam.nowIndex == pagingParam.pageCount) {
			pagingParam._thisUl.children('li:eq(' + (_this.index() + 1) + ')').css(pagingParam.liForbid);
			pagingParam._thisUl.children('li:last-of-type').css(pagingParam.liForbid);
		}
		$(this).css(pagingParam.liActive).siblings('li').css(pagingParam.liCss);
		pagingParam.nowShowMin
		pagingParam.fn(getNowPage());
	}

	function getNowPage() {
		return pagingParam.nowIndex;
	}
	pagingParam.fn(pagingParam.nowIndex);
}