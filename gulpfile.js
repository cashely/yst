var gulp = require('gulp');
var sass = require('gulp-sass');
var autoPrefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');

gulp.task('sass',function(done){
  return gulp.src('src/**/*.scss')
      .pipe(sass())
      .pipe(autoPrefix({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(concat('all.css'))
      .pipe(gulp.dest('./dist/css/'));
});
gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', ['sass']);
});
gulp.task('default',['sass','watch']);
