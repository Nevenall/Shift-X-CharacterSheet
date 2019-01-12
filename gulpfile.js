const {
   parallel,
   series,
   src,
   dest,
   watch
} = require('gulp')

const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const del = require('delete')

function css() {
   return src('src/**/*.scss')
      .pipe(sass()).on('error', sass.logError)
      .pipe(dest('dist/'))
}


function html() {
   return src('src/**/*.html')
      .pipe(dest('dist/'))
}

function assets() {
   return src('src/assets/**')
      .pipe(dest('dist/' + "/assets"))
}

function fonts() {
   return src('src/fonts/**')
      .pipe(dest('dist/' + "/fonts"))
}

function javascript() {
   return src('src/**/*.js')
      .pipe(dest('dist/'))
}

function clean(callback) {
   return del('dist/**', callback)
}

const buildSeries = series(clean, html, css, javascript, fonts, assets)


function watchTask() {
   watch('src/**', buildSeries)
}




exports.build = buildSeries
exports.watch = watchTask
exports.default = buildSeries