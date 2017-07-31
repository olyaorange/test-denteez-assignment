var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

/*====== Default =====*/
gulp.task('default', ['styles', 'scripts', 'images', 'copyFonts'], function() {
    gulp.start('watch');
});

/*====== Styles =====*/
gulp.task('styles', function() {
    return gulp.src('src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('style.css'))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename('style.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/assets/css'))
        //.pipe(notify({ message: 'Styles task complete' }));
});

/*====== Scripts =====*/
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        //.pipe(notify({ message: 'Scripts task complete' }));
});

/*====== Images =====*/
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/assets/images'))
        //.pipe(notify({ message: 'Images task complete' }));
});

/*====== Fonts =====*/
gulp.task('copyFonts', function () {
    gulp.src('src/fonts/**')
        .pipe(gulp.dest('dist/assets/fonts'));
});

/*====== Watch =====*/
gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);
    livereload.listen();
    gulp.watch(['dist/**']).on('change', livereload.changed);
});