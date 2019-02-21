require(['../js/config.js'],function(){
	require(['mui','work'],function(mui,util){
		var id;
		init()
		function init(){//详情页设置
			id = util.id;
			mui.ajax('/find',{
				type:'get',
				dataType:"json",
				data:{
					id:id
				},
				success:function(data){
					if(data.code == 0){
						document.querySelector(".name").innerText = data.message[0].name;
						document.querySelector(".age").innerText = data.message[0].age;
						document.querySelector(".address").innerText = data.message[0].address;
						document.querySelector(".phone").innerText = data.message[0].phone;
						document.querySelector(".card").innerText = data.message[0].card
					}
				}
			})
		}
		addevent()
		function addevent(){//跳转修改页面
			document.querySelector("#add").addEventListener("tap",function () {
				window.location.href = '../page/add.html?id='+id;
			})
		}
	})
})