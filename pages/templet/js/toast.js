//actionsheet.js
PageDefine(function(Page,$){
	"use strict";
	
	let appobj=this.getApp();
	let apiobj=this.getApi();

	async function pageinit(page){
		var show_ok_toastobj=$("#show_ok_toast");
		show_ok_toastobj.addEventListener("tap",function(){
			apiobj.showToast("已完成了！")
		})
		var show_ok_loadingobj=$("#show_ok_loading");
		show_ok_loadingobj.addEventListener("tap",function(){
			apiobj.showLoading();
			apiobj.setTimeout(function() {
				 apiobj.hideLoading();
			},3000)
		})
		var show_ok_txtloadingobj=$("#show_ok_txtloading");
		show_ok_txtloadingobj.addEventListener("tap",function(){
			apiobj.showLoading("正在登录");
			apiobj.setTimeout(function() {
				 apiobj.hideLoading();
			},3000)
		})
		
	}

	Page({
			"pageId":"actionsheet",
			"pageName":"弹出式菜单",
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