var gulp = require("gulp");
var server = require("gulp-webserver");

gulp.task("server",function(){
	return gulp.src('./src')
		   .pipe(server({
			   port:"7979",
			   open:true,
			   livereload:true,
			   proxies:[
				   {
					   source:"/list",
					   target:"http://192.168.0.198:3000/list"
				   },
				   {
					   sourse:"/insert",
					   target:"http://192.168.0.198:3000/insert"
				   },
				   {
					   source:"/del",
					   target:"http://192.168.0.198:3000/del"
				   }
			   ]
		   }))
})