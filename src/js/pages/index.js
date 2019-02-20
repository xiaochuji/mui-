require(["./js/config.js"],function(){
	require(['mui'],function(mui){
		init();
		addevent();
		function init(){
			mui.ajax('/list',{
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；              
				success:function(data){
					var html = "";
					data.message.forEach(function(val){
						html += `<li class="mui-table-view-cell" data-id="${val._id}">${val.name}
									<div class="bts">
										<button type="button" class="mui-btn mui-btn-primary btn-detail">详情</button>
										<button type="button" class="mui-btn mui-btn-danger btn-del">删除</button>
									</div>
								</li>`
					})
					document.querySelector(".list-prepeo").innerHTML = html;
				}
			});
		}
		function addevent(){
			mui(".mui-table-view").on('tap','.btn-detail',function(){
			  //获取id
			  var el = this.parentNode.parentNode;
			  var id = el.dataset.id;
			  window.location.href = './page/util.html?id='+id
			}) 
			mui(".mui-table-view").on('tap','.btn-del',function(){
			  //获取id
			  var el = this.parentNode.parentNode;
			  var id = el.dataset.id;
			  var btnArray = ["是","否"];
			  mui.confirm('是否确认删除','是否删除',btnArray,function(e){
				  if(e.index == 1){
					  mui.ajax("/del",{
						  dataType:"json",
						  type:"post",
						  data:{
							  id:id
						  },
						  success:function(data){
							  console.log(data)
						  }
					  })
				  }else{
					  console.log("删除失败")
				  }
			  })
			}) 
		}
	})
})