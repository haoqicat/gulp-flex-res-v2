const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const wrap = require('gulp-wrap')
const browserSync = require('browser-sync')

function handleError(err) {
  console.log(err.toString())
  this.emit('end')
}

gulp.task('browser-sync', ['build', 'sass'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  })
})

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
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('copy', function() {
  gulp.src('src/*.html').pipe(gulp.dest('dist/'))
})

gulp.task('watch', function() {
  gulp.watch(['src/**/*.html'], ['rebuild'])
  gulp.watch(['src/css/*.scss'], ['sass'])
})

gulp.task('rebuild', ['build'], function() {
  browserSync.reload()
})

gulp.task('default', ['browser-sync', 'watch'])
