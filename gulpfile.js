const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;

gulp.task('sass', function () {
    return gulp.src('./styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./server/static/css'));
});
 
gulp.task('js', function () {
    return gulp.src('scripts/index.js')
        .pipe(rename('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('server/static/js/'));
});