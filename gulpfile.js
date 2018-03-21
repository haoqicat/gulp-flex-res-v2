const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const wrap = require('gulp-wrap')

function handleError(err) {
  console.log(err.toString())
  this.emit('end')
}

gulp.task('build', function() {
  gulp
    .src('src/pages/*.html')
    .pipe(wrap({ src: 'src/layout/default.html' }))
    .pipe(gulp.dest('dist/'))
})

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
    .on('error', handleError)
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

gulp.task('watch', function() {
  gulp.watch(['src/**/*.html'], ['build'])
  gulp.watch(['src/css/*.scss'], ['sass'])
})

gulp.task('default', ['sass', 'build', 'watch'])
