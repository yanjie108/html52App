//myjd.js
PageDefine(function(Page,$){
	"use strict";
	let appobj=this.getApp();
	let appExports=appobj.appExports;
	let apiobj=this.getApi();
 	let utilobj=this.require("util");
	async function pageinit(){
		var html='';
		var userinfo=await appExports.getUserInfo();
		
		if(userinfo){//显示用户信息
			html='<div class="flex-row" style="width:50%">'
							+'<img src="./images/defaulttx.png" class="headimg">'
							+'<div class="flex-column">'
								+'<label class="nickname">'+userinfo.nickname+'</label>'
								+'<label class="real_name_item">待实名认证</label>'
							+'</div>'
						+'</div>'
						+'<div class="flex-column ur" >'
							+'<div class="flex-row  account_wrap_content">'
								+'<img src="./images/setting.png" style="width:12px;height:12px">'
								+'<label class="settingtxt" >账号管理</label>'
							+'</div>'
							+'<div class="flex-column plus_account" id="plus_account">'
								+'<img src="./images/plus.png" class="plusimg">'
								+'<label class="plus_account_text">升级10大特权</label>'
							+'</div>'
						+'</div>';
		}else{
			html='<img src="./images/defaulttx.png" class="headimg">'
				+'<label class="logintxt" bindtap="gotologin">登录/注册</label>';
		}
		$("#userinfo").innerHTML=html;

		if(userinfo){//用户已经登录
			$("#logoutcd").style.cssText="visibility:visible";
			var curtaindata={
					 "url":"https://plus.m.jd.com/index?ptag=7155.1.84?flow_system=myhome&flow_entrance=myhome2&flow_channel=m&sceneval=2"
					,"img":"https://img30.360buyimg.com/jdphoto/jfs/t1/19549/18/3264/90382/5c446af4Ebadafec2/48814dd830165aeb.png"
				}
			var pluscurtainhtml='<div class="modal-wrap" id="plusCurtain">'
								+'<div class="flex-column curtain_content">'
								+'<img style="width:248px;height:207px" src="'+curtaindata.img+'" id="curtainimg">'
								+'<img style="margin:-220px -16px 0px 0px;width:35px;height:35px;" id="closecurtainbut" src="./images/close.png">'
								+'</div>'
								+'</div>';
			apiobj.showModal(pluscurtainhtml)
			.then(function(ref){
				$("#closecurtainbut").addEventListener("tap",function(){
					$("#plusCurtain").remove();
				});
				$("#curtainimg").addEventListener("tap",function(){
					console.log('webview打开url');
				});
			})
		}else{
			$("#logoutcd").style.cssText="visibility:hidden;height:1px";
		}
	}
	function gotologinimpl(){
		apiobj.openModalPage("login","用户登录","./login.html",{});
	}
	function gotologoutimpl() {
		//退出当前账号
		apiobj.confirm("您确定要退出登录吗？","退出确认"
					,function(result){
						if(!result){
							return;
						}

						//TODO 调用后台退出接口让当前token失效

						//清除本地存储信息
						appExports.clearLoginInfo();

						//重新构建页面
						pageinit()
						.catch(function(err){
							console.error(page.pageId+'>logout.pageinit>'+err.message,err)
						});
					})
	}
	Page({
			"pageId":"myjd",
			"pageName":"我的京东",
			"onLoad":function(){
				var page=this;
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));
				pageinit()
				.catch(function(err){
					console.error(page.pageId+'>onLoad.pageinit>'+err.message,err)
				});
			},
			"onShow":function(){
				var page=this;
				console.log("page onShow="+this.pageId,page.returnValue);
				if(page.returnValue && page.returnValue.login=="OK"){
					pageinit()
					.catch(function(err){
						console.error(page.pageId+'>onShow.pageinit>'+err.message,err)
					});
				}
			},
			"onwdtap":function(evt){
				var dataname=evt.dataset.name
				if(dataname=="logout"){
					gotologoutimpl()
				}else{
					console.log("--onwdtap-TODO-",evt)
				}
			},
			"gotologin":function(){
				gotologinimpl();
			}
	})
})