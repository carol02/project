//获取元素
var nav=getId('nav');
var content=getId('content');
var con=queSel('#content .con');
var abo=queSel('#content .about');
var lis=queSelAll('#content .about li');
var bgImgs=queSelAll('#content .bg img');
//作者简介每行文字top值设置
for (var i=0;i<lis[0].children.length;i++) {
	lis[0].children[i].style.top=i*40+'px';
}
for (var i=0;i<lis[1].children.length;i++) {
	lis[1].children[i].style.top=i*40+'px';
}
//获取屏幕的原始宽高
var winHei=window.innerHeight;
document.body.style.height=winHei+'px';
var winWid=window.innerWidth;
document.body.style.width=winWid+'px';
//第二屏
var friend=queSel('#content .friend');
friend.style.left=winWid+'px';
//第三屏
var seatwork=queSel('#content .seatwork');
seatwork.style.left=2*winWid+'px';
//第四屏
var miaov=queSel('#content .miaov');
miaov.style.left=3*winWid+'px';
//定义变量
var num=0;
var bgNum=0;
//第四屏文字内容
var arr=''
//构造函数，导航栏操作
var Nav=function (obj) {
	this.nav=obj;
	this.strongs=obj.getElementsByTagName('strong');
	this.spans=obj.getElementsByTagName('span');
	this.con=obj.nextElementSibling.getElementsByClassName('con')[0];
	this.conBgImg=obj.nextElementSibling.querySelectorAll('.bg img');
}
Nav.prototype={
	constructor:Nav,
	//导航栏按键点击，整屏切换
	buttonClick:function(){
		var self=this;
		this.left=0;
		for (var i=1;i<this.spans.length;i++) {
			this.spans[i].leo=i;
			this.spans[i].onOff=true;
			this.spans[i].onclick=function () {
				//点击按钮时，对应的开关是关的话不能进行以下操作
				if (!this.onOff) {
					return;
				}
				//如果此时为第二屏，且五张图片运动没有结束的话，不能进行屏幕切换
				if (parseFloat(self.left)==-1*winWid&&num!==0) {
					return;
				}
				//点击按钮为第二个的话，文字移入；如果不是，文字移出
				if (this.leo==1) {
					if (parseFloat(self.left)==0) {
						return;
					}else{
						aboAu.textMove();
					}
				} else{
					aboAu.textMoveOut();
				}
				//点击按钮为第三个的话，图片掉下；如果不是，图片返回原来位置
				if (this.leo==2) {
					if (parseFloat(self.left)==-1*winWid) {
						return;
					}else{
						friPla.imgDown();
					}
				}else{
					friPla.imgGoBack();
				}
				//点击按钮为第四个的话，文字移入；如果不是，文字返回原来位置
				if (this.leo==4) {
					if (parseFloat(self.left)==-3*winWid) {
						return;
					}else{
						miaPla.textMoveIn();
					}
				}else{
					miaPla.textMoveOut();
				}
				//点击按钮为第四个的话且此时的屏幕为第三屏时，点击无效
				if (parseFloat(self.left)==-2*winWid&&this.leo==3) {
					return;
				}
				//点击按钮为第五个的话且此时的屏幕为第四屏时，点击无效
				if (parseFloat(self.left)==-3*winWid&&this.leo==4) {
					return;
				}
				//背景图片绕X轴旋转90度，消失
				$(self.conBgImg[1]).css({
					transform: 'perspective(450px) rotateX(90deg)'
				});
				//屏幕切换
				self.left=-(this.leo-1)*winWid+'px';
				self.con.style.left=self.left;
				//背景图片变化，绕X轴旋转-90度，出现在屏幕中
				self.backgroundTransform();
				//开关关闭
				this.onOff=false;
			}
		}
	},
	//背景图片变换
	backgroundTransform:function () {
		var self=this;
		//判断当前屏幕的位置，改变背景图片，和对应的开关值
		switch (parseFloat(this.left)){
			case 0*winWid:
				setTimeout(function () {
					$(self.conBgImg[1]).css({
						transform: 'perspective(450px) rotateX(0deg)'
					});
					self.conBgImg[1].className='';
					self.conBgImg[1].src='img/about/bgImg/1.jpg';
					self.spans[1].onOff=true;
				},500)
				break;
			case -1*winWid:
				setTimeout(function () {
					$(self.conBgImg[1]).css({
						transform: 'perspective(450px) rotateX(0deg)'
					});
					self.conBgImg[1].className='';
					self.conBgImg[1].src='img/about/bgImg/2.jpg';
					self.spans[2].onOff=true;
				},500)
				break;
			case -2*winWid:
				setTimeout(function () {
					$(self.conBgImg[1]).css({
						transform: 'perspective(450px) rotateX(0deg)'
					});
					//定时器，100ms后背景加模糊效果。直接写到上面样式中会出现卡顿现象
					setTimeout(function () {
						self.conBgImg[1].className='bgBlur';
					},500);
					self.conBgImg[1].src='img/about/seatwork/bg_'+bgNum+'.png';
					self.spans[3].onOff=true;
				},500)
				break;
			case -3*winWid:
				setTimeout(function () {
					$(self.conBgImg[1]).css({
						transform: 'perspective(450px) rotateX(0deg)'
					});
					self.conBgImg[1].className='';
					self.conBgImg[1].src='img/about/bgImg/3.jpg';
					self.spans[4].onOff=true;
				},500)
				break;
			default:
				break;
		}
	},
	//鼠标移入导航时，导航子项显示出来
	menuShow:function () {
		var self=this;
		this.nav.onmouseover=function () {
			for (var i=0;i<self.strongs.length;i++) {
				self.strongs[i].style.transform='rotateX(0deg)';
			}
		};
	},
	//鼠标移出导航时，导航子项隐藏
	menuOut:function () {
		var self=this;
		this.nav.onmouseout=function () {
			for (var i=0;i<self.strongs.length;i++) {
				self.strongs[i].style.transform='';
			}
		};
	}
}
var navSpans=new Nav(nav);
navSpans.buttonClick();
navSpans.menuShow();
navSpans.menuOut();
//作者简介
//构造函数，作者简介板块操作
var AuthorPlate=function (obj) {
	this.ems=obj.querySelectorAll('.scroll p em');
	this.span=obj.querySelector('.scroll div span');
}
AuthorPlate.prototype={
	constructor:AuthorPlate,
	//鼠标按下，拖拽圆环
	dragDown:function(){
		var self=this;
		//获取拉环原始top值
		this.top=this.ems[2].offsetTop;
		this.ems[2].onmousedown=function (ev) {
			ev=ev||event;
			self.disx=ev.clientX;
			self.disy=ev.clientY-getBound(this).top;
			self.dragMove();
			self.dragUp();
			//self.rollUp();
			return false;
		}
	},
	//鼠标向下移动，图片随着鼠标移动一点一点显示
	dragMove:function(){
		var self = this;
		document.onmousemove = function(ev){
			ev=ev||event;
			//获取拉环在X轴和Y轴上的距离
			self.x=ev.clientX-self.disx;
			self.y=ev.clientY-self.disy-getBound(self.ems[2].parentNode).top;
			//当移动的宽度大于50时，定轴圆盘停止转动，圆环和细线角度变化为0
			if (Math.abs(self.x)>=50){
				self.imgRotateCancel();
				self.degRange();
				return;
			}
			//获取当前拉环的top值
			self.topNow=parseFloat(self.ems[2].offsetTop);
			//得到拉环数值方向上移动位置与总距离的比值
			self.scale=(self.topNow-self.top)/320;
			if (self.y<self.top) self.y=self.top;
			if (self.y>=320+self.top) self.y=320+self.top;
			$(self.ems[1]).css({
				height:self.topNow+15
			});
			$(self.ems[2]).css({
				top:self.y
			});
			$(self.span).css({
				height:self.scale*440
			});
			//拖拽拉环时拉环和细线角度变化
			self.degDrag();
			self.degRange();
			self.imgRotate();
		};
	},
	//鼠标抬起，图片显示停止
	dragUp:function(){
		var	self=this;
		document.onmouseup=function () {
			self.mouseUp=true;
			self.degGoBack();
			self.imgRotateCancel();
			this.onmouseup = this.onmousemove = null;
		}
	},
	//收起按钮，图片收起
	rollUp:function () {
		var self=this;
		self.scale=0;
		self.imgRotateAnt();
		//细线长度变为0
		mTween(self.ems[1],'height',40,600,'linear',function () {
			self.imgRotateCancel();
		});
		//拉环回到初始位置
		mTween(self.ems[2],'top',40,600,'linear');
		//照片高度变为0，照片消失
		mTween(self.span,'height',0,600,'linear');
	},
	//拖拽圆环过程中，圆环和细线角度变化
	degDrag:function () {
		var self=this;
		//获取旋转角度
		if (this.x>=0) {
			this.deg=90-getAngle(0,0,this.x,this.topNow);
			$(this.ems[1]).css({
				transform: 'rotate(-'+self.deg+'deg)'
			});
			$(this.ems[2]).css({
				transformOrigin: 'center -'+self.topNow+'px',
				transform: 'rotate(-'+self.deg+'deg)',
			});
		}else{
			this.deg=90-getAngle(0,0,this.x,this.topNow);
			$(this.ems[1]).css({
				transform: 'rotate('+self.deg+'deg)'
			});
			$(this.ems[2]).css({
				transformOrigin: 'center -'+self.topNow+'px',
				transform: 'rotate('+self.deg+'deg)',
			});
		}
	},
	//鼠标抬起时，圆环和细线角度变化为0
	degGoBack:function () {
		var self=this;
		if (this.mouseUp==true) {
			if (this.x!=0) {
				var nowX=Math.abs(this.x);
				this.timerGoBack=setInterval(function () {
					nowX--;
					self.deg=90-getAngle(0,0,nowX,self.topNow);
					if (self.deg==0) {
						self.rollUp();
						clearInterval(self.timerGoBack);
						self.mouseUp=false;
					}
					//细线角度变化
					$(self.ems[1]).css({
						transform: 'rotate(-'+self.deg+'deg)'
					});
					//圆环角度变化
					$(self.ems[2]).css({
						transformOrigin: 'center -'+self.topNow+'px',
						transform: 'rotate(-'+self.deg+'deg)',
					});
				},10);
			}
		}
	},
	//鼠标拖拽时，圆环和细线角度变化的最大值
	degRange:function () {
		var self=this;
		this.time=0;
		if (Math.abs(this.x)>=50) {
			document.onmouseup = document.onmousemove = null;
			var maxX=this.x;
			this.timer=setInterval(function () {
				if (self.x>=0) {
					maxX--;
					self.deg=90-getAngle(0,0,maxX,self.topNow);
					if (self.deg==0) {
						self.rollUp();
						clearInterval(self.timer);
					}
					$(self.ems[1]).css({
						transform: 'rotate(-'+self.deg+'deg)'
					});
					$(self.ems[2]).css({
						transformOrigin: 'center -'+self.topNow+'px',
						transform: 'rotate(-'+self.deg+'deg)'
					});
				}else{
					maxX++;
					self.deg=90-getAngle(0,0,maxX,self.topNow);
					if (self.deg==0) {
						self.rollUp();
						clearInterval(self.timer);
					}
					$(self.ems[1]).css({
						transform: 'rotate('+self.deg+'deg)'
					});
					$(self.ems[2]).css({
						transformOrigin: 'center -'+self.topNow+'px',
						transform: 'rotate('+self.deg+'deg)'
					});
				}
			},10);
		}
	},
	//定轴圆环顺时针旋转
	imgRotate:function () {
		this.ems[0].firstElementChild.className='imgRotateClockwise';
	},
	//清除定轴圆环的className，定轴圆环停止转动
	imgRotateCancel:function () {
		this.ems[0].firstElementChild.className='';
	},
	//定轴圆环逆时针旋转
	imgRotateAnt:function () {
		this.ems[0].firstElementChild.className='imgRotateAnticlockwise';
	},
	//鼠标移入向下拉环，移除向下拉环和细线的className
	removeClassName:function () {
		var self=this;
		this.ems[2].onmouseenter=function () {
			self.ems[1].className='';
			self.ems[2].className='';
		}
	}
}
var autPla=new AuthorPlate(content);
autPla.dragDown();
autPla.removeClassName();
//构造函数，作者简介文字部分操作
var AuthorPlateText=function (obj) {
	this.lis=obj.querySelectorAll('.intro li');
}
AuthorPlateText.prototype={
	constructor:AuthorPlateText,
	//屏幕滑动文字运动出现
	textMove:function(){ 
		mTween(this.lis[0],'top',0,1000,'linear');
		mTween(this.lis[1],'top',240,1000,'linear');
	},
	//屏幕滑动文字运动出现消失
	textMoveOut:function(){ 
		setTimeout(function () {
			this.lis[0].style.top='-600px';
			this.lis[1].style.top='840px';
		},500);
	}
}
var aboAu=new AuthorPlateText(abo);
aboAu.textMove();
//朋友剪影
//构造函数，朋友剪影板块操作
var FriendPlate=function (obj) {
	this.lis=obj.querySelectorAll('ul li');
	this.ps=obj.querySelectorAll('ul li p');
	this.divs=obj.querySelectorAll('ul li div');
	this.arr=['270','100','220','50','320'];
}
FriendPlate.prototype={
	constructor:FriendPlate,
	//照片掉下
	imgDown:function(){
		var self=this;
//		this.num=0;
		for (var i=0;i<this.lis.length;i++) {
			this.ps[i].style.height=Number(this.arr[i])+100+'px';
			this.imgMove(i,Number(self.arr[i]));
		}
	},
	//图片移动
	imgMove:function (obj,target) {
		var self=this;
		setTimeout(function () {
			setTimeout(function () {
				//记录掉下图片张数,五张都掉下,才能切换屏幕
				num++;
				mTween(self.lis[obj],'top',0,400,'linear',function () {
					mTween(self.divs[obj],'top',target+100*Math.random(),500,'linear',function () {
						mTween(self.divs[obj],'top',target,200,'linear',function () {
							self.ps[obj].style.height=Number(self.arr[obj])+'px';
							//五张都掉下时，num重新赋值为0
							if (num==self.divs.length) {
								num=0;
							}
						});
					});
				});
			},1000*obj);
		},500)
	},
	//鼠标抚摸图片图片变换
	imgMouseOver:function () {
		var self=this;
		for (let i=0;i<this.divs.length;i++) {
			this.divs[i].picNum=0;
			this.divs[i].texNum=0;
			this.divs[i].onmouseenter=function () {
				//照片和文字描述计数递加
				if (self.divs[i].picNum==0) {
					self.divs[i].picNum=self.divs[i].picNum+2;
				}else{
					self.divs[i].picNum++;
				}
				self.divs[i].texNum++;
				//每次重新获取图片
				var imgs=this.querySelectorAll('img');
				//两张图片都设置为显示状态
				$(imgs).css({
					display:'block'
				})
				//第一张图片淡出
				$(imgs[0]).fadeOut('slow',function () {
					//改变显示图片的描述
					$(self.divs[i]).children('em')[0].innerHTML=aData.dear[i].ms[self.divs[i].texNum%aData.dear[i].ms.length];
					//交换两张图片位置
					insertAfter(imgs[0],imgs[1]);
					//变换第一张图片的src值
					$(this)[0].src=aData.dear[i].zp[self.divs[i].picNum%aData.dear[i].zp.length];
				})
			}
		}
	},
	//图片回到原来位置
	imgGoBack:function () {
		var self=this;
		setTimeout(function () {
			for (var i=0;i<self.lis.length;i++) {
				mTween(self.lis[i],'top',-800,80,'linear');
				self.ps[i].style.height=Number(self.arr[i])+'px';
			}
		},500)
	}
}
var friPla=new FriendPlate(friend);
friPla.imgMouseOver();
//课堂作品
//构造函数，课堂作品板块操作
var SeatWorkPlate=function (obj) {
	this.as=obj.querySelectorAll('.buttons a');
	this.divs=obj.querySelectorAll('.pictures .carouse');
	this.dance_p=obj.querySelector('.carouse .dance p');
	this.dance_lis=obj.querySelectorAll('.carouse .dance li');
	this.dot_lis=obj.querySelectorAll('.carouse .dot li');
}
SeatWorkPlate.prototype={
	constructor:SeatWorkPlate,
	//鼠标点击向下按钮，图片切换下一张
	nextClick:function(){
		var self=this;
		this.num=0;
		this.nextDeg=0;
		this.as[0].onclick=function () {
			self.nextDeg++;
			self.divs[self.num].className='nextMoveOut';
			if (self.divs[self.num].nextElementSibling) {
				self.divs[self.num].nextElementSibling.className='nextMoveIn';
			}else{
				self.divs[0].className='nextMoveIn';
				self.num=-1;
			}
			$(this).css({
				transform: 'rotate('+self.nextDeg*360/self.divs.length+'deg)' 
			});
			self.num++;
			//记录背景图片数字的变化
			bgNum++;
			if (bgNum>self.divs.length-1) {
				bgNum=0;
			}
			bgImgs[1].src='img/about/seatwork/bg_'+bgNum+'.png';
		}
	},
	//鼠标点击向上按钮，图片切换上一张
	prevClick:function(){
		var self=this;
		this.prevDeg=0;
		this.as[1].onclick=function () {
			self.prevDeg++;
			self.divs[self.num].className='prevMoveOut';
			if (self.divs[self.num].previousElementSibling) {
				self.divs[self.num].previousElementSibling.className='prevMoveIn';
			}else{
				self.divs[self.divs.length-1].className='prevMoveIn';
				self.num=self.divs.length;
			}
			$(this).css({
				transform: 'rotate(-'+self.prevDeg*360/self.divs.length+'deg)' 
			});
			self.num--;
			//记录背景图片数字的变化
			bgNum--;
			if (bgNum<0) {
				bgNum=self.divs.length-1;
			}
			bgImgs[1].src='img/about/seatwork/bg_'+bgNum+'.png';
		}
	},
	//轮播图的图1的操作
	carousel1:function () {
		var self=this;
		this.divs[0].onOff=true;
		this.divs[0].onmouseover=function () {
			if (!this.onOff) {
				return;
			}
			this.onOff=false;
			mTween(self.divs[0].querySelector('.spaceman'),'top',150,1500,'linear',function () {
				mTween(self.divs[0].querySelector('.spaceman'),'top',190,1500,'linear',function () {
					self.divs[0].onOff=true;
				});
			});
			mTween(self.divs[0].querySelector('.spaceman'),'right',20,1500,'linear',function () {
				mTween(self.divs[0].querySelector('.spaceman'),'right',60,1500,'linear');
			});
		}
	},
	//轮播图的图2的操作
	carousel2:function () {
		var self=this;
		this.divs[1].onOff=true;
		this.divs[1].onmouseover=function () {
			if (!this.onOff) {
				return;
			}
			this.onOff=false;
			SeaWorkPlate.carousel2_cross();
			setTimeout(function () {
				for (i=0;i<self.dance_lis.length;i++) {
					SeaWorkPlate.carousel2_spot(i);
				}
			},1000);
		}
	},
	carousel2_cross:function () {
		var self=this;
		mTween(self.dance_p,'top',48,1000,'linear',function(){
			mTween(self.dance_p,'top',0,1000,'linear',function () {
				self.divs[1].onOff=true;
			});
		});
	},
	carousel2_spot:function (obj) {
		var self=this;
		if (obj<this.dance_lis.length/2) {
			mTween(self.dance_lis[obj],'marginTop',obj*10,500,'linear',function(){
				mTween(self.dance_lis[obj],'marginTop',0,500,'linear');
			});
		}
		if (obj>this.dance_lis.length/2){
			mTween(self.dance_lis[obj],'marginTop',(self.dance_lis.length-obj-1)*10,500,'linear',function(){
				mTween(self.dance_lis[obj],'marginTop',0,500,'linear');
			});
		}
	},
	//轮播图的图3的操作
	carousel3:function () {
		var self=this;
		this.divs[2].onmouseover=function () {
			this.children[1].className='';
			this.children[2].className='';
			this.children[1].style.transform='scale(1.15)';
			this.children[2].style.transform='scale(1.15)';
		}
		this.divs[2].onmouseout=function () {
			this.children[1].className='colorChange';
			this.children[2].className='colorChange';
			this.children[1].style.transform='scale(1)';
			this.children[2].style.transform='scale(1)';
		}
	},
	//开始给图3中按钮添加className
	addClassName:function () {
		this.as[1].className='promptClick';
	},
	//移入按钮时移入按钮的className
	removeClassName:function () {
		var self=this;
		$(this.as).mouseenter(function () {
			self.as[1].className='';
		})
	},
	//轮播图的图4的操作
	carousel4:function () {
		var self=this;
		this.divs[3].onOff=true;
		this.num=0;
		this.divs[3].onmouseover=function () {
			if (!this.onOff) {
				return;
			}
			this.onOff=false;
			for (i=0;i<self.dot_lis.length;i++) {
				SeaWorkPlate.carousel4_dot(i,'marginTop');
			}
		}
	},
	//图4的星星移动
	carousel4_dot:function (obj,attr) {
		var self=this;
		setTimeout(function () {
			mTween(self.dot_lis[obj],attr,-20,250,'linear',function () {
				mTween(self.dot_lis[obj],attr,20,500,'linear',function () {
					mTween(self.dot_lis[obj],attr,0,250,'linear',function () {
						self.num++;
						if (self.num==self.dot_lis.length) {
							self.num=0;
							self.divs[3].onOff=true;
						}
					});
				});
			});
		},250*obj);
	}
};
var SeaWorkPlate=new SeatWorkPlate(seatwork);
SeaWorkPlate.nextClick();
SeaWorkPlate.prevClick();
SeaWorkPlate.carousel1();
SeaWorkPlate.carousel2();
SeaWorkPlate.carousel3();
SeaWorkPlate.carousel4();
SeaWorkPlate.addClassName();
SeaWorkPlate.removeClassName();
//项目总结
//构造函数，项目总结板块操作
var MiaovPlate=function (obj) {
	this.em=obj.querySelector('.bar em');
	this.ul=obj.querySelector('.presentation ul')
}
MiaovPlate.prototype={
	constructor:MiaovPlate,
	//鼠标点击，准备拖拽滚轴
	barDragDown:function(){
		var self=this;
		this.scale=0;
		this.maxy=this.em.parentNode.clientHeight-this.em.offsetHeight;
		this.maxyCon=getBound(this.ul).height-this.ul.parentNode.clientHeight;
		this.parTop=getBound(this.em.parentNode).top;
		this.em.onmousedown=function () {
			self.disy=event.clientY-getBound(this).top;
			self.barDragMove();
			self.barDragUp();
			return false;
		};
	},
	//鼠标移动，拖拽滚轴，左边文字同时移动
	barDragMove:function(){
		var self=this;
		document.onmousemove=function () {
			var y=event.clientY-self.disy-self.parTop;
			if (y<0) {
				y=0;
			}
			if (y>self.maxy) {
				y=self.maxy;
			}
			self.em.style.top=y+'px';
			self.scale=y/self.maxy;
			self.ul.style.top=-self.scale*self.maxyCon+'px';
		}
	},
	//鼠标抬起，拖拽滚轴结束，左边文字移动停止
	barDragUp:function () {
		document.onmouseup=function () {
			document.onmousemove=document.onmouseup=null;
		}
	},
	//鼠标滚动，滚轴滚动，左边文字移动
	mScroll:function () {
		var self=this;
		document.addEventListener('DOMMouseScroll',fn,false);
		document.onmousewheel=fn;
		function fn(ev) {
			var n;
			if(ev.detail){
				n = -ev.detail;
			}else{
				n = ev.wheelDelta;
			}
			//向下滚动
			if(n<0){
				self.scale=self.scale+0.02;
				if (self.scale>1) {
					self.scale=1;
				}
				self.em.style.top=self.scale*self.maxy+'px';
				self.ul.style.top=-self.scale*self.maxyCon+'px';
			}
			//向上滚动
			else{
				self.scale=self.scale-0.02;
				if (self.scale<0) {
					self.scale=0;
				}
				self.em.style.top=self.scale*self.maxy+'px';
				self.ul.style.top=-self.scale*self.maxyCon+'px';
			}
			return false;
		}
	},
	//第四部分文字初始化样式
	textOriginalStyle:function () {
		var self=this;
		var arr=[[],[]];
		for (var i=0;i<this.ul.children.length;i++) {
			arr[0].push(self.ul.children[i].offsetTop+'px');
			arr[1].push(self.ul.children[i].getBoundingClientRect().width+'px');
		}
		for (var i=0;i<this.ul.children.length;i++) {
			if (i%2==0) {
				$(this.ul.children[i]).css({
					width:arr[1][i],
					position:'absolute',
					left:'800px',
					top:arr[0][i]
				});
			}
			else{
				$(this.ul.children[i]).css({
					width:arr[1][i],
					position:'absolute',
					right:'800px',
					top:arr[0][i]
				});
			}
			
		}
	},
	//文字移入
	textMoveIn:function () {
		var self=this;
		setTimeout(function () {
			for (var i=0;i<self.ul.children.length;i++) {
				//判断文字从左还是从右移入
				if (i%2==0) {
					mTween(self.ul.children[i],'left',0,1000,'easeBoth');
				}
				else{
					mTween(self.ul.children[i],'right',0,1000,'easeBoth');
				}
				
			}
		},900);
	},
	//文字移出
	textMoveOut:function () {
		var self=this;
		setTimeout(function () {
			for (var i=0;i<self.ul.children.length;i++) {
				//判断文字向左还是向右移出
				if (i%2==0) {
					mTween(self.ul.children[i],'left',800,500,'easeBoth');
				}
				else{
					mTween(self.ul.children[i],'right',800,500,'easeBoth');
				}
			}
		},900);
	},
}
var miaPla=new MiaovPlate(miaov);
miaPla.barDragDown();
miaPla.mScroll();
miaPla.textOriginalStyle();




