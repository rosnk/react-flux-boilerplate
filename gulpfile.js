var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');

var jsSources = [
	'src/js/main.js',
	'src/js/custom/*.js'
];



gulp.task('coffee', function(){
	gulp.src('src/js/coffee/**/*.*')
	.pipe(coffee({bare: true})
		.on('error', gutil.log))
	.pipe(gulp.dest('src/js/custom'))
});

// gulp.task('js', function() {
//   return gulp.src('js/**/*.js')
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('./dist/'));
// });


gulp.task('browserify', function() {
    // Single entry point to browserify 
    gulp.src(jsSources)
        .pipe(browserify({
          transform: 'reactify'
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
});

gulp.task('compass', function() {
    // Single entry point to browserify 
    gulp.src('src/css/style.scss')
       .pipe(compass({
       		sass: 'src/css',
       		image: 'dist/images',
       		style: 'compressed'
       })
       .on('error', gutil.log))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
});

gulp.task('copy', function() {
    // Single entry point to browserify 
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
});

gulp.task('watch', function() {
	gulp.watch('src/index.html', ['copy']);
    gulp.watch('src/js/coffee/**/*.*', ['coffee']);
    gulp.watch(jsSources, ['browserify']);
    gulp.watch('src/css/**/*.*', ['compass']);

});

gulp.task('connect', function() {
	gulp.server({
		root: 'dist/',
		livereload: true
	});
    

});



gulp.task('default', ['coffee', 'browserify', 'compass', 'copy', 'connect', 'watch']);