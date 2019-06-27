//login.js
PageDefine(function(Page,$){
	"use strict";
	let appobj=this.getApp();
	let HOSTS=appobj.HOSTS;
	let appExports=appobj.appExports;
	let apiobj=this.getApi();
 	let utilobj=this.require("util") 
	async function pageinit(){
		 $("#loginbut").addEventListener("tap",function(){
		 	var uname=$("#username").value.trim();
		 	var pwd=$("#userpwd").value.trim();
		 	if(uname=="" || pwd==""){
		 		apiobj.showToast("请输入用户名和密码！")
		 		return;
		 	}
		 	if(uname=="testme" && pwd=="111111"){
		 		goto_login(uname,pwd)
		 	}else{
		 		apiobj.showToast("用户名或密码错误！")
		 	}
		 })
	}
	async function goto_login(uname,pwd) {
		 var data={}
		data["uname"]=uname
		data["pwd"]=pwd;
		
		var login_url=HOSTS["UA_HOST"]+"/login";
		var settings={"url":login_url};
		settings["method"]="POST";
		settings["data"]=data;

		apiobj.showLoading("正在登录...");

		var loginresult=await sendrequest(settings)

		apiobj.hideLoading();
		if(loginresult.code==200){
			//存储用户登录信息
			appExports.setLoginInfo(loginresult.data,loginresult.tokens);
			//关闭页面,并返回页面结果,前一个页面接到参数更新登录后的界面
			apiobj.closePage({"login":"OK"});
		}else{
			apiobj.showToast("登录失败！"+loginresult.message)
		}
	}
	function sendrequest(settings){
		//模拟登录接口返回,数据格式都为模拟，可根据实际情况定义
		return new Promise(function(resovle_ok, reject_err){
			var data={
				  "code": 200,
				  "data": {
				    "id": "testme",
				    "nickname": "阿丽塔",
				    "headimg": "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png"
				  },
				  "tokens":{"refresh_token":"rftoken1","access_token":"acctoken1"}
				}
				apiobj.setTimeout(function(){
					resovle_ok(data)
				},2000);
		});
		//TODO 调用后台登录接口
		//return apiobj.request(settings);
	}


	Page({
			"pageId":"login",
			"pageName":"登录",
			"onLoad":function(){
				var page=this;
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));
				pageinit()
				.catch(function(err){
					console.error(page.pageName+'>pageinit>'+err.message,err)
				});
			},
			"closepage":function(){
				apiobj.closePage()
			},
			"quicklogin":function(evt){
				var type=evt.dataset.type
				if(type=="weixin"){
					//登录后返回值,保证是这次登录，与服务端接口配合保证安全性
					//也做为业务跟踪的依据
					var reqstate="my_server_login_ticket";
					apiobj.auth({"oauth_name":"weixin","state":reqstate})
					.then(function(ref){
						//{"errCode":0,"code":"011klrd91xZBwN1hwce91PFpd91klrdz","state":"my_server_login_ticket"}
						if(ref.errCode==0){
							if(ref.state==reqstate){
								var code=ref.code;
								//调用后端登录接口，完成业务自己的登录
								//服务端与微信开放平台交互，通过code拿用户信息
							}else{
								//非法数据
							}
						}else{
							//用户拒接微信授权登录
						}
						console.log('---gotologinimpl---',JSON.stringify(ref));
					})
				}else{
					console.log(evt);
				}
			}
	})
})