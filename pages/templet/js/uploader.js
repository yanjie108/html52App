//uploader.js
PageDefine(function(Page,$){
	"use strict";
	
	let appobj=this.getApp();
	let apiobj=this.getApi();
	var uploadurl="";//http://localost/upload/file";
	function showimg(rs){
		var imgurl="";
		var imgwidth=0;
		var imgheight=0;
		if(rs.code==200){
			imgurl=rs.data.local_url||rs.data.fileUrl;
			var imgwidth1=rs.data.width;
			var imgheight1=rs.data.height;
			if(imgwidth1>=300){
				imgwidth=300;
				imgheight=parseInt(imgheight1*(300/imgwidth1));
			}else if(imgheight>=300 ){
				imgwidth=parseInt(imgwidth1*(300/imgheight));
				imgheight=300;
			}else{
				imgwidth=imgwidth1;
				imgheight=imgheight1;
			}
		}
		if(imgurl){
			var imghtml='<img id="tempimg" src="'+imgurl+'" style="width:'+imgwidth+'px;height:'+imgheight+'px">';
			$("#preview").innerHTML=imghtml
			$("#tempimg").addEventListener("tap",function(){
				var parms={"images":[{"url":imgurl}]}
				apiobj.openPage("photopreview","图片预览","./photopreview.html",parms);
			})
		}
	}

	async function pageinit(page){
		var paizhaoallobj=$("#paizhaoall");
		paizhaoallobj.addEventListener("tap",function(){
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
			apiobj.showActionSheet(groups,"",function(rs){
				if(rs && rs.sourcetype){
					var setting={"upload_url":uploadurl,"source_type":rs.sourcetype};
					apiobj.chooseImage(setting).then(function(rs){
						console.log('camera.page.chooseImage().then>>rs=',JSON.stringify(rs));
						showimg(rs)
					})
				}
			})
		});

		var paizhaoobj1=$("#paizhao1");
		paizhaoobj1.addEventListener("tap",function(){
			var setting={"upload_url":uploadurl,"source_type":"camera","show_progress":"true"};
			apiobj.chooseImage(setting).then(function(rs){
				apiobj.hideLoading();
				console.log('camera.page.chooseImage().then>>rs=',JSON.stringify(rs));
				showimg(rs);
			})
			apiobj.showLoading("正在上传...");
		})	

		var paizhaoobj2=$("#paizhao2");
		paizhaoobj2.addEventListener("tap",function(){
			var setting={
				"upload_url":uploadurl
				,"source_type":"album"
				,"crop_img":0
				,"width":330
				//,"height":330
			};
			apiobj.chooseImage(setting).then(function(rs){
				apiobj.hideLoading();
				console.log('album.page.chooseImage().then>>>rs=',JSON.stringify(rs));
				showimg(rs)
			})
			apiobj.showLoading("正在上传...");
		})

		//-----
		var shexiangobj1=$("#shexiang1");
		shexiangobj1.addEventListener("tap",function(){
			var setting={"upload_url":uploadurl
				,"source_type":"camera_movie"
				,"show_progress":"true"
			};
			apiobj.chooseImage(setting).then(function(rs){
				console.log('camera_movie.page.chooseImage().then>>rs=',JSON.stringify(rs));
				 
			})
		})	
		
		var shexiangobj2=$("#shexiang2");
		shexiangobj2.addEventListener("tap",function(){
			var setting={
				"upload_url":uploadurl
				,"source_type":"album_movie"
				,"show_progress":"true"
				,"show_progress_view_id":"shexiang2"
			};
			apiobj.chooseImage(setting).then(function(rs){
				console.log('album_movie.page.chooseImage().then>>>rs=',JSON.stringify(rs));
			})
		})
	}

	Page({
			"pageId":"uploader",
			"pageName":"摄像头拍照/录像",
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