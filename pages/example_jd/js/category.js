//category.js
PageDefine(function(Page,$){
	"use strict";
	
	let apiobj=this.getApi();
	var gotopflag=0;
	function showgotop(){
		if(gotopflag==0){
			gotopflag=1;
			var html='<div class="flex-column gotop" id="gototop" bindtap="gotoTop">'
					+'<img src="./images/gotop.png" class="topimg">'
					+'<label class="topfont">置顶</label>'
					+'</div>'
			var p5={'right':'10px','bottom':'65px'}
				p5["html"]=html;
			apiobj.append_cover_HTML(p5);
		}else if(gotopflag==2){
			gotopflag=1;
			$("#gototop").style.cssText="visibility:visible";
		}
	}
	function hidegotop(){
		$("#gototop").style.cssText="visibility:hidden";
		gotopflag=2;
	}
	async function pageinit(page){
		 //https://mobile.yangkeduo.com/recommended.html
		 //https://mobile.yangkeduo.com/proxy/api/api/barrow/query?app_name=rectab_sim_gyl&offset=0&count=20
		 //https://mobile.yangkeduo.com/proxy/api/api/barrow/query?app_name=rectab_sim_gyl&support_types=0_1&offset=40&count=20&list_id=vIN2meYaSX&dp_list_id=vIN2meYaSX_dp&pdduid=0
		 //Copyright © 2016-2018
	}

	Page({
			"pageId":"category",
			"pageName":"分类",
			"onLoad":function(){
				var page=this;
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));
				pageinit(page)
				.catch(function(err){
					console.error(page.pageName+'>pageinit>'+err.message,err)
				});
			 
				apiobj.setTimeout(function(){
					//$("#scrollViewMain").startPullDownRefresh();
				},1000);
 
			},
			"onpulldownrefresh":function(evt){
				console.log('onpulldownrefresh',JSON.stringify(evt));
			 
				apiobj.setTimeout(function(){
					$("#"+evt.id).stopPullDownRefresh();
				},3000);

			},
			"onscrolltoupper":function(evt){
				console.log('onscrolltoupper',JSON.stringify(evt));
			}
			,
			"onscrolltolower":function(evt){
				console.log('onscrolltolower',JSON.stringify(evt));
			},"onscreenpagechange":function(evt){
				//console.log("onscreenpagechange",evt);
				if(evt){
					var detail=evt.detail||{}
					if(detail.page_number && detail.page_number>1){
						showgotop();
					}else{
						hidegotop()
					}
				}
			}
			,"gotoTop":function(){
				$("#scrollViewMain").scrollTop=0;
			}
			,"perimg":function(evt){
 
				var parms={"current":evt.dataset.index,"images":[
					{"url":"https://wx3.sinaimg.cn/large/677e4af2ly1g4d8q1mhxzj20xc0ir0xh.jpg"},
					{"url":"https://wx3.sinaimg.cn/large/677e4af2ly1g4d8q1ixdpj20xc0ir78n.jpg"},
					{"url":"https://wx3.sinaimg.cn/large/677e4af2ly1g4d8q1k0qgj20xc0irn1e.jpg"},
					{"url":"https://wx3.sinaimg.cn/large/677e4af2ly1g4d8q1js8fj20xc0ir78w.jpg"},
					{"url":"https://wx3.sinaimg.cn/large/677e4af2ly1g4d8q1o5u7j20xc0irn16.jpg"},
					{"url":"https://wx3.sinaimg.cn/large/677e4af2ly1g4d8q1n7epj20xc0iraec.jpg"},
					{"url":"https://wx3.sinaimg.cn/large/677e4af2ly1g4d8sbjdj6j20xc0irgqq.jpg"},
					{"url":"https://wx3.sinaimg.cn/large/677e4af2ly1g4d8q1k9qrj20xc0iraf3.jpg"},
					{"url":"https://wx3.sinaimg.cn/large/677e4af2ly1g4d8q1jsm0j20xc0ir0x3.jpg"}
				]}
				apiobj.openPage("photopreview","图片预览","../templet/photopreview.html",parms);
			}
	})
})