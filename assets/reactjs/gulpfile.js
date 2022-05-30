const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const minifyCSS = require("gulp-minify-css");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", function () {
	return gulp
		.src(["./src/blocks/**/style.scss", "./src/blocks/scss/style.scss"])
		.pipe(sass())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 2 versions"],
				cascade: false,
			})
		)
		.pipe(minifyCSS())
		.pipe(concat("style.min.css"))
		.pipe(gulp.dest("../css"));
});

gulp.task("watch", function () {
	gulp.watch("src/blocks/**/*.scss", gulp.series("sass"));
});
