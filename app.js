//app.js
AppDefine(function(App){
	"use strict";

	let apiobj=this.getApi();

	var userinfo=null;//{"id":"","nickname":"","headimg":""}
	var tokens=null;//{"refresh_token":"","access_token":"","create_timestamp":0}
	var server_timestamp_sjc=0;

	var HOSTS={
		"UA_HOST":"https://sp.yj.h52app",
		"UPLOAD_HOST":"https://sp.yj.h52app"
	}; 
	 

	
	function getclienttimestamp() {
		var nowtimestamp=new Date().getTime();
		if(server_timestamp_sjc==0){
			server_timestamp_sjc=parseInt(apiobj.getStorage("server_timestamp_sjc")||"0")||0
		}
		var clienttimestamp=nowtimestamp+server_timestamp_sjc;
		return clienttimestamp;
	}
	function setservertimestamp_sjc(server_timestamp){
		server_timestamp_sjc=server_timestamp-new Date().getTime();
		apiobj.setStorage("server_timestamp_sjc",server_timestamp_sjc);
	}
	function sendrequest(settings){
		//模拟数据
		if(settings.url.indexOf("/refresh_token")!=-1){
			return new Promise(function(resovle_ok, reject_err){
				var data={
					  "code": 200,
					  "data":{"refresh_token":"rftoken2","access_token":"acctoken2"}
					}
				resovle_ok(data);
			});
		}
		return apiobj.request(settings);
	}
	/*
	刷新token
	很多业务接口访问 access_token 都是有时效的
	可根据自己app的实际情况换取新的 access_token
	以下举例实现换取 access_token 逻辑,成功更新，已经过期踢出
	*/
	function refresh_token_impl(callback){
		var data={}
		data["userid"]=userinfo.id
		data["refresh_token"]=tokens.refresh_token;
		data["sign"]="";//
		
		var refresh_tokenurl=HOSTS["UA_HOST"]+"/refresh_token";
		var settings={"url":refresh_tokenurl};
		settings["method"]="POST";
		settings["data"]=data;
		sendrequest(settings)
				.then(function(rs){
					if(rs && rs.code==200){
						//更新token
						tokens=rs.data;
						tokens.create_timestamp=getclienttimestamp();
						//存储token，防止杀死app后重新打开用户身份失效
						apiobj.setStorage("userinfo",JSON.stringify(userinfo));
						apiobj.setStorage("tokens",JSON.stringify(tokens));
						console.log("-------换取新的 access_token---------");
					}else if(rs && rs.code==403){
						//无效踢出,举例如果后台返回错误代码403 说明 refresh_token 已经失败了
						exportsobj.clearLoginInfo();
					}
					callback(userinfo);
				});
		
	}

	//暴露方法,以下都为举例，请根据需求自己定义方法
	function exports_impl(){ 
		//获取当前登录用户信息
		this.getUserInfo=function() {
			return new Promise(function(resovle_ok, reject_err){
				if(userinfo==null){
					var userinfostr=apiobj.getStorage("userinfo");
					if(userinfostr){
						userinfo=JSON.parse(userinfostr);
					}
				}

				if(userinfo!=null && tokens==null){
					var tokensstr=apiobj.getStorage("tokens");
					if(tokensstr){
						tokens=JSON.parse(tokensstr);
					}
				}
				var exec=true;
				if(tokens!=null){
					var nowtimestamp=getclienttimestamp();
					//如果，如果间隔3分钟换取新 access_token
					if(nowtimestamp-tokens.create_timestamp>1000*60*3){
						refresh_token_impl(resovle_ok);
						exec=false;
					}
				}
				if(exec){
					resovle_ok(userinfo);
				}
			});
		}
		//登录成功后设置用户和token信息
		this.setLoginInfo=function(userinfo,tokens){
			tokens.create_timestamp=getclienttimestamp();
			apiobj.setStorage("userinfo",JSON.stringify(userinfo));
			apiobj.setStorage("tokens",JSON.stringify(tokens));
		}
		//用户退出清除用户和token信息
		this.clearLoginInfo=function(){
			apiobj.removeStorage("userinfo");
			apiobj.removeStorage("tokens");
			userinfo=null;
			tokens=null;
		}
		//拍照，选择图片 处理
		this.chooseImage=function(params) {
			var buttons1 = [
		        {
		          "text":"拍照",
		          "dataset":{"sourcetype":"camera"}
		        },
		        {
		          "text":"从相册选择",
		          "dataset":{"sourcetype":"album"}
		        }
		      ];
		    var buttons2 = [
		        {
		          text: '取消',
		          color: '#FF0000'
		        }
		      ];
		    var groups = [buttons1, buttons2];
			
			return new Promise(function(resovle_ok, reject_err){
				apiobj.showActionSheet(groups,"",function(rs){
					if(rs && rs.sourcetype){
						var uploadurl=HOSTS['UPLOAD_HOST']+"/upload/file";
						var settings={"upload_url":uploadurl,"source_type":rs.sourcetype};
						settings.size_type="compressed";
						settings.crop_img=0;
						settings.quality=70;
						if(params && params.width){
							settings.width=params.width
						}
						if(params && params.height){
							settings.height=params.height
						}
						apiobj.chooseImage(settings).then(function(rs){
							resovle_ok(rs);
						})
					}
				})
			});
		}

		this.name="这是全局工具类";
	}

	var exportsobj=new exports_impl();
	App({
	  onLaunch() {
	    console.log('App onLaunch Do something initial when launch.');
	  }
	  ,onShow() {
	    console.log('App onShow Do something when show.');
	  }
	  ,onHide() {
	    console.log('App onHide Do something when hide.');
	  }
	  ,onError(msg) {
	    console.log('App onError',msg)
	  }
	  ,"appExports":exportsobj
	  ,"title":"Hello H52APP"
	  ,"HOSTS":HOSTS
	})

})