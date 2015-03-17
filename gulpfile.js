var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserify   = require('browserify');
var watchify     = require('watchify');
var source       = require('vinyl-source-stream');
var watch        = require('gulp-watch');
var concat       = require('gulp-concat');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var server       = require('gulp-express');
var plumber      = require('gulp-plumber');
var util = require('gulp-util');

var PATHS = {
    src: './src',
    dist: './dist',
    doc: './doc'
};

function onError() {
    return function() {
        this.emit('end');
    };
}

var bundler = watchify(browserify(PATHS.doc + '/js/doc.js'));

gulp.task('scss', function (){
    return gulp.src( PATHS.src + '/themes/' + (util.env.theme ? util.env.theme : 'prototype') + '/*.scss')
    .pipe(sass({
        outputStyle: 'compressed',
        errLogToConsole: true
    }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(PATHS.dist))

    .pipe(gulp.dest(PATHS.doc + '/css/'));
});

gulp.task('js', function() {
    return bundler.bundle()
    .pipe(plumber(onError()))
    .pipe(source('doc.bundle.js'))
    .pipe(gulp.dest(PATHS.doc + '/'));
});

gulp.task('tpl', function() {
    return gulp.src(PATHS.src + '/**/*.tpl')
    .pipe(plumber(onError()))
    .pipe(concat('nmss.tpl'))
    .pipe(gulp.dest(PATHS.doc + '/tpl'));
});

gulp.task("serve", function() {
    server.run(['./bin/server.js']);

    watch(PATHS.src + '/**/*.scss',  function(e) { gulp.start('scss');});
    watch(PATHS.src + '/**/*.tpl',   function(e) { gulp.start('tpl');});
    watch(PATHS.doc + '/js/**/*.js', function(e) { gulp.start('js');});
});