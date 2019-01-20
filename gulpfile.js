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
const vars = require('gulp-sass-variables')

function asDevelopment(callback) {
   process.env.NODE_ENV = "development"
   callback()
}

function asProduction(callback) {
   process.env.NODE_ENV = 'production'
   callback()
}

function css() {
   const env = process.env.NODE_ENV || "development"

   return src('src/sheet.scss')
      .pipe(vars({
         $env: env,
         $base: env === 'production' ? "https://cdn.nevenallgames.com/" : ""
      }))
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


function watchSource() {
   watch('src/**', build)
}

const build = series(clean, html, css, javascript, fonts, assets)

exports.build = series(asDevelopment, build)
exports.watch = series(build, watchSource)
exports.production = series(asProduction, build)
exports.default = build