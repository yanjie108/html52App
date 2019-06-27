//actionsheet.js
PageDefine(function(Page,$){
	"use strict";
	
	let appobj=this.getApp();
	let apiobj=this.getApi();

	async function pageinit(page){
		var show_alertbutobj=$("#show_alertbut");
		show_alertbutobj.addEventListener("tap",function(){
			apiobj.alert("已经成功提交并保存！","",function(result){
				console.log("alert1>>>点了确定>"+result)
			})
		})	
		var show_alerttitlebutobj=$("#show_alerttitlebut");
		show_alerttitlebutobj.addEventListener("tap",function(){
			apiobj.alert("获取内容失败请重试！","信息提示",function(result){
				console.log("alert2>>>点了确定>"+result)
			})
		})	
		var show_confirmbutobj=$("#show_confirmbut");
		show_confirmbutobj.addEventListener("tap",function(){
			apiobj.confirm("您确定要删除吗？","删除确认",function(result){
				console.log("confirm>>>"+result);
			})
		})	
	}

	Page({
			"pageId":"dialog",
			"pageName":"对话框",
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