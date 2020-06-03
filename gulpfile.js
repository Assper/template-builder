const gulp = require('gulp')
const tasks = require('./scripts/tasks')

const src = {
  styles: 'src/styles',
  scripts: 'src/scripts',
  templates: 'src/templates',
  assets: 'src/assets/**/*'
}

src.pug = src.templates + '/**/*.pug',
src.sass = src.styles + '/**/*.sass',
src.js = src.scripts + '/**/*.js',
src.svelte = src.scripts + '/**/*.svelte'

const dest = {
	styles: 'dist/styles',
  scripts: 'dist/scripts',
  templates: 'dist',
  assets: 'dist/assets'
}

const scripts = () => tasks.scripts(src.scripts, dest.scripts)
const styles = () => tasks.styles(src.sass, dest.styles)
const templates = () => tasks.templates(src.pug, src.templates, dest.templates)
const assets = () => tasks.assets(src.assets, dest.assets)
const watchFiles = () => tasks.watch(src, dest)
const browserSync = (done) => browserSync('./dist', done)

const watch = gulp.parallel(watchFiles, browserSync)
const build = gulp.parallel(scripts, styles, templates, assets)

exports.watch = watch
exports.build = build
exports.clean = tasks.clean
