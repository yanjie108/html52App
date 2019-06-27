//actionsheet.js
PageDefine(function(Page,$){
	"use strict";
	
	let appobj=this.getApp();
	let apiobj=this.getApi();

	async function pageinit(page){
		var show_actionsheet_toastobj=$("#show_actionsheet");
		show_actionsheet_toastobj.addEventListener("tap",function(){
			var buttons1 = [
		        {
		          text: '清仓'
		        },
		        {
		          text: '卖出',
		          color: '#FF0000'
		        },
		        {
		          text: '买入',
		          dataset:{"action":"buy"}
		        }
		      ];
		    var buttons2 = [
		        {
		          text: '取消'
		        }
		      ];
		    var groups = [buttons1, buttons2];
			apiobj.showActionSheet(groups,"请您选择要执行的操作。",function(result){
				console.log("actionsheet选择了>>>",JSON.stringify(result))
			})
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