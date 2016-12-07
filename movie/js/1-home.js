//获取屏幕宽高
var winWid=window.innerWidth;
document.body.style.width=winWid+'px';
var winHei=window.innerHeight;
document.body.style.height=winHei+'px';
//获取元素
var home_r=queSel('#home_r');
var logEm=queSel('#logo em');
var logDance=queSel('#logo div');
var logImgs=queSelAll('#logo div img');
var imgs=queSel('#home_r .imgs');
var str='';

/*提示层*/
$('#promptBrowser').animate({
	opacity:1,
	marginTop:'-90px'
},'2000',function () {
	setTimeout(function () {
		$('#promptBrowser').css({
			display:'none'
		})
	},1600)
})

//生成home页面内容部分
for (var i=0;i<25;i++) {
	str+='<li><img src="img/home/home_r/'+(i+1)+'.png"/></li>';
}
imgs.innerHTML+=str;

var Slide=function (obj) {
	this.obj=obj;
	this.minLeft=getPos(home_r).width-getPos(this.obj).width;
}
Slide.prototype={
	constructor:Slide,
	//鼠标按下
	dragDown:function(){
		var self=this;
		home_r.onmousedown=function (ev) {
			ev=ev||event;
			self.disx=ev.clientX;
			self.left=self.obj.offsetLeft;
			self.num=0;
			self.dragMove();
			self.dragUp();
			return false;
		}
	},
	//鼠标按下移动
	dragMove:function(){
		var self = this;
		this.arr=[];
		document.onmousemove = function(ev){
			ev=ev||event;
			self.x = ev.clientX - self.disx;
			self.ifMove();
			self.roundTrip();
			//往右边移动时限定范围
			if (self.left+self.x>44) {
				//移动超过范围时卡通小图像出现
				$('#home_r .minImgLeft').css({
					left:'0px'
				});
				self.obj.style.left = 44+'px';
				return;
			}
			//往左边移动时限定范围
			else if (self.left+self.x<self.minLeft-44) {
				//移动超过范围时卡通小图像出现
				$('#home_r .minImgRight').css({
					right:'0px'
				});
				self.obj.style.left = self.minLeft-44+'px';
				return;
			}else{
				self.obj.style.left = self.left+self.x+'px';
			}
		};
	},
	//鼠标抬起
	dragUp:function(){
		var	self=this;
		document.onmouseup=function (ev) {
			this.onmouseup = this.onmousemove = null;
			self.moveRange();
			self.moveContinue();
			$('#home_r .dragRemind').css({
				display:'none'
			});
		}
	},
	//鼠标按下，但停止运动
	ifMove:function () {
		var self=this;
		this.timer=setTimeout(function () {
			if (this.preNum==this.num) {
				self.num=0;
				self.arr=[];
				clearTimeout(self.timer);
			}
			this.preNum=this.num;
		},3000);
	},
	//图片移动范围
	moveRange:function () {
		var endLeft=this.obj.offsetLeft;
		if (endLeft>0) {
			mTween(this.obj,'left',0,300,'linear',function () {
				//图片移到原位置时卡通小图像消失
				$('#home_r .minImgLeft').css({
					left:'-40px'
				});
			});
		}
		if (endLeft<this.minLeft) {
			mTween(this.obj,'left',this.minLeft,300,'linear',function () {
				//图片移到原位置时卡通小图像消失
				$('#home_r .minImgRight').css({
					right:'-40px'
				});
			});
		}
	},
	//鼠标按下，来回移动
	roundTrip:function () {
		var len=this.arr.length;
		//将移动数据存到数组中
		this.arr.push(this.x);
		//判断是否来回拖动
		if (len>=3) {
			if (this.arr[len-1]-this.arr[len-2]>0&&this.arr[len-2]-this.arr[len-3]>0||this.arr[len-1]-this.arr[len-2]<0&&this.arr[len-2]-this.arr[len-3]<0) {
				this.num++;
			}else{
				this.num=0;
				this.arr=[];
			}
		}
	},
	//鼠标抬起后，图片继续运动一段距离
	moveContinue:function () {
		var endLeft=this.obj.offsetLeft;
		//仅仅是点击、抬起鼠标，没有移动鼠标的话，抬起鼠标时不继续移动
		if (this.arr.length<3) {
			return;
		}
		//如果图片已经移动出规定范围，则图片停止继续运动
		if (endLeft>0||endLeft<this.minLeft) {
			return;
		}
		//鼠标抬起后继续向左滑动一段距离
		if (this.x<0) {
			if (this.left+this.x-20*this.num<this.minLeft) {
				mTween(this.obj,'left',this.minLeft,500,'easeOut');
			}else{
				mTween(this.obj,'left',this.left+this.x-30*this.num,500,'easeOut');
			}
		}
		//鼠标抬起后继续向右滑动一段距离
		if (this.x>0) {
			if (this.left+this.x+20*this.num>0) {
				mTween(this.obj,'left',0,500,'easeOut');
			}else{
				mTween(this.obj,'left',this.left+this.x+30*this.num,500,'easeOut');
			}
		}
	}
}
//获取元素属性
function getPos(obj){
	return obj.getBoundingClientRect();
}
//鼠标控制图片移动
var ulSlide=new Slide(imgs);
ulSlide.dragDown();
ulSlide.dragMove();
ulSlide.dragUp();
//logo文字图片移入跳动，构造函数
var Logo=function (obj) {
	this.imgs=obj.getElementsByTagName('img');
}
Logo.prototype={
	constructor:Logo,
	//鼠标移入，图片跳动
	logoOver:function () {
		var self=this;
		logEm.onmouseover=function () {
			for (var i=0;i<self.imgs.length;i++) {
				self.imgsDance (i,'marginTop',20);
			}
			return false;
		};
	},
	//鼠标移出图片跳动停止
	logoOut:function () {
		var self=this;
		logEm.onmouseout=function () {
			for (var i=0;i<self.imgs.length;i++) {
				clearInterval(self.imgs[i].lc);
			}
		};
	},
	//图片跳动
	imgsDance:function (obj,attr,target) {
		var self=this;
		this.timer=setTimeout(function () {
			mTween(self.imgs[obj],attr,-target,250,'linear',function () {
				mTween(self.imgs[obj],attr,target,500,'linear',function () {
					mTween(self.imgs[obj],attr,0,250,'linear');
				});
			});
		},250*obj);
	}
}
var logDan=new Logo(logDance);
logDan.logoOver();
//移入音乐播放提示图片，图片消失，音乐播放按钮出现
$('.musicRemind').mouseover(function () {
	$('.musicRemind').css({
		display:'none'
	});
	$('#music').animate({
		opacity:1
	},'slow')
});
//音频播放
var musArr=['1','2','3','4'];
var musNum=0;
var musOnOff=true;
//点击播放上一首音频
$('#music li').eq(0).click(function () {
	//点击上一首歌曲时全局开关重新打开
	musOnOff=true;
	musNum--;
	if (musNum<0) {
		musNum=musArr.length-1;
	}
	//切换歌曲后让播放歌曲按钮重新执行
	playMusic ();
	//给当前点击的子集图片添加className
	addClassName (0);
})
//点击播放音频
$('#music li').eq(1).click(function () {
	playMusic ();
	//给当前点击的子集图片添加className
	addClassName (1);
})
//点击暂停播放音频
$('#music li').eq(2).click(function () {
	//全局开关关闭
	musOnOff=false;
	$('audio')[0].pause(); 
	//给当前点击的子集图片添加className
	addClassName (2);
})
//点击播放下一首音频
$('#music li').eq(3).click(function () {
	//点击下一首歌曲时全局开关重新打开
	musOnOff=true;
	musNum++;
	if (musNum>musArr.length-1) {
		musNum=0;
	}
	//切换歌曲后让播放歌曲按钮重新执行
	playMusic ();
	//给当前点击的子集图片添加className
	addClassName (3);
})
//播放音乐
function playMusic () {
	//没有暂停情况下重新创建音频文件，暂停的情况下直接打开原文件继续播放
	if (musOnOff) {
		creatAudio (musNum);
	}
	$('audio')[0].play();
}
//创建音频标签
function creatAudio (num) {
	var aud=document.createElement('audio');
	var sou=document.createElement('source');
	sou.src='audio/'+musArr[num]+'.mp3';
	sou.type='audio/mpeg';
	aud.appendChild(sou);
	aud.loop='loop';
	$('.musicBox').eq(0).empty().append(aud);
}
//去除所有音乐按钮的className，给当前点击的子集图片添加className
function addClassName (index) {
	$('#music li').find('.imgScale').removeClass('imgScale');
	setTimeout(function () {
		$('#music li').eq(index).children('img').addClass('imgScale');
	},100)
}

