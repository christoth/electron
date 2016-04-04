const fs = require('fs')
const path = require('path')
const glob = require('glob')
const marky = require('marky-markdown')

function listFile (file) {
  console.log(`- [${file.heading}](https://github.com/atom/electron/blob/master/docs/api/${file.filename})`)
}

glob(path.join(__dirname, '**/*.md'), function (error, files) {
  if (error) return console.log(error)
  files = files.map((file) => {
    var $ = marky(fs.readFileSync(file, 'utf8'))
    return {
      filename: path.basename(file),
      heading: $('h1').text()
    }
  })

  console.log(`\n## CamelCase\n`)
  files.filter((file) => {
    return file.heading[0] === file.heading[0].toUpperCase() && !file.heading.match(/\s/)
  }).map(listFile)

  console.log(`\n## mixedCase\n`)
  files.filter((file) => {
    return file.heading[0] === file.heading[0].toLowerCase() && !file.heading.match(/\s/)
  }).map(listFile)

  console.log(`\n## Other\n`)
  files.filter((file) => {
    return file.heading.match(/\s/)
  }).map(listFile)
})
