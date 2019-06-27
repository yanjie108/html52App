//photoview.js
PageDefine(function(Page,$){
	"use strict";
	
	let apiobj=this.getApi();

	async function pageinit(page){
		////http://www.xinhuanet.com/photo/2019-02/12/1210057417_11n.jpg
				//http://www.xinhuanet.com/photo/2019-02/12/1210057416_11n.jpg
				//https://www.swiper.com.cn/demo/img/sport3.jpg
		 //var pvimages={"current":current,"images":{"url":""}};
		var defaultimgs=[{"url":"http://www.xinhuanet.com/photo/2019-02/12/1210057417_11n.jpg"}
						,{"url":"http://www.xinhuanet.com/photo/2019-02/12/1210057416_11n.jpg"}
						,{"url":"http://www.xinhuanet.com/photo/2019-02/12/1210057415_11n.jpg"}
						];

		var current=request_parms["current"]||0;
		var slides=request_parms["images"]||defaultimgs;
		var slideslen=slides.length;
		var slideshtml='';
		for(var i=0;i<slideslen;i++){
			slideshtml+='<div class="swiper-slide">'
						+'<div class="flex-column slidecontent"><img class="slideimg" src="'+slides[i].url+'"></div>'
						+'</div>';
		}  
		if(slideshtml){
			var swipercontainerobj=$("#swipercontainer");
			var htmlstr='<div bindtap="goback" class="swiper-container" zoom="1" current="'+current+'">'
					+'<div class="swiper-wrapper">'+slideshtml+'</div>'
					+'<div class="swiper-pagination" style="margin-top:-40px">'
						+'<label class="swiper-bullets" > ● ○ ○  </label>'
					+'</div>'
				+'</div>';
			
			swipercontainerobj.innerHTML=htmlstr;

		}
	}

	Page({
			"pageId":"photoview",
			"pageName":"图片查看器",
			"onLoad":function(){
				var page=this;
				console.log("page_load="+this.pageName+">request_parms",JSON.stringify(request_parms));
			 	/* */
				pageinit(page)
				.catch(function(err){
					console.error(this.pageName+'>pageinit>'+err.message,err)
				});
			},
			"goback":function(evt){
				apiobj.closePage()
			}
	})
})