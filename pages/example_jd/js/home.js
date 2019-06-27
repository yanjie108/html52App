//home.js
PageDefine(function(Page,$){
	"use strict";
	
	let apiobj=this.getApi();
	let utilobj=this.require("util") 
	var globaldata={"pi":1,"loadmore":0}

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
		build_swiper();
		build_scroll_news(1);
		build_imgbanner();
		build_seckillnewlist();
		//全屏广告 300X215
		//https://img20.360buyimg.com/jdphoto/jfs/t1/24821/5/8869/34615/5c790333Efdb2a27a/edd58c1c8ee314b7.gif
		//https://pro.m.jd.com/mall/active/3Dw1Y8yynsbeWqd8nas6uvpqBfVN/index.html
	}

	function build_swiper(){
		var swiperdata={"slides":[
						  {
						    "url": "https://pro.m.jd.com/mall/active/36TMaXSeACdSdDY7W6Cc4Yq4pyAp/index.html",
						    "img": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/25114/16/7352/100343/5c6a770fE59339b89/3410a103a6430f01.jpg!cr_1125x549_0_72!q70.jpg"
						  },
						  {
						    "url": "",
						    "img": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/20889/32/7354/100325/5c6abcb8Ed40de4fe/2b1ad9fcb56b80ac.jpg!cr_1125x549_0_72!q70.jpg"
						  }
						  ,
						  {
						    "url": "",
						    "img": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/20435/2/7365/61660/5c6aad86E0e518612/63c95a931c985e87.jpg!cr_1125x549_0_72!q70.jpg"
						  }
						  ,
						  {
						    "url": "https://pro.m.jd.com/mall/active/4SzMZrSU7NahbJVVTB1ZzbX7DS7f/index.html?innerAnchor=8141909&focus=3",
						    "img": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t27133/131/1720555673/62024/b68bb563/5beb42b5N78805346.jpg!cr_1125x549_0_72!q70.jpg"
						  }
						  ,
						  {
						    "url": "",
						    "img": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/10377/12/10926/92352/5c6a45a4Ec5ee4953/38966df58094e475.jpg!cr_1125x549_0_72!q70.jpg"
						  }
						  ,
						  {
						    "url": "https://pro.m.jd.com/mall/active/NRNR6i5YvnxgaXLcBrqnW1HBF4R/index.html",
						    "img": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/31761/24/2412/187278/5c6a1551E0730799e/17e76ba724404748.jpg!cr_1125x549_0_72!q70.jpg"
						  }
						  ,{
						    "url": "https://h5.m.jd.com/babelDiy/Zeus/3a9Q8JhSik8yfwwjai9WWaessRZt/index.html",
						    "img": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/31162/17/1128/101786/5c46ead8E22ee9740/f66061da227c1965.jpg!cr_1125x549_0_72!q70.jpg"
						  }
						  ,{
						    "url": "https://pro.m.jd.com/mall/active/2g7h4PXk2ZJGiQNqrwVrdEpiPV82/index.html",
						    "img": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/24046/10/6380/94217/5c511b9dEcc9ba39c/7913173ae5ed0617.jpg!cr_1125x549_0_72!q70.jpg"
						  }
						]
					}
		var slides=swiperdata.slides||[];
		var slideslen=slides.length;
		var slideshtml='';
		var imgarry=[];

		for(var i=0;i<slideslen;i++){
			slideshtml+='<div class="swiper-slide" ><img class="slideimg" src="'+slides[i].img+'"></div>';
			imgarry.push({"url":slides[i].img});
		}
		
		if(slideshtml){
			var swiperwrapperobj=$("#swiperwrapper")
			var frame=swiperwrapperobj.getBoundingClientRect();
			var width=frame.width;
			var height=frame.height;
			var htmlstr='<div class="swiper-container" autoplay="1" circular="1" id="swipercontainer"'
													+' style="width:'+width+'px;height:'+height+'px"'
													+'>'
					+'<div class="swiper-wrapper">'+slideshtml+'</div>'
					+'<div class="swiper-pagination" style="margin-top:-40px">'
						+'<label class="swiper-bullets" > ● ○ ○ ○ ○ </label>'
					+'</div>'
				+'</div>';
			swiperwrapperobj.innerHTML=htmlstr;
			 
			var swipercontainerobj=$("#swipercontainer");
			swipercontainerobj.addEventListener("tap",function(evtdata){
				console.log('tap',JSON.stringify(evtdata,null,1))
				//var pvimages={"current":evtdata.detail.current,"images":imgarry};
				//apiobj.openPage("photoview","查看图片","./photoview.html",pvimages);
			})
			swipercontainerobj.addEventListener("slidechange",function(evtdata){
				//console.log('slidechange',JSON.stringify(evtdata,null,1))
				//console.log('slidechange-evtdata.detail.current=',evtdata.detail.current)
			});
 
		}
	}
	var newsdata=[
			{"tag":"最新","title":"生了孩子才知道，宝宝用品不能乱买","url":""},
			{"tag":"热门","title":"看完红米不得不买的四大理由，才发现小米确实很很良心！","url":""},
			{"tag":"最新","title":"安卓Q早知道下一代谷歌安卓系统将支持台式桌面功能","url":""}
			];
	function build_scroll_news(callcount){
		var newslen=newsdata.length;
		var newhtml="";
		var offset=0;
		while(offset<2 && newsdata.length>0){
			var onenews=null;
			if(offset==0){
				onenews=newsdata.shift();
				newsdata.push(onenews);
			}else{
				onenews=newsdata[0];
			}
			newhtml+='<div bindtap="openlink" class="flex-row news_list" data-url="'+onenews.url+'">'
						+'<span class="jdnewredfont">'+onenews.tag+'</span><span class="jdnewtitle">'+onenews.title+'</span>'
					+'</div>';
			offset++;
		}
		if(newhtml){
			var newswrapperobj=$("#newswrapper");
			newswrapperobj.outerHTML='<div class="flex-column news_listwrapper" id="newswrapper" >'+newhtml+'</div>';
			newswrapperobj.addEventListener("animationend",function(){
				build_scroll_news(callcount+1);
			});
			
			apiobj.setTimeout(function(){
				newswrapperobj.addClass("animation-nextnews");
			},5000);
		}
	}
	function build_imgbanner(){
		var imgbannerobj=$("#imgbanner");
		var frame=imgbannerobj.getBoundingClientRect();
		var width=frame.width;
		var height=frame.height;
		var gifurl="https://m.360buyimg.com/mobilecms/jfs/t1/21198/23/6638/113156/5c603181Ed5843f70/edb86adb9872c8ce.gif";
		imgbannerobj.innerHTML='<img animationImages="1" src="'+gifurl+'" style="width:'+width+'px;height:'+height+'px">';
	}
	function build_seckillnewlist(){
		var seckillnewlistobj=$("#seckillnewlist");
		var seckillitemarry=[
			{"price":78,"originalprice":288,"img":"http://img14.360buyimg.com/n1/s150x150_jfs/t1/16951/12/6851/203781/5c63879bE7abb993c/5aba10592ee636fa.jpg"},
			{"price":55,"originalprice":76,"img":"http://img14.360buyimg.com/n1/s150x150_jfs/t1/8032/23/14318/95699/5c63dab0E04aac86b/b63de1692650393c.jpg"},
			{"price":1899,"originalprice":2199,"img":"http://img14.360buyimg.com/n1/s150x150_jfs/t25738/20/1060675983/123428/4b0775cc/5b865b78Nfcdbaf7d.jpg"},
			{"price":159,"originalprice":378,"img":"http://img14.360buyimg.com/n1/s150x150_jfs/t1/30231/14/2248/127173/5c678c21E3e26129f/b6250c5a6ef1904f.jpg"},
			{"price":168,"originalprice":499,"img":"http://img14.360buyimg.com/n1/s150x150_jfs/t1/29295/11/6821/151152/5c626525E65a006c6/69c5760037bd7a6b.jpg"},
			{"price":218,"originalprice":598,"img":"http://img14.360buyimg.com/n1/s150x150_jfs/t19180/180/623724450/400005/30a0e4f2/5a9b4c6cNd95bcb27.jpg"},
			{"price":359,"originalprice":1058,"img":"http://img14.360buyimg.com/n1/s150x150_jfs/t1/16949/20/7158/76786/5c667f24E12a8c0c1/565a04d06024545e.jpg"},
			{"price":19.9,"originalprice":58,"img":"http://img14.360buyimg.com/n1/s150x150_jfs/t1/29712/38/7580/165306/5c6d3983Ee652df92/87576046111ff4a9.jpg"}
			]
		var html='';
		var seckillitemarrylen=seckillitemarry.length;
		for(var i=0;i<seckillitemarrylen;i++){
			var one=seckillitemarry[i];
			if(one.img==""){
				continue;
			}
			html+='<div class="flex-column seckill_new_item">'
					+'<img class="seckill_photo" src="'+one.img+'">'
					+'<div class="flex-column seckill_price">'
                        +'<div class="flex-row seckill_newprice">'
                        	+'<span class="newunittxt">¥</span>'
                        	+'<span class="newpricetxt">'+one.price+'</span>'
                        +'</div>'
                        +'<div class="flex-column seckill_originalprice">'
                        	+'<span class="originalpricetxt">¥'+one.originalprice+'</span>'
                        	+'<div class="deleteline"></div>'
                        +'</div>'
                    +'</div>'
				+'</div>';
		}
		seckillnewlistobj.innerHTML=html;
		update_seckill_countdown();
	}
	function update_seckill_countdown(){
		let nowdate=new Date();
		let seckilldatestr=utilobj.data2str(nowdate,"yyyy-MM-dd")+" 16:00:00";
		let seckilldate=utilobj.str2date(seckilldatestr);
		let times=(seckilldate.getTime()-nowdate.getTime())/1000;
		if(times>0){
		    let hour = Math.floor(times / (60 * 60));
		    let minute = Math.floor(times / 60) - (hour * 60);
		    let second = Math.floor(times) - (hour * 60 * 60) - (minute * 60);
		    $("#seckill_time").innerText=(hour<=9?"0":"")+hour+":"+(minute<=9?"0":"")+minute+":"+(second<=9?"0":"")+second;
			apiobj.setTimeout(function(){ 
					update_seckill_countdown();
				},1000);
		}
	}
	function loaddata(){
		//&callback=Zepto1551234403534
		var loadmoreflag=globaldata["loadmore"];
		if(loadmoreflag==0){
			globaldata["loadmore"]=1
			var getdatatype="mogu";//jindong";
			var pi=globaldata["pi"];
			var row;
			var setting;
			if(getdatatype=="mogu"){
 				var urlstr="https://list.mogu.com/search?_version=8253&sort=pop&page="+pi+"&q=裙子";
				setting={"url":urlstr};
				setting["dataType"]="jsonp";
				setting["data"]={};
				row=40;
			}else{
				var urlstr="https://wqcoss.jd.com/mcoss/reclike/getrecinfo?pi="+pi+"&pc="+row+"&recpos=6163";
				setting={"url":urlstr};
				setting["dataType"]="jsonp";
				setting["header"]={"Referer":"https://m.jd.com/"};
				setting["data"]={};
				row=16;
			}
			
			apiobj
			.request(setting)
			.then(function(datas){
				var datalen=0;
				if(getdatatype=="mogu"){
					if(datas && datas.result && datas.result.wall){
						var wallobj=datas.result.wall;
						if(wallobj && wallobj.list){
							var dataarry=wallobj.list;
							datalen=dataarry.length;
							build_mogurechtml(dataarry);
						}
					}
				}else{
					if(datas && datas.data){
						var dataarry=datas.data;
						datalen=dataarry.length;
						build_rechtml(dataarry);
					}	
				}
				console.log('加载推荐数据loaddata>第'+pi+'页,datalen='+datalen);
				if(datalen>=row && pi<10){//最多翻10页
					globaldata["loadmore"]=0
				}else{
					globaldata["loadmore"]=2
					$("#recloading").remove();
				}
				globaldata["pi"]=pi+1

			});
		}else if(loadmoreflag==1){
			console.log('加载推荐数据loaddata>正在加载数据');
		}else if(loadmoreflag==2){
			console.log('加载推荐数据loaddata>没有更多数据');
		}
	}

	function build_mogurechtml(data){
		var recgoodslistobj=$("#recgoodslist");
		var frame=recgoodslistobj.getBoundingClientRect();
		var w=parseInt(frame.width/2);
		var h=parseInt(w*1.5);
		var datalen=data.length;
		 
		var html='';
		for(var i=0;i<datalen;i++){
			var one=data[i];
			var img=one["img"];
			var price=one["price"];
			var desc=one["title"];
			var linkurl=one["link"];
			//\u3000\u3000\u3000\u3000
			
			html+='<div data-url="'+linkurl+'" bindtap="openlink" class="flex-column goodsitem item'+(((i+1)%2==0)?'2':'1')+'" >'
						+'<div class="goodspanel">'
							+'<img class="recycler-img" style="width:'+w+'px;height:'+h+'px" src="'+img+'" >'
							+'<div class="flex-row" style="margin:5px;width:'+(w-10)+'px;">'
								+'<label class="goodsdesc" style="margin-top:0px;width:'+(w-10)+'px;text-indent:0em">字数过长就省略，'+desc+'</label>'
							+'</div>'
							+'<label class="goodsprice">'+(price)+'</label>'
						+'</div>'
					+'</div>';
			//if(i==1)break;
		}
		recgoodslistobj.append(html);
	}

	function build_rechtml(data){
		var recgoodslistobj=$("#recgoodslist");
		var frame=recgoodslistobj.getBoundingClientRect();
		var w=frame.width/2;
		var datalen=data.length;
		var imgqz="http://img12.360buyimg.com/mobilecms/s372x372_"
		var html='';
		for(var i=0;i<datalen;i++){
			var one=data[i];
			var img=one["img"];
			var price=one["jp"];
			var desc=one["t"];
			//\u3000\u3000\u3000\u3000
			html+='<div class="flex-column goodsitem item'+(((i+1)%2==0)?'2':'1')+'" >'
						+'<div class="goodspanel">'
							+'<img class="recycler-img" style="width:'+w+'px;height:'+w+'px" src="'+imgqz+img+'" >'
							+'<div class="flex-column" style="margin:5px;width:'+(w-10)+'px;padding-top:2px">'
								+'<img src="./images/jdsd.png" style="width:2.938rem;height:0.813rem;min-width:44px;min-height:12px">'
								+'<label class="goodsdesc">'+desc+'</label>'
							+'</div>'
							+'<label class="goodsprice">¥ '+(price/100.00)+'</label>'
						+'</div>'
					+'</div>';
			//if(i==1)break;
		}
		recgoodslistobj.append(html);
	}
	Page({
			"pageId":"home",
			"pageName":"首页",
			"onLoad":function(){
				var page=this;
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));
				pageinit(page)
				.catch(function(err){
					console.error(page.pageName+'>pageinit>'+err.message,err)
				});
			},
			"openlink":function(evt){
				if(evt){
					var dataset=evt.dataset||{}
					if(dataset.url){
						var parms={"url":dataset.url};
						apiobj.openPage("webframe","嵌入网页","../templet/webview.html",dataset);
					}else{
						console.log("openlink>没有指定跳转页面url");
					}
				}
			},
			"onscrolltolower":function(){
				//加载更多推荐商品
				loaddata();
			}
			,"onscreenpagechange":function(evt){
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
	})
})