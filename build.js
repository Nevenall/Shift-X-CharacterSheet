var fs = require('fs')
var sass = require('node-sass')
var handlebars = require('handlebars')
var glob = require('glob')


sass.render({
   file: 'src/sheet.scss'
}, function(err, result) {
   if (result != null) {
      fs.writeFile('dist/sheet.css', result.css, err => {})
   } else {
      console.log(err)
   }
});

fs.copyFile('src/index.html', 'dist/index.html', err => {})


glob("src/fonts/**", (err, files) => {
   fs.mkdir('dist/fonts', err => {})
   files.forEach(f => fs.copyFile(f, f.replace('src', 'dist'), err => {}))
})