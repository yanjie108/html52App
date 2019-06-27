//cart.js
PageDefine(function(Page,$){
	"use strict";
	
	async function pageinit(page){
		 
	}

	Page({
			"pageId":"cart",
			"pageName":"购物车",
			"onLoad":function(){
				var page=this;
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));
				pageinit(page)
				.catch(function(err){
					console.error(page.pageName+'>pageinit>'+err.message,err)
				});
			}
	})
})