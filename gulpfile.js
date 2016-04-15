var gulp = require('gulp');
var sass = require('gulp-sass');
var jade  = require('gulp-jade');
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
gulp.task('jade',function(){
	var LOCALS = {};
	return gulp.src('jade/*.jade')
			.pipe(jade({
				locals:LOCALS
			}))
			.pipe(gulp.dest('./jade-template/'));
})
gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', ['sass']);
  // gulp.watch('jade/*.jade',['jade']);
});
gulp.task('default',['sass','watch']);
