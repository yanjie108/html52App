//navbar.js
PageDefine(function(Page,$){
	"use strict";
	
	let appobj=this.getApp();
	let apiobj=this.getApi();

	var selectnavIndex=0;
	var singleselectnavIndex=0;
	var navpanelwidth=0;
	var pageoffset=0;//当前是第几个被打开的子页面
	async function pageinit(page){
		let frame=$("#navpanel").getBoundingClientRect();
		navpanelwidth=frame.width/4;

 		pageoffset=request_parms["pageoffset"]||0;
 		if(pageoffset>0){
 			$("#pageinfo").innerText='当前是（'+pageoffset+'）个子页面';
 		}else{
 			$("#pageinfo").innerText="当前是初始页面";
 		}
 		

		var openpagebutobj=$("#openpagebut");
		openpagebutobj.addEventListener("tap",function(evt) {
			var urlparms={"pageoffset":pageoffset+1}
			apiobj.openPage("newpage","新页面","./navbar.html",urlparms);
		})
		var openwebbutobj=$("#openwebbut");
		openwebbutobj.addEventListener("tap",function(evt) {
			var urlparms={"url":"http://www.baidu.com"}
			apiobj.openPage("newweb","新网页","./webview.html",urlparms);
			 
		})

		var testbutobj=$("#testbut");
		testbutobj.addEventListener("tap",function(evt) {
			$("#pagebd").append('<label class="txt1" style="color:#FF0000">测试一发</label>')
		})
	}

	function showselectnavcontent(){
		if(navpanelwidth>0){
			$("#navpanel").style.cssText="transform:translateX(-"+(selectnavIndex*navpanelwidth)+"px)";
		}
	}
	function show_single_selectnavcontent(){
		$("#navsinglepanel").innerHTML='<label class="txt1">替换内容,选项卡'+singleselectnavIndex+'</label>';
	}
	Page({
			"pageId":"navbar",
			"pageName":"Navbar",
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
			},
			"selectnav":function(evt){
				var current=evt.detail.current;
				if(current!=selectnavIndex){
					selectnavIndex=current;
					showselectnavcontent()
				}
			},
			"selectsinglenav":function(evt){
				var current=evt.detail.current;
				if(current!=singleselectnavIndex){
					singleselectnavIndex=current;
					show_single_selectnavcontent()
				}
			}
	})
})