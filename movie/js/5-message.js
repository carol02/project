//清除所有的键值对
//localStorage.clear();
//获取屏幕的原始宽高
var winHei=window.innerHeight;
document.body.style.height=winHei+'px';
var winWid=window.innerWidth;
document.body.style.width=winWid+'px';
//验证码背景颜色
var bgArr=[
	'-webkit-linear-gradient(#fff,#333)',
	'-webkit-linear-gradient(#000,#f00 50%,#090)',
	'-webkit-linear-gradient(0deg,#000 20%,#f00 50%,#090 80%)',
	'-webkit-linear-gradient(45deg,#000,#f00 50%,#090)'
];
$('.verify ul')[0].style.background=bgArr[0];
//声明arr数组，用来存储数据，并且这个数组的内容应该和localStorage的内容保持一致
var arr=[];
//当页面加载完成的时候，把localStorage里面的内容添加到数组中
if (localStorage.getItem('data')) {
    arr = localStorage.getItem('data').split('#');
}
//刷新页面时根据localStorage内容创建留言板内容
createMessage();
//留言板信息输入板块
var Import=function (obj) {
	this.nam=obj.querySelector('.imp_name input');
	this.detail=obj.querySelector('.imp_detail textarea');
	this.but=obj.querySelector('.button');
	this.prompt=obj.querySelectorAll('.imp_con p');
	this.verify=obj.querySelector('.verify ul');
	this.jud=obj.querySelector('.judge');
}
Import.prototype={
	constructor:Import,
	//点击发表按钮，生成留言内容
	creatText:function () {
		var self=this;
		/*this.namNum=0;
		this.detNum=0;*/
		this.but.onclick=function () {
			//判断填写内容是否完全
			self.judge();
			//判断验证码是否填写正确
			if (!judgePass ()) {
				return;
			}
			//如果传入的用户名或者留言内容为空则return
			if($(self.detail).val()==''||self.nam.value=='') {
				return;
			}
			else{
				//将留言板填写的姓名、内容、提交时的日期存到数组中
				arr.unshift(getTime ());
				arr.unshift(self.nam.value);
				//判断输入内容是否超过60，如果超过60，截取前60字符
				if ($(self.detail).val().length>=60) {
					arr.unshift($(self.detail).val().substring(0,60)+'...');
				}else{
					arr.unshift($(self.detail).val());
				}
				//更新localStorage中数据
				updateData();
				//创建留言内容
				createContent ($(self.detail).val(),self.nam.value);
				//背景图片变换，位置变化
				mesBgPosition (1);
				//将留言板填写区域重置
				self.nam.value='';
				self.detail.value='';
				self.jud.value='';
				self.verify.onclick();
			}
		}
	},
	//判断填写内容是否完全
	judge:function () {
		//判断是否输入用户名
		if (this.nam.value=='') this.prompt[0].style.height='20px';
		if (this.nam.value!=='') this.prompt[0].style.height='0px';
		//判断是否输入留言内容
		if (this.detail.value=='') this.prompt[1].style.height='20px';
		if (this.detail.value!=='') this.prompt[1].style.height='0px';
	},
	//点击验证码，切换数字
	numChange:function () {
		var self=this;
		this.verify.onclick=function () {
			this.style.background=bgArr[Math.ceil(Math.random()*4)];
			for (var i = 0; i < this.children.length; i++) {
				//验证码中四个数是0~9的随机数
				this.children[i].innerHTML=Math.floor(Math.random()*10)==10?9:Math.floor(Math.random()*10);
				//验证码数字随机旋转
				if (i%2!==0) {
					this.children[i].style.transform='rotate('+60*Math.random()+'deg)';
				}else{
					this.children[i].style.transform='rotate(-'+60*Math.random()+'deg)';
				}
			}
		}
	}
}
var imp=new Import(getId('import'));
imp.creatText();
imp.numChange();
//生成留言板内容
function createContent (text,name) {
	var str='';
	var list=document.querySelector('#message .list');
	//判断输入内容是否超过60，如果超过60，截取前60字符
	if (text.length>=60) {
		str+='<li class="clause"><div class="cla_pic"><img src="img/message/1.jpg"/></div><div class="cla_text"><p>'+text.substring(0,60)+'...</p><p><span>'+name+'</span><em>'+getTime ()+'</em></p></div></li>';
	}else{
		str+='<li class="clause"><div class="cla_pic"><img src="img/message/1.jpg"/></div><div class="cla_text"><p>'+text+'</p><p><span>'+name+'</span><em>'+getTime ()+'</em></p></div></li>';
	}
	//list.innerHTML+=str;
	if(list.children.length==0){
		list.innerHTML=str;
	}else{
		list.innerHTML=str+list.innerHTML;
	}
	mTween(list.firstElementChild,'marginLeft',0,500,'backOut');
}
//判断验证码
function judgePass () {
	//获取验证码
	var str='';
	for (var i=0;i<$('.verify ul')[0].children.length;i++) {
		str+=$('.verify ul li')[i].innerHTML;
	}
	//验证码输入正确返回true，验证输入错误返回false
	if ($('.judge')[0].value==str) {
		return true;
	}else{
		return false;
	}
}
//监听storage事件
window.onstorage = function(e) {
    //如果修改时list
    if (e.key == 'data') {
        //判断list是否有值
        if (localStorage.getItem('data')) {
            arr = localStorage.getItem('data').split('#');
        } else {
            arr = [];
        }
        createMessage();
    }
}
//更新localStorage数据
function updateData() {
    localStorage.setItem('data', arr.join('#'));
}
//创建留言板内容
function createMessage() {
	var str='';
	var list=document.querySelector('#message .list');
	//如果数组中没有内容,则背景图片不变化
	if (arr.length!=0) {
		//背景图片变换，位置变化
		mesBgPosition (arr.length/3);
	}
	for (var i=0; i<arr.length;) {
		str+='<li class="clause" style="margin-left:0px;"><div class="cla_pic"><img src="img/message/1.jpg"/></div><div class="cla_text"><p>'+arr[i]+'</p><p><span>'+arr[i+1]+'</span><em>'+arr[i+2]+'</em></p></div></li>';
        i=i+3;
    }
    list.innerHTML=str;
}
function mesBgPosition (num) {
	//背景图片往下移
	$('#messageBg').css({
		top:(getStyle($('#messageBg')[0],'top')+num*106)+'px'
	})
	//背景图片变换
	$('#messageBg img').eq(0).css({
		opacity:0
	})
	$('#messageBg img').eq(1).css({
		opacity:1
	})
}
