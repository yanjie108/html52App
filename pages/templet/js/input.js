//input.js
PageDefine(function(Page,$){
	"use strict";

	let appobj=this.getApp();
	let apiobj=this.getApi();
	
	async function pageinit(page){
		var voicenodifyobj=$("#voicenodify");
		var newmsgnodifyobj=$("#newmsgnodify");
		console.log('voicenodifyobj.checked='+voicenodifyobj.checked,'voicenodifyobj.value='+voicenodifyobj.value);
		console.log('newmsgnodifyobj.checked='+newmsgnodifyobj.checked,'newmsgnodifyobj.value='+newmsgnodifyobj.value);
		//newmsgnodifyobj.checked=true;
		voicenodifyobj.addEventListener("change",function(){ 
			console.log("voicenodifyobj.onchange",JSON.stringify(this));
		});
	}
	Page({
			"pageId":"myinput",
			"pageName":"表单Input",
			"onLoad":function(){
				var page=this;
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));
				pageinit(page)
				.catch(function (reason) {
					console.error('pageinit-error',reason)
				});
			},
			"agreeonchang":function(){
				console.log("agreeonchang=",JSON.stringify(this))
			},
			"newmsgonchang":function(){
				console.log("newmsgonchang=",JSON.stringify(this))
			},
			"goback":function(){
				apiobj.closePage();
			}
	})
})