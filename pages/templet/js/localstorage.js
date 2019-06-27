//localstorage.js
PageDefine(function(Page,$){
	"use strict";
	
	let appobj=this.getApp();
	let apiobj=this.getApi();

	async function pageinit(page){
		var setkvbutobj=$("#setkvbut");
		setkvbutobj.addEventListener("tap",function(){
			  apiobj.setStorage("title","hello,H52App！");
			  $("#resultpanel").innerHTML='<label class="resulttxt">操作：apiobj.setStorage("title","hello,H52App！");</label>'
		})	

		var getkvbutobj=$("#getkvbut");
		getkvbutobj.addEventListener("tap",function(){
			var rsstr=apiobj.getStorage("title");
			$("#resultpanel").innerHTML='<label class="resulttxt">操作：apiobj.getStorage("title");>'+rsstr+'</label>'
		})	

		var delkvbutobj=$("#delkvbut");
		delkvbutobj.addEventListener("tap",function(){
			apiobj.removeStorage("title");
			$("#resultpanel").innerHTML='<label class="resulttxt">操作：apiobj.removeStorage("title");</label>'
		})
	}

	Page({
			"pageId":"localstorage",
			"pageName":"本地数据存储",
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