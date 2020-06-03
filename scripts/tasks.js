const gulp = require('gulp')
const del = require('del')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const browsersync = require('browser-sync').create()
const webpack = require('webpack')
const webpackStream =  require('webpack-stream')

const config = require('./webpack.config')

function scripts(src, dest) {
  return gulp.src(src)
    .pipe(webpackStream(config, webpack))
    .pipe(gulp.dest(dest))
}

function styles(src, dest) {
  return gulp.src(src)
    .pipe(sass({}))
    .pipe(gulp.dest(dest))
}

function templates(src, baseDir, dest) {
	return gulp.src(src)
		.pipe(pug({ basedir: baseDir }))
    .pipe(gulp.dest(dest))
}

function assets(src, dest) {
  return gulp
    .src(src)
    .pipe(gulp.dest(dest))
}

function browserSync(baseDir, done) {
  browsersync.init({
    server: {
      baseDir
    },
    notify: false,
    port: 3000
  })
  done()
}

function watch(src, dest) {
  gulp.watch([src.sass], gulp.series(() => styles(src.sass, dest.styles), browsersync.reload))
  gulp.watch([src.js, src.svelte], gulp.series(() => scripts(src.scripts, dest.scripts), browsersync.reload))
  gulp.watch([src.pug], gulp.series(() => templates(src.pug, src.templates, dest.templates), browsersync.reload))
  gulp.watch([src.assets], gulp.series(() => assets(src.assets, dest.assets), browsersync.reload))
}

exports.scripts = scripts
exports.styles = styles
exports.templates = templates
exports.assets = assets
exports.watch = watch
exports.browserSync = browserSync
exports.clean = gulp.task('clean', () => del('dist/**/*'))
