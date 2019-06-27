//sample.js
PageDefine(function(Page,$){
	"use strict";
	
	let appobj=this.getApp();
	let apiobj=this.getApi();
 	//let utilobj=this.require("util");

	async function pageinit(page){
		 
	}

	Page({
			"pageId":"mysample",
			"pageName":"事例样品",
			"onLoad":function(){
				var page=this;
				console.log(page);
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));
				pageinit(page)
				.catch(function(err){
					console.error(page.pageName+'>pageinit>'+err.message,err)
				});
			},
			"onShow":function(){

			}

	})
})