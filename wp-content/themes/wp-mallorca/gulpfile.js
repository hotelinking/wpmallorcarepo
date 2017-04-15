'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');

 //Compile sass files
 gulp.task('sass', function () {
 	return gulp.src('./sass/**/*.scss')
 	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
 	.pipe(gulp.dest('./style.css'));
 });

//Compile JS files
gulp.task('js', function (cb) {
	pump([
		gulp.src('./js/**/*.js'),
		uglify()
		.pipe(rename({ suffix: '.min' })),
		gulp.dest('./js')
		],
		cb
	);
});

//Compile images
gulp.task('img', () =>
	gulp.src('./img/**/*.*')
	.pipe(imagemin())
	.pipe(gulp.dest('./img'))
	);

//Create dist folder
var filesToMove = [
	'./partials/**/*.*',
	'./img/**/*.*',
	'./js/**/*.*',
	'./*.php',
	'./style.css',
];

gulp.task('dist',['sass','js','img'], function(){
	// the base option sets the relative root for the set of files,
	// preserving the folder structure
	gulp.src(filesToMove, { base: './' })
	.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch('./js/**/*.js', ['js']);
});