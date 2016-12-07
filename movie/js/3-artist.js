//获取屏幕的原始宽高
var winHei=window.innerHeight;
document.body.style.height=winHei+'px';
var winWid=window.innerWidth;
document.body.style.width=winWid+'px';
//全局开关
var onOff=true;
//获取元素
var character_lis=queSelAll('#con_right .character li');
//生成明星头像
var str='';
for (var i=0;i<aData.artist.length;i++) {
	str+='<li><span>'+aData.artist[i].mz+'</span><img src="'+aData.artist[i].tx+'"/></li>';
}
$('#con_left .artists')[0].innerHTML+=str;
//生成明星影片照片
function createCharacter (obj) {
	var strMovie='';
	for (var i=0;i<aData.artist[obj].js.length;i++) {
		strMovie+='<li style="left:'+i*200+'px;"><img src="'+aData.artist[obj].js[i]+'"/><div class="bg"><p class="comment"><span>'+aData.artist[obj].dy[i]+'</span>'+aData.artist[obj].yp[i]+'</p></div></li>';
	}
	$('#con_right .character')[0].innerHTML=strMovie;
}
createCharacter (0);
$('.character').children('li').fadeIn('slow');
//构造函数,内容左半部分操作
var ContentLeft=function (obj) {
	this.drag=obj.querySelector('.photographs .drag');
	this.but=obj.querySelector('.photographs .drag em');
	this.photo=obj.querySelectorAll('.photographs .photo');
	this.artists=obj.querySelectorAll('.artists li');
}
ContentLeft.prototype={
	constructor:ContentLeft,
	//鼠标按下，拖拽按钮，图片大小变化
	dragDown:function(){
		var self=this;
		this.but.onmousedown=function (ev) {
			ev=ev||event;
			self.disx=ev.clientX;
			self.dragMove();
			self.dragUp();
			return false;
		}
	},
	//鼠标左右移动，图片随着鼠标移动显示
	dragMove:function(){
		var self = this;
		var left=getStyle(this.drag,'left');
		document.onmousemove = function(ev){
			ev=ev||event;
			self.x=ev.clientX-self.disx;
			self.photo[0].style.width=left+self.x+'px';
			self.drag.style.left=left+self.x+'px';
			self.degRange();
		};
	},
	//鼠标抬起
	dragUp:function(){
		var	self=this;
		document.onmouseup=function () {
			this.onmouseup = this.onmousemove = null;
			
		}
	},
	//照片原始大小
	originalSize:function () {
		this.photo[0].style.width=getStyle(this.drag,'left')+'px';
	},
	//鼠标拖拽范围
	degRange:function () {
		var self=this;
		var pareWidth=getBound(this.drag.parentNode).width;
		if (getStyle(this.drag,'left')<=0) {
			this.photo[0].style.width=0+'px';
			this.drag.style.left=0+'px';
		}
		if (getStyle(this.drag,'left')>=pareWidth-4) {
			this.photo[0].style.width=pareWidth-4+'px';
			this.drag.style.left=pareWidth-4+'px';
		}
	},
	//移入头像，名字显现
	textShow:function () {
		$(this.artists).mouseenter(function () {
			$(this).children('span').animate({
				opacity:1
			});
		})
	},
	//移出头像，名字消失
	textDisappear:function () {
		$(this.artists).mouseleave(function () {
			$(this).children('span').animate({
				opacity:0
			});
		})
	},
	//点击头像，照片更换
	photoChange:function () {
		var self=this;
		$(this.artists).click(function () {
			//创建右边部分照片
			createCharacter ($(this).index());
			//图片淡入
			$('.character').children('li').fadeIn('slow');
			//左边两边照片更换
			$(self.photo[0]).children('img')[0].src=aData.artist[$(this).index()].zp1;
			$(self.photo[1]).children('img')[0].src=aData.artist[$(this).index()].zp2;
			character ();
		})
	}
}
var left=new ContentLeft($('#con_left')[0]);
left.originalSize();
left.dragDown();
left.textShow();
left.textDisappear();
left.photoChange();
//构造函数,内容右半部分操作
var ContentRight=function (obj) {
	this.lis=obj.querySelectorAll('.character li');
	this.onOff=true;
}
ContentRight.prototype={
	constructor:ContentRight,
	//滚轮滚动，图片调换位置
	mScroll:function(){
		var self=this;
		document.addEventListener('DOMMouseScroll',fn,false);
		document.onmousewheel=fn;
		function fn (ev) {
			var n;
			if (ev.detail) {
				n=-ev.detail;
			} else{
				n=ev.wheelDelta;
			}
			if (n<0) {
				self.downRoll();
			} else{
				self.upperRoll();
			}
		}
	},
	//鼠标向上滑动
	upperRoll:function () {
		var self=this;
		//console.log(1,this);
		//开关关闭滚轮事件无作用
		if (!this.onOff) {
			return;
		}
		//滚轮滚动时，开关关闭
		this.onOff=false;
		for (let i=0;i<this.lis.length;i++) {
			//判断li当前的left值是否为0，如果不为0，则向前移动
			if (getStyle(this.lis[i],'left')!=0) {
				mTween(this.lis[i],'left',getStyle(self.lis[i],'left')-200,500,'linear');
			}else{
				//最前面的li淡出后移动最后面再淡入
				$(this.lis[i]).fadeOut(350,function(){
				   	$(self.lis[i]).css({
						left:'800px'
					}).fadeIn(350);
				});
			}
		}
		//定时器延时打开开关
		setTimeout(function () {
			self.onOff=true;
			//定时器最短时间为500，即为屏幕滚动完为止。实际时间为等屏幕中所有运动加载完所用的时间
		},700);
		//滚动滚轮式影评层消失
		self.bgDisappear();
	},
	//鼠标向下滑动
	downRoll:function () {
		var self=this;
		//开关关闭滚轮事件无作用
		if (!this.onOff) {
			return;
		}
		//滚轮滚动时，开关关闭
		this.onOff=false;
		for (let i=0;i<this.lis.length;i++) {
			//判断li当前的left值是否为800，如果不为800，则向后移动
			if (getStyle(this.lis[i],'left')!=800) {
				mTween(this.lis[i],'left',getStyle(self.lis[i],'left')+200,500,'linear');
			}else{
				//最后面的li淡出后移动最前面再淡入
				$(this.lis[i]).fadeOut(350,function(){
				   	$(self.lis[i]).css({
						left:'0px'
					}).fadeIn(350);
				});
			}
		}
		//定时器延时打开开关
		setTimeout(function () {
			self.onOff=true;
			//定时器最短时间为500，即为屏幕滚动完为止。实际时间为等屏幕中所有运动加载完所用的时间
		},700);
		//滚动滚轮式影评层消失
		self.bgDisappear();
	},
	//点击li,影评出现
	click:function () {
		var self=this;
		var height=getStyle(this.lis[0],'height');
		for (let i=0;i<this.lis.length;i++) {
			$(this.lis[i]).click(function () {
				//全部影评层消失
				self.bgDisappear();
				//影评层出现高度，文字部分显示
				mTween($(self.lis[i]).children('.bg')[0],'height',height,500,'linear',function () {
					$($(self.lis[i])).find('.comment').fadeIn(500);
				});
			});
		}
	},
	//影评层消失
	bgDisappear:function () {
		//影评层的高度全部设置为0
		$(this.lis).children('.bg').css({
			height:'0px'
		});
		//影评层的内容部分全部隐藏
		$(this.lis).find('.comment').css({
			display:'none'
		});
	}
}
//创建character对象
function character () {
	var character=new ContentRight($('#con_right')[0]);
	character.mScroll();
	character.click();
}
character ();

