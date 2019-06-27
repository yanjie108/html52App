//webframe.js
PageDefine(function(Page,$){
	"use strict";
	
	let appobj=this.getApp();
	let appExports=appobj.appExports;
	let apiobj=this.getApi();
	async function pageinit(page){
		if(request_parms && request_parms.url){
			//request_parms.url="https://www.baidu.com";
			var htmlstr='<iframe id="webview" bindload="webviewLoad" src="'+request_parms.url+'" scrolling="auto" frameborder="0" marginheight="0" marginwidth="0"  style="width:100%;height:100%"  allowtransparency="true"></iframe>'
			var iframecontentobj=$("#iframecontent");
			iframecontentobj.innerHTML=htmlstr;
		}
	}
	var exports={};
	exports["title"]="Hello H52APP WebView";
	exports["sayhello"]=function(str){
		return "hello "+str
	}
	exports["chooseImage"]=function(){
		return appExports.chooseImage();
	}
	Page({
			"pageId":"webframe",
			"pageName":"嵌入网页",
			"onLoad":function(){
				var page=this;
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));

				pageinit(page)
				.catch(function(err){
					console.error('pageinit>'+err.message,err)
				});
			},
			"goback":function(){
				var webviewobj=$("#webview");
				webviewobj.goBack();
			},
			"webviewLoad":function(){
				var target=this.target;
				var dataset=target.dataset;
				if(dataset && dataset.title){
					var frametitleobj=$("#frametitle");
					frametitleobj.innerText=dataset.title;
				}
			}
			,"exports":exports
	})
})