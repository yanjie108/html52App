//jrbh.js
PageDefine(function(Page,$){
	"use strict";
	
	let appobj=this.getApp();
	let apiobj=this.getApi();

	async function pageinit(page){
		var p5={'domid':'cart','right':'0px','top':'0px'}
			p5["html"]='<div class="flex-column rednumwrap"><label class="rednum">666</label></div>';
		 apiobj.append_cover_HTML(p5);
		var swiperwrapperobj=$("#headerpanel")
		var frame=swiperwrapperobj.getBoundingClientRect();
		console.log('headerpanel->frame',JSON.stringify(frame));
	}

	Page({
			"pageId":"jrbh",
			"pageName":"今日必火",
			"onLoad":function(){
				var page=this;
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));
				pageinit(page)
				.catch(function(err){
					console.error(page.pageName+'>pageinit>'+err.message,err)
				});
			}
			,
			"onShow":function(){
				var page=this;
				console.log("page onShow="+this.pageId,page.returnValue);
				if(page.returnValue && page.returnValue.login=="OK"){
					pageinit()
					.catch(function(err){
						console.error(page.pageId+'>onShow.pageinit>'+err.message,err)
					});
				}
			}
			,
			"opendemo":function(evt){
				var type=evt.dataset.type;
				if(type=="button"){
					apiobj.openPage("button","按钮","../templet/button.html");
				}else if(type=="input"){
					apiobj.openPage("input","表单输入","../templet/input.html");
				}else if(type=="uploader"){
					apiobj.openPage("uploader","文件上传","../templet/uploader.html");	
				}else if(type=="actionsheet"){
					apiobj.openPage("actionsheet","弹出式菜单","../templet/actionsheet.html");
				}else if(type=="dialog"){
					apiobj.openPage("dialog","对话框","../templet/dialog.html");
				}else if(type=="toast"){
					apiobj.openPage("toast","弹出式提示","../templet/toast.html");
				}else if(type=="navbar"){
					apiobj.openPage("navbar","导航选项卡","../templet/navbar.html");	
				}else if(type=="uploader"){
					apiobj.openPage("uploader","文件上传","../templet/uploader.html");	
				}else if(type=="devicesysinfo"){
					apiobj.openPage("devicesysinfo","设备、系统信息","../templet/devicesysinfo.html");
				}else if(type=="datacipher"){
					apiobj.openPage("datacipher","数据加密","../templet/datacipher.html");	
				}else if(type=="localstorage"){
					apiobj.openPage("localstorage","本地数据存储","../templet/localstorage.html");	
				}else if(type=="webview"){
					var urlparms={"url":"../templet/webjsbridge.html"}
					apiobj.openPage("newweb","webview","../templet/webview.html",urlparms);
				}else{
					console.log('未实现>',evt);
				}
			}
	})
})