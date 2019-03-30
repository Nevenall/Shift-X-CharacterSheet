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
const replace = require('gulp-replace')
const sync = require('browser-sync').create()

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
      .pipe(replace(/class="(.+?)"/g, function(match, p1, offset, string) {
         if (p1 !== 'charsheet') {
            var classes = p1.split(' ')
            return `class="${classes.map(el => 'sheet-' + el).join(' ')}"`
         } else {
            return `class="charsheet"`
         }
      }))
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


function watchSource(cb) {
   sync.init({
      server: "dist",
      files: ['dist/**'],
      open: false
   })
   watch('src/**', rebuild)
   cb()
}

const build = series(clean, html, css, javascript, fonts, assets)
const rebuild = series(html, css)

exports.build = series(asDevelopment, build)
exports.watch = series(build, watchSource)
exports.production = series(asProduction, build)
exports.default = build