var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var PATHS = {
    src: 'src',
    dist: 'dist',
    doc: 'doc'
};

gulp.task('sass', function (){
    gulp.src(PATHS.src + '/nmss.scss')
    .pipe(sass({
        outputStyle: 'compressed',
    }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(PATHS.dist))
    .pipe(gulp.dest(PATHS.doc + '/css'));
});