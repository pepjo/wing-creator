
'use strict' // eslint-disable-line strict

const path = require('path')
const fs = require('fs')

function readFiles (dirname, onFileContent, onError, onEnd) {
  let processedFiles = 0
  let totalFiles

  function handleResponse () {
    processedFiles = processedFiles + 1
    if (processedFiles >= totalFiles) {
      onEnd()
    }
  }

  function processFile (filename, content) {
    onFileContent(filename, content)
    handleResponse()
  }

  function processError (err) {
    onError(err)
    handleResponse()
  }

  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      onError(err)
      return
    }

    totalFiles = filenames.length

    filenames.forEach((filename) => {
      fs.readFile(dirname + filename, 'utf-8', (err2, content) => {
        if (err2) {
          processError(err2)
          return
        }
        processFile(filename, content)
      })
    })
  })
}

function parseFile (content) {
  const name = content.split('\n')[0]
  const data = content
    .split('\n') // separate by lines
    .slice(2, content.split('\n').length - 1) // Ignore first 2 lines
    .map((line) => ( // Parse lines into points
      line
      .split(' ') // Separete numbers
      .filter((item) => (item !== '')) // Delete blanks
      .map((item) => (parseFloat(item, 10))) // Parse numbers
    ))

  return {
    name,
    data,
  }
}

module.exports = (req, res, next) => {
  req.airfoils = [] // eslint-disable-line no-param-reassign

  readFiles(
    path.join(__dirname, '../../airfoils/'),
    // Handle files
    (filename, content) => {
      const file = parseFile(content)
      req.airfoils.push({
        filename,
        name: file.name.trim(),
        data: file.data,
      })
    },
    // Handle errors
    () => {},
    // Handle end
    () => {
      next()
    }
  )
}
