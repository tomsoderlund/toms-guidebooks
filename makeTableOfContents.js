/**
 * makeTableOfContents command-line task
 * @description Generate a TOC
 * @module makeTableOfContents
 * @author Tom Söderlund
 */

const fs = require('fs')
const path = require('path')

const AVOID_LIST = ['.git', '.DS_Store', 'makeTableOfContents.js', 'LICENSE', 'README.md', 'Sublime snippets']
const ROOT_FOLDER = '/Users/tomsoderlund/Documents/Guidebooks/'

const includesSomeString = (longString, stringArray) => stringArray.reduce((result, smallString) => result || longString.includes(smallString), false)

const scanFolder = function (dir, done) {
  let results = []
  fs.readdir(dir, function (err, list) {
    if (err) return done(err)
    let i = 0;
    (function next () {
      let file = list[i++]
      if (!file) return done(null, results)
      file = path.resolve(dir, file)
      fs.stat(file, function (err, stat) {
        if (stat && !includesSomeString(file, AVOID_LIST)) {
          if (stat.isDirectory()) {
            scanFolder(file, function (err, res) {
              results = results.concat(res)
              next()
            })
          } else {
            results.push(file)
            next()
          }
        } else {
          next()
        }
      })
    })()
  })
}

function set (object, keys, val) {
  keys = Array.isArray(keys) ? keys : keys.split('.')
  if (keys.length > 1) {
    object[keys[0]] = object[keys[0]] || {}
    return set(object[keys[0]], keys.slice(1), val)
  }
  object[keys[0]] = val
}

const pad = (count, str = ' ') => Array(count).fill(str).join('')

const formatFileTree = (fileTree, level = 0) => {
  return Object.keys(fileTree).map(fileName => {
    const fileValue = fileTree[fileName]
    const isFolder = typeof fileValue === 'object'
    const niceName = fileName.replace('.md', '')
    return isFolder
      ? pad(level * 2) + `- ${niceName}:\n` + formatFileTree(fileValue, level + 1)
      : pad(level * 2) + `- [${niceName}](./${fileValue.replace(/ /g, '%20')})`
  }).join('\n')
}

async function makeTableOfContents ({ folderName = '.' } = {}) {
  scanFolder(folderName, (err, fileNames) => {
    const relativeFiles = fileNames.map(fileName => fileName.replace(ROOT_FOLDER, ''))
    const fileTree = relativeFiles.reduce((result, filePath) => {
      let newResult = { ...result }
      set(newResult, filePath.split('/'), filePath)
      return newResult
    }, {})
    console.log(formatFileTree(fileTree))
  })
}

const ARGUMENTS = []

if ((process.argv.length - 2) < ARGUMENTS.length) {
  console.log('Usage: node tasks/makeTableOfContents ' + ARGUMENTS.map(str => `[${str.split(':')[0]}]`).join(' '))
  console.log('  E.g: node tasks/makeTableOfContents ' + ARGUMENTS.map(str => str.split(':')[1] || '“something”').join(' '))
} else {
  const argumentObj = process.argv.slice(2).reduce((result, value, index) => ({ ...result, [ARGUMENTS[index] ? ARGUMENTS[index].split(':')[0] : 'arg']: value }), {})
  makeTableOfContents(argumentObj)
}
