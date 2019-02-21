require(['../js/config.js'],function(){
	require(['mui','work'],function(mui,util){
		var id = util.id;
		if(id){
			init()
		}
		function init(){
			mui.ajax('/find',{
				type:'get',
				dataType:'json',
				data:{
					id:id
				},
				success:function(data){
					if(data.code == 0){
						document.querySelector('.name').value = data.message[0].name;
						document.querySelector('.age').value = data.message[0].age;
						document.querySelector('.address').value = data.message[0].address;
						document.querySelector('.phone').value = data.message[0].phone;
						document.querySelector('.card').value = data.message[0].card
					}
				}
			})
		}
		
		addevent()
		function addevent(){
			document.querySelector(".sure").addEventListener('tap',function(){
				var param = {
					name : document.querySelector('.name').value,
					age:document.querySelector('.age').value,
					address:document.querySelector('.address').value,
					phone:document.querySelector('.phone').value,
					card:document.querySelector('.card').value
				}
				if(id){
					param.id = id;
				}
				mui.ajax('/insert',{
					type:"post",
					dataType:'json',
					data:param,
					success:function(data){
						window.location.href = '../index.html'
					}
				})
			})
		}
	})
})