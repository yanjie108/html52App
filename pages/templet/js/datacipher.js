//datacipher.js
PageDefine(function(Page,$){
	"use strict";
	
	let appobj=this.getApp();
	let apiobj=this.getApi();

	async function pageinit(page){
		let key="hello-create2019";//16位
        let iv ="0-1234-abcd-5678";//16位

		let sourcestr="123456789";
		
       
		let md5butobj=$("#md5but");
		md5butobj.addEventListener("tap",function(){ 
			let enrs=apiobj.encrypt("MD5",{"data":sourcestr});
			$("#resulttxt").innerText="原文："+sourcestr+"\nMD5加密结果："+enrs;
		})	

		let aesbutobj=$("#aesbut");
		aesbutobj.addEventListener("tap",function(){ 
			let enrs=apiobj.encrypt("AES",{"key":key,"iv":iv,"data":sourcestr});
			let ders=apiobj.decrypt("AES",{"key":key,"iv":iv,"data":enrs});
			$("#resulttxt").innerText="原文："+sourcestr
										+"\nAES加密结果："+enrs
										+"\nAES解密结果："+ders;
		})	

	}

	Page({
			"pageId":"datacipher",
			"pageName":"信息加密解密",
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