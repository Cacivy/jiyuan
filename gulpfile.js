'use strict';
var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
 
gulp.task('images', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./src/views/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('jade:watch', function () {
  gulp.watch('./src/views/*.jade', ['jade']);
});

gulp.task('sass', function () {
  return gulp.src('./src/css/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./dist/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/css/*.scss', ['sass']);
});

gulp.task('watch', function() {
    gulp.start('sass:watch', 'jade:watch');
})

gulp.task('build', ['sass', 'images', 'jade']);

gulp.task('server', ['build', 'watch'], function () {
  gulp.src('./dist')
    .pipe(server({
      livereload: {
        enable: true,
		filter: function(filePath, cb) {
          cb( !(/node_modules/.test(filePath)) );
        }
      },
      directoryListing: false,
      open: true,
	  port: 8008
    }));
});

gulp.task('default',  ['build'], function() {

});