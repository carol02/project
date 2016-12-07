//获取元素
function getId(id){
	return document.getElementById(id);
}
function getTagName(tagName,context){
	return (context||document).getElementsByTagName(tagName);
}
function queSelAll(selector){
	return document.querySelectorAll(selector);
}
function queSel(selector,context){
	return (context||document).querySelector(selector);
}
//获取角度
function getAngle(x1,y1,x2,y2) {
	//直角边长
	var x=Math.abs(x1-x2);
	var y=Math.abs(y1-y2);
	return 360*Math.atan(y/x)/(2*Math.PI);
}
//向列表中一子节点的后面插入一个项目
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
//获取元素属性
function getBound (obj) {
	return obj.getBoundingClientRect();
}
//获取元素样式
function getStyle(ele,attr){
	return parseFloat(ele.currentStyle?ele.currentStyle[attr]:getComputedStyle(ele)[attr]);
}
//获取时间
function getTime () {
	var date=new Date();
	//获取年份
	var year=date.getFullYear();
	//获取月份
	var month=date.getMonth()+1;
	//获取天
	var d=date.getDate();
	//获取小时
	var h=date.getHours();
	//获取分钟
	var min=date.getMinutes();
	//获取秒钟
	var se=date.getSeconds();
	return year+'-'+toTwo (month)+'-'+toTwo (d)+' '+' '+toTwo (h)+':'+toTwo (min)+':'+toTwo (se);
}
//补零
function toTwo (num) {
	if (num<10) {
		return '0'+num;
	}else{
		return ''+num;
	}
}