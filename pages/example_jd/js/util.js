//util.js
ModuleDefine(function(exports){
	"use strict";
	//指定模块名称，为了按模块名称引入
	exports.name="util"

	let appobj=this.getApp();
	let appExports=appobj.appExports;
	//console.log(appobj);
	let apiobj=this.getApi();
	//自定义业务方法
	function sayHello(name) {
	  console.log('module_utils.js  Hello '+name+' !')
	}
	function data2str(_data,format){
		format=format||"yyyy-MM-dd hh:mm:ss";
		var o = {
			"M+" : _data.getMonth()+1, //month
			"d+" : _data.getDate(),    //day
			"h+" : _data.getHours(),   //hour
			"m+" : _data.getMinutes(), //minute
			"s+" : _data.getSeconds(), //second
			"q+" : Math.floor((_data.getMonth()+3)/3),  //quarter
			"S" : _data.getMilliseconds() //millisecond
		};
		//console.log(o);
		if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
			(_data.getFullYear()+"").substr(4 - RegExp.$1.length));
		for(var k in o)if(new RegExp("("+ k +")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length==1 ? o[k] :
					("00"+ o[k]).substr((""+ o[k]).length));
		return format;
	}
	//长时间，形如 (2003-12-05 13:04:06)
	function str2date(str){
		var strlen=str.length;
		if(strlen<19){
			if(strlen==10){
				str+=" 00:00:00";
			}else if(strlen==16){
				str+=":00";
			}
		}
		var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
		var r = str.match(reg);
		if(r!=null){

			var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);
			if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]){
				return d;
			}
		}
		return null;
	}
	

	//暴露业务方法
	exports.sayHello = sayHello;
	exports.str2date = str2date;
	exports.data2str = data2str;

})