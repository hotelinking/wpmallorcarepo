'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

//Compile sass files
gulp.task('sass',['clean_css'], function () {
	return gulp.src('./sass/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./'));
});

//Clean style.css
gulp.task('clean_css', function () {
	return gulp.src('./style.css', {read: false})
	.pipe(clean());
});

//Compile JS files
gulp.task('js', ['clean_js'],function (cb) {
	pump([
		gulp.src('./js/**/*.js'),
		uglify()
		.pipe(rename({ suffix: '.min' })),
		gulp.dest('./js')
		],
		cb
	);
});

//Clean js
gulp.task('clean_js', function () {
	return gulp.src('./js/*.min.js', {read: false})
	.pipe(clean());
});

//Compile images
gulp.task('img', () =>
	gulp.src('./img/**/*.*')
	.pipe(imagemin())
	.pipe(gulp.dest('./img'))
	);

//Files and directories to add to distribution theme folder
var filesToMove = [
	'./partials/**/*.*',
	'./img/**/*.*',
	'./js/**/*.min.js',
	'./*.php',
	'./style.css',
];

//Create distribution theme folder
gulp.task('dist',['sass','js','img'], function(){
	// the base option sets the relative root for the set of files,
	// preserving the folder structure
	gulp.src(filesToMove, { base: './' })
	.pipe(gulp.dest('dist'));
});

//Watch for changes
gulp.task('watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch('./js/**/*.js', ['js']);
});