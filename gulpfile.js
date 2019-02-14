const gulp = require("gulp"),
    sass = require("gulp-sass"),
	autoprefixer=require("gulp-autoprefixer"),
	notify = require("gulp-notify"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel');

gulp.task("default", function(){
    gulp.start("scss", "js");
});

gulp.task("scss", function () {
    gulp.src("./dev/scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 12 versions']
		}))
        .pipe(gulp.dest("./css"))
        .pipe(notify({message: 'SASS Compailed', onLast: true}))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }));
});

gulp.task('js', function(){
    gulp.src("./dev/js/*.js")
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
        .pipe(notify({ message: 'Javascript Compailed', onLast: true}))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }));
});

gulp.task("watch", function () {
    gulp.watch("./dev/scss/**/*.scss", ["scss"]);
    gulp.watch("./dev/js/*.js", ["js"]);
})