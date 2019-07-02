//launch.js
PageDefine(function(Page,$){
	"use strict";
	
	let apiobj=this.getApi();
	
	async function pageinit(page){
		 
	}

	Page({
			"pageId":"launch",
			"pageName":"引导开机屏",
			"onLoad":function(){
				var page=this;
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));
				pageinit(page)
				.catch(function(err){
					console.error('launch-pageinit>'+err.message,err)
				});
			},
			"gotomain":function(){ 
				console.log('-------------gotomain-------------');
				apiobj.closePage()
			}
	})
})