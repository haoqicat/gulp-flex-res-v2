const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')

gulp.task('imagemin', function() {
  return gulp
    .src('src/img/*')
    .pipe(
      imagemin({
        use: [pngquant()]
      })
    )
    .pipe(gulp.dest('dist/img'))
})

gulp.task('sass', function() {
  gulp
    .src('src/css/main.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(gulp.dest('dist/'))
})

gulp.task('copy', function() {
  gulp.src('src/*.html').pipe(gulp.dest('dist/'))
})

gulp.task('default', ['sass', 'copy'])
