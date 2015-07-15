(function () {
	'use strict';

	var gulp = require('gulp'),
		colors = require('colors'),
		gulpSass = require('gulp-sass'),
		gulpWatch = require('gulp-watch'),
		gulpUglify = require('gulp-uglify'),
		gulpConcat = require('gulp-concat'),
		gulpJsHint = require('gulp-jshint'),
		gulpSourceMaps = require('gulp-sourcemaps'),
		jsHintStylish = require('jshint-stylish');

	function sassTask() {
		return gulp
			.src('./styles/**/*.scss')
			.pipe(gulpSourceMaps.init())
			.pipe(gulpSass({
				outputStyle: 'compressed',
				errLogToConsole: true
			}))
			.pipe(gulpSourceMaps.write())
			.pipe(gulp.dest('./dist'));
	}
	
	function sassWatchTask() {
		gulpWatch('./styles/**/*.scss', function (cb) {
			console.log(colors.yellow.underline('SASS RUN >'));
			sassTask();
		});
	}
	
	
	function jsHintTask() {
		return gulp
			.src('./app/**/*.js')
			.pipe(gulpJsHint())
			.pipe(gulpJsHint.reporter(jsHintStylish));
	}
	
	function jsHintWatchTask() {
		gulpWatch('./app/**/*.js', function () {
			console.log(colors.yellow.underline('JS Hint RUN >'));
			jsHintTask();
		});
	}
	
	
	function jsUglifyConcatTask() {
		return gulp
			.src(['./app/**/*.module.js', 
				  './app/**/*.config.js', 
				  './app/**/*.run.js', 
				  './app/**/!(*.module|*.config|*.run).js'])
			.pipe(gulpSourceMaps.init())
			.pipe(gulpConcat('./dist/app.min.js'))
			.pipe(gulpUglify())
			.pipe(gulpSourceMaps.write())
			.pipe(gulp.dest(''));
	}
	
	function jsUglifyConcatWatchTask() {
		gulpWatch('./app/**/*.js', function () {
			console.log(colors.yellow.underline('JS Uglify/Concat RUN >'));
			jsUglifyConcatTask();
		});
	}
	
	
	gulp.task('sass', sassTask);
	gulp.task('jsHint', jsHintTask);
	gulp.task('uglify-concat', jsUglifyConcatTask);
	
	gulp.task('sass-watch', sassWatchTask);
	gulp.task('jsHint-watch', jsHintWatchTask);
	gulp.task('uglify-concat-watch', jsUglifyConcatWatchTask);
	
	gulp.task('default', ['sass', 'jsHint', 'uglify-concat']);

}());