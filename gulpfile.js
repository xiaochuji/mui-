var gulp = require("gulp");
var server = require("gulp-webserver");

gulp.task("server",function(){
	return gulp.src('./src')
		   .pipe(server({
			   port:7979,
			   open:true,
			   livereload:true,
			   proxies:[
				   {
					   source:"/list",
					   target:"http://localhost:3000/list"
				   },
				   {
					   source:"/insert",
					   target:"http://localhost:3000/insert"
				   },
				   {
					   source:"/del",
					   target:"http://localhost:3000/del"
				   },
				   {
					   source:"/find",
					   target:"http://localhost:3000/find"
				   }
			   ]
		   }))
})