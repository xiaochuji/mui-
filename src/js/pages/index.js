require(["./js/config.js"],function(){
	require(['mui'],function(mui){
		var page = 1,
			  pagesize = 11,
				len = 0;
		init();
		addevent();
		function init(){
			mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					up: {
						auto:true,
						contentrefresh: '正在加载...',
						callback: pullupRefresh
					}
				}
			});
		}
		function reader(data,len){
			var html = "";
			data.forEach(function(val){
				html += `<li class="mui-table-view-cell" data-id="${val._id}">${val.name}
							<div class="bts">
								<button type="button" class="mui-btn mui-btn-primary btn-detail">详情</button>
								<button type="button" class="mui-btn mui-btn-danger btn-del">删除</button>
							</div>
						</li>`
			})
			document.querySelector(".list-prepeo").innerHTML += html;
			console.log(len)
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count >= len));
		}
		function addevent(){
			//添加
			document.querySelector("#add").addEventListener("tap",function(){
				window.location.href = './page/add.html'
			})
			mui(".mui-table-view").on('tap','.btn-detail',function(){//详情页
			  //获取id
			  var el = this.parentNode.parentNode;
			  var id = el.dataset.id;
			  window.location.href = './page/util.html?id='+id
			}) 
			mui(".mui-table-view").on('tap','.btn-del',function(){//删除数据
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
							  if(data.code == 0){
								  document.querySelector(".list-prepeo").removeChild(el)
							  }
						  }
					  })
				  }else{
					  console.log("删除失败")
				  }
			  })
			}) 
		}
		
		var count = 0;
		function pullupRefresh() {
			ajax();
			page++
		}
		function ajax(){
			mui.ajax('/list',{  //查询所有的信息
				dataType:'json',
				type:'post',
				data:{
					page:page,
					pagesize:pagesize
				},
				success:function(data){
					if(data.code == 0){
						reader(data.message,data.len)
					}
				}
			});
		}
	})
})