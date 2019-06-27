//devicesysinfo.js
PageDefine(function(Page,$){
	"use strict";
	let appobj=this.getApp();
	let apiobj=this.getApi();

	async function pageinit(page){
		var devicebutobj=$("#devicebut");
		devicebutobj.addEventListener("tap",function(){
			  apiobj.getDeviceInfo()
			 .then(function(rs){
			 	var rsstr=JSON.stringify(rs,null,1)
			 	$("#resultpanel").innerHTML='<label class="resulttxt">信息：getDeviceInfo:'+rsstr+'</label>'
			 	//console.log('getDeviceInfo',rsstr);
			 })
		})	

		var systembutobj=$("#systembut");
		systembutobj.addEventListener("tap",function(){
			 apiobj.getSystemInfo()
			 .then(function(rs){
			 	var rsstr=JSON.stringify(rs,null,1)
			 	$("#resultpanel").innerHTML='<label class="resulttxt">信息：getSystemInfo:'+rsstr+'</label>'
			 	//console.log('getSystemInfo',rsstr);
			 })
		})	
	}

	Page({
			"pageId":"devicesysinfo",
			"pageName":"设备、系统信息",
			"onLoad":function(){
				var page=this;
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));
				pageinit(page)
				.catch(function(err){
					console.error(page.pageName+'>pageinit>'+err.message,err)
				});
			},
			"goback":function(){
				apiobj.closePage();
			}
	})
})