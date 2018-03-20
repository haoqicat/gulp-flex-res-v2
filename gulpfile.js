const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('sass', function() {
  gulp
    .src('src/css/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/'))
})

gulp.task('copy', function() {
  gulp.src('src/*.html').pipe(gulp.dest('dist/'))
})

gulp.task('default', ['sass', 'copy'])
