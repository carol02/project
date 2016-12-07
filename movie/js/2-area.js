//获取元素
var contim=queSel('#content .movTime');
var bacImg=queSel('#content .background img');
var moveNav=queSel('#moveNav');
var movLogo=queSel('#moveNav .logo');
var areas=queSel('#moveNav .areas');
var timeline=queSelAll('#content .timeline');
//鼠标移动存放数据数组
var arr=[];
//获取屏幕的原始宽高
var winWid=window.innerWidth;
document.body.style.width=winWid+'px';
var winHei=window.innerHeight;
document.body.style.height=winHei+'px';
//生成导航部分
var leo='';
for (var i=0;i<aData.areaNav.length;i++) {
	if (i==0) {
		leo+='<li style="top:'+(16+40*i)+'px;"><p style="top: -18px;left:20px;height:20px;"></p><p style="top: -30px;right:20px;height:32px;"></p><a herf="javascript:;">'+aData.areaNav[i].mz+'</a></li>';
	}else{
		leo+='<li style="top:'+(16+40*i)+'px;"><p style="left:20px;"></p><p style="right:20px;"></p><a herf="javascript:;">'+aData.areaNav[i].mz+'</a></li>';
	}
}

areas.innerHTML+=leo;
$('.areas li a').eq(0).addClass('active');
//生成内容部分
var str='';
for (var j=0;j<aData.area.length;j++) {
	str+='<div class="timeline timeline'+(j+1)+'" style="top:'+2*winHei*j+'px;"><div class="midLine"></div><ul class="midDot">';
	for (var i=0;i<aData.area[j].length;i++) {
		if (i>=4) {
			str+='<li style="top:'+((i-4)*150+winHei)+'px;"><ul><li></li><li></li><li></li></ul><div class="midDot_con"><em></em><div><img src="'+aData.area[j][i].hb+'" alt=""/><dl><dt>'+aData.area[j][i].pz+'</dt><dd>导演：'+aData.area[j][i].dy+'</dd><dd>主演：'+aData.area[j][i].zy+'</dd><dd>类型：'+aData.area[j][i].lx+'</dd></dl></div><p>'+aData.area[j][i].sy+'</p></div></li>'
		}else{
			str+='<li style="top:'+i*150+'px;"><ul><li></li><li></li><li></li></ul><div class="midDot_con"><em></em><div><img src="'+aData.area[j][i].hb+'" alt=""/><dl><dt>'+aData.area[j][i].pz+'</dt><dd>导演：'+aData.area[j][i].dy+'</dd><dd>主演：'+aData.area[j][i].zy+'</dd><dd>类型：'+aData.area[j][i].lx+'</dd></dl></div><p>'+aData.area[j][i].sy+'</p></div></li>'
		}
	}
	str+='</ul></div>';
}
contim.innerHTML=str;
//导航栏操作
var NavOperate=function (obj) {
	this.as=obj.querySelectorAll('a');
	this.nav=obj;
}
NavOperate.prototype={
	constructor:NavOperate,
	//导航栏按键点击，整屏切换
	buttonClick:function(){
		var self=this;
		var subNavLis=queSelAll('#subNav li');
		//第一屏首先运动，开关为关
		this.as[0].onOff=false;
		for (var i=0;i<this.as.length;i++) {
			this.as[i].lc=i;
			//除了第一屏外，其他屏的开关为开
			if (i!=0) {
				this.as[i].onOff=true;
			}
			this.as[i].onclick=function () {
				//开关为关，点击无效
				if (!this.onOff) {
					return;
				}
				//点击过后，开关关闭
				this.onOff=false;
				//清除所有按钮的className
				for (var i=0;i<self.as.length;i++) {
					self.as[i].className='';
				}
				//给当前的按钮添加className
				this.className='active';
				subNavLis[0].className='screenNow';
				subNavLis[1].className='';
				//根据点击的位置判断屏幕的切换
				switch(this.lc){
		 			case 0:
		 				//切换屏幕
		 				$('#content .movTime').css({
							transform: 'translate3d(0px, 0px, 0px)'
						});
						//各个电影板块移出
//						for (var i=0;i<queSelAll('#content .timeline').length;i++) {
//							moveToOut(i);
//			 			}
						screens(0,0,4);
						//切换时，其他屏的开关打开
						for (var i=0;i<self.as.length;i++) {
							if (i!==0) {
								self.as[i].onOff=true;
							}
						}
						//背景图片变换显示
						changeBackground (0);
		 				break;
		 			case 1:
		 				$('#content .movTime').css({
							transform: 'translate3d(0px, -'+2*1*winHei+'px, 0px)'
						});
//						for (var i=0;i<queSelAll('#content .timeline').length;i++) {
//			 				moveToOut(i);
//			 			}
						screens(1,0,4);
						for (var i=0;i<self.as.length;i++) {
							if (i!==1) {
								self.as[i].onOff=true;
							}
						}
						changeBackground (1);
		 				break;
		 			case 2:
//		 				for (var i=0;i<queSelAll('#content .timeline').length;i++) {
//			 				moveToOut(i);
//			 			}
		 				$('#content .movTime').css({
							transform: 'translate3d(0px, -'+2*2*winHei+'px, 0px)'
						});
						screens(2,0,4);
						for (var i=0;i<self.as.length;i++) {
							if (i!==2) {
								self.as[i].onOff=true;
							}
						}
						changeBackground (2);
		 				break;
		 			case 3:
//			 			for (var i=0;i<queSelAll('#content .timeline').length;i++) {
//			 				moveToOut(i);
//			 			}
		 				$('#content .movTime').css({
							transform: 'translate3d(0px, -'+2*3*winHei+'px, 0px)'
						});
						screens(3,0,4);
						for (var i=0;i<self.as.length;i++) {
							if (i!==3) {
								self.as[i].onOff=true;
							}
						}
						changeBackground (3);
		 				break;
		 		}
			}
		}
	},
	//鼠标按下
	dragDown:function(){
		var self = this;
		movLogo.onmousedown = function(ev){
			self.disx = ev.clientX - self.nav.offsetLeft;
			self.disy = ev.clientY - self.nav.offsetTop;
			self.dragMove();
			self.dragUp();
			return false;
		}
	},
	//拖动导航栏
	dragMove:function(){
		var self = this;
		document.onmousemove = function(ev){
			self.x = ev.clientX - self.disx;
			self.y = ev.clientY - self.disy;
			if (self.onOff) {
				if (self.x<self.minX) self.x=self.minX;
				if (self.y<self.minY) self.y=self.minY;
				if (self.x>self.maxX) self.x=self.maxX;
				if (self.y>self.maxY) self.y=self.maxY;
			}
			self.nav.style.left = self.x+'px';
			self.nav.style.top = self.y+'px';
		};
	},
	//鼠标抬起
	dragUp:function(){
		var self = this;
		document.onmouseup = function(){
			this.onmouseup = this.onmousemove = null;
		};
	},
	//限制范围
	dragRange:function () {
		this.onOff=true;
		this.minX=0;
		this.minY=0;
		this.maxX=window.innerWidth-this.nav.clientWidth-20;
		this.maxY=window.innerHeight-this.nav.getBoundingClientRect().height-50;
	},
	timeLineGoBack:function () {
		
	}
}
var screenSwi=new NavOperate(areas);
screenSwi.buttonClick();
var movNav=new NavOperate(moveNav);
movNav.dragDown();
movNav.dragRange();
//各个电影板块操作
var Movie=function (obj) {
	this.screenMove=obj;
	this.movs=obj.querySelectorAll('li .midDot_con');
}
Movie.prototype={
	constructor:Movie,
	//鼠标移入电影介绍板块
	mouseOver:function(){
		var self=this;
		for (var i=0;i<this.movs.length;i++) {
			this.movs[i].onmouseover=function () {
				this.previousElementSibling.lastElementChild.className='colorCha';
			}
		}
	},
	//鼠标移出
	mouseOut:function(){
		var self=this;
		for (var i=0;i<this.movs.length;i++) {
			this.movs[i].onmouseout=function () {
				this.previousElementSibling.lastElementChild.className='';
			}
		}
	},
	//电影板块点击时，详情出现
	moveClick:function(){
		var self=this;
		var detail=queSel('#detail');
		for (var i=0;i<this.movs.length;i++) {
			this.movs[i].onclick=function () {
				detail.style.display='block';
				detailShow(this);
			}
		}
	},
	//电影介绍板块进入屏幕
	moveIn:function (begin,end) {
		var self=this;
		//利用ECMA6，i值拥有块级作用域
		//for (let i=begin;i<end;i++) {
		for (let i=0;i<this.movs.length;i++) {
			if (i>=4){
				var j=i-4;	
			}
			if (i<4){
				var j=i;
			}
			if (i%2==0) {
				setTimeout(function () {
					mTween(self.movs[i],'left',70,600,'easeOut',function () {
						self.movs[i].firstElementChild.className='opacity';
						self.movs[i].lastElementChild.className='opacity';
					});
				},800*j)
			}
			if (i%2!==0) {
				setTimeout(function () {
					mTween(self.movs[i],'right',70,600,'easeOut',function () {
						self.movs[i].firstElementChild.className='opacity';
						self.movs[i].lastElementChild.className='opacity';
					});
				},800*j)
			}
		}
	},
	//电影介绍板块移出屏幕
	moveOut:function () {
		var timeline=queSelAll('#content .timeline');
		for (var i=0;i<timeline.length;i++) {
			var movs=timeline[i].querySelectorAll('li div');
			for (var j=0;j<movs.length;j++) {
				if (j%2==0) {
					movs[j].style.left='800px';
					movs[j].firstElementChild.className='';
					movs[j].lastElementChild.className='';
				}else{
					movs[j].style.right='800px';
					movs[j].firstElementChild.className='';
					movs[j].lastElementChild.className='';
				}
			}
		}
	},
	//滚轮控制屏幕切换
	mScroll:function () {
		var self=this;
		//向上和向下滚动开关初始化,向下按钮打开，向上按钮关闭
		this.screenDown.onOff=true;
		this.screenUpper.onOff=false;
		document.addEventListener('DOMMouseScroll',fn,false);
		document.onmousewheel=fn;
		function fn (ev) {
			var n;
			if (ev.detail) {
				n=-ev.detail;
			}else{
				n=ev.wheelDelta;
			}
			//向下滚动滚轮
			if (n<0) {
				self.screenDown();
			}
			//向上滚动滚轮
			else{
				self.screenUpper();
			}
		}
	},
	//向下滚动滚轮，屏幕向上滚动
	screenDown:function () {
		var self=this;
		var subNavLis=queSelAll('#subNav li');
		//向下滚动开关关闭时，向下滚动滚轮无效
		if (!this.screenDown.onOff) {
			return;
		}
		this.screenDown.onOff=false;
		//记录这张屏幕是否滚动过，是否还在原来的位置。1表示不在原来的位置，0代表还在原来的位置
		this.screenMove.num=1;
		this.moveIn(4,self.screenMove.querySelectorAll('.midDot>li').length);
		//屏幕向上移动一个屏幕的高度
		this.screenMove.style.top=getStyle(this.screenMove,'top')-winHei+'px';
		//设定定时器，在向下滚动结束后打开向上滚动开关
		setTimeout(function () {
			self.screenUpper.onOff=true;
		},1000);
		//屏幕向上滚动，侧边圆点导航的第一个圆点处于点亮状态
		subNavLis[1].className='screenNow';
		subNavLis[0].className='';
	},
	//向上滚动滚轮，屏幕向下滚动
	screenUpper:function () {
		var self=this;
		var subNavLis=queSelAll('#subNav li');
		if (!this.screenUpper.onOff) {
			return;
		}
		this.screenUpper.onOff=false;
		this.screenMove.num=0;
		this.screenMove.style.top=getStyle(this.screenMove,'top')+winHei+'px';
		setTimeout(function () {
			self.screenDown.onOff=true;
		},1000);
		//屏幕向下滚动，侧边圆点导航的第二个圆点处于点亮状态
		subNavLis[0].className='screenNow';
		subNavLis[1].className='';
	},
	//判断屏幕的位置，使得点击导航按钮时屏幕都在原来的位置
	screenBack:function () {
		//判断屏幕是否在原来的位置，如果不在就移回原来的位置
		if (this.screenMove.num==1) {
			//屏幕向下移动一个屏幕的高度;
			this.screenMove.style.top=getStyle(this.screenMove,'top')+winHei+'px';
		}
	}
}

screens(0,0,4);
function screens(obj,begin,end) {
	var timeline=queSelAll('#content .timeline');
	var line=new Movie(timeline[obj]);
	line.mouseOver();
	line.mouseOut();
	line.moveIn(begin,end);
	line.moveClick();
	line.screenBack();
	line.mScroll();
}
//电影介绍板块移出屏幕方法调用函数
function moveToOut(obj) {
	var timeline=queSelAll('#content .timeline');
	var line=new Movie(timeline[obj]);
	line.moveOut();
}
//电影详细内容显示
function detailShow (targetObj) {
	var detail_text=queSel('#detail .detail_text');
	var close=queSel('#detail .close');
	fillText (targetObj);
	//获取原始海报
	var imgOri=targetObj.querySelector('div img');
	//获取原始海报left、top、height、width属性
	var leftOri=getBound(imgOri).left;
	var topOri=getBound(imgOri).top;
	var heightOri=getBound(imgOri).height;
	var widthOri=getBound(imgOri).width;
	//获取当前海报，也即原始海报要移动后的图片
	var imgNow=queSel('#detail img');
	//获取原始海报移动后图片的left、top、height、width属性
	var leftNow=getBound(imgNow).left;
	var topNow=getBound(imgNow).top;
	var heightNow=getBound(imgNow).height;
	var widthNow=getBound(imgNow).width;
	//当前海报内容变换
	imgNow.src=imgOri.src;
	//将原始海报的属性赋值给当前海报
	imgNow.style.height=heightOri+'px';
	imgNow.style.width=widthOri+'px';
	imgNow.style.top=topOri-topNow+'px';
	imgNow.style.left=leftOri-leftNow+'px';
	//当前海报移动变换
	mTween(imgNow,'left',0,1000,'linear',function () {
		//电影详细内容显示
		mTween(detail_text,'width',650,1000,'linear',function () {
			//关闭按钮显示
			close.style.opacity=1;
			detailClose ();
		});
	});
	mTween(imgNow,'top',0,1000,'linear');
	mTween(imgNow,'height',heightNow,1000,'linear');
	mTween(imgNow,'width',widthNow,1000,'linear');
	
}
//获取运动后电影海报的位置
function detailClose () {
	var detail=queSel('#detail');
	var close=queSel('#detail .close');
	var detail_text=queSel('#detail .detail_text');
	close.onclick=function () {
		detail.style.display='none';
		detail_text.style.width='0px';
		this.style.opacity=0;
	}
}
function fillText (targetObj) {
	var titleTex=targetObj.querySelector('div dt').innerHTML;
	var detail_con=queSel('#detail .detail_text dl');
	var str='';
	for (var i=0;i<aData.area.length;i++) {
		for (var j=0;j<aData.area[i].length;j++) {
			if (aData.area[i][j].pz==titleTex) {
				if (aData.area[i][j].jq.length>=110) {
					str+='<dt>'+aData.area[i][j].pz+'</dt><dd>上映时间：'+aData.area[i][j].sy+'</dd><dd>地区：'+aData.area[i][j].dq+'</dd><dd>导演:'+aData.area[i][j].dy+'</dd><dd>编剧：'+aData.area[i][j].bj+'</dd><dd>主演：'+aData.area[i][j].zy+'</dd><dd>类型：'+aData.area[i][j].lx+'</dd><dd>语言：'+aData.area[i][j].yy+'</dd><dd>剧情:</dd><dd>'+aData.area[i][j].jq.substring(0,110)+'...</dd>'
				}else{
					str+='<dt>'+aData.area[i][j].pz+'</dt><dd>上映时间：'+aData.area[i][j].sy+'</dd><dd>地区：'+aData.area[i][j].dq+'</dd><dd>导演:'+aData.area[i][j].dy+'</dd><dd>编剧：'+aData.area[i][j].bj+'</dd><dd>主演：'+aData.area[i][j].zy+'</dd><dd>类型：'+aData.area[i][j].lx+'</dd><dd>语言：'+aData.area[i][j].yy+'</dd><dd>剧情:</dd><dd>'+aData.area[i][j].jq+'</dd>'
				}
			}
		}
	}
	detail_con.innerHTML=str;
}
changeBackground (0);
//背景图片变换显示
function changeBackground (index) {
	//背景图片消失
	$('#areaBg li').css({
		display:'none'
	});
	//背景图片变换
	$('#areaBg li img')[0].src=aData.areaNav[index].bj[0];
	$('#areaBg li img')[1].src=aData.areaNav[index].bj[1];
	//背景图片淡入
	$('#areaBg li').fadeIn(800);
}
//鼠标在规定范围内移动
document.onmousemove = function(ev){
	//将鼠标移动轨迹放到数组中
	arr.push(ev.clientX);
	//当数组子集超过3时目标元素移动
	if (arr.length>=3) {
		judgeMove ();
	}
}
//判断是左移动还是右移动
function judgeMove () {
	//鼠标向左移动||鼠标向右移动
	if (arr[arr.length-3]>=arr[arr.length-2]&&arr[arr.length-2]>=arr[arr.length-1]||arr[arr.length-3]<=arr[arr.length-2]&&arr[arr.length-2]<=arr[arr.length-1]) {
		//背景图片随着鼠标移动而移动
 		for (let i=0;i<$('#areaBg')[0].children.length;i++) {
			$('#areaBg li').eq(i).css({
				left:getStyle($('#areaBg li')[i],'left')+(arr[0]-arr[arr.length-1])/40+'px'
		 	})
		}
 	}
	//数组子集元素清零
 	arr.length=0;
}

