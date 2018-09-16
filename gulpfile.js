/*eslint-env node */

var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
const eslint = require("gulp-eslint");

browserSync.init({
	server: "./"
});
browserSync.stream();

gulp.task("default", function() {
	//console.log("hello gulp!");
	gulp.watch("sass/**/*.scss", ["styles"]);
	gulp.watch("js/**/*.js", ["lint"]);
});

 
gulp.task("lint", () => {
	return gulp.src(["scripts/*.js"])
	// eslint() attaches the lint output to the "eslint" property
	// of the file object so it can be used by other modules.
		.pipe(eslint())
	// eslint.format() outputs the lint results to the console.
	// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
	// To have the process exit with an error code (1) on
	// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
});

gulp.task("styles", function() {
	gulp.src("sass/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"]
		}))
		.pipe(gulp.dest("./css"));
});