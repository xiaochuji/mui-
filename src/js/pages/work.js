define(function(){
	var str = window.location.search.substr(1).split('&');
	var obj = {};
	for(var i=0;i<str.length;i++){
		obj[str[i].split('=')[0]]=str[i].split('=')[1]
	}
	return obj
})