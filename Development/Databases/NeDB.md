# NeDB

Local database, perfect for Electron: https://medium.com/@shivekkhurana/persist-data-in-electron-apps-using-nedb-5fa35500149a

https://github.com/bajankristof/nedb-promises
https://github.com/louischatriot/nedb

## Datastore

// main/src/db.js
const { app } = require('electron')
const Datastore = require('nedb-promises')

const dbFactory = (fileName) => Datastore.create({
  filename: `${isDevelopment() ? '.' : app.getAppPath('userData')}/data/${fileName}`,
  autoload: true,
  // timestampData: true
})

const database = {
  tags: dbFactory('tags.db')
}

module.exports = database

## Searching: find

    database.tags.find({ name: new RegExp('^' + name, 'i') })

## Creating

    const tag = await database.tags.insert({ name: 'wow', hej: 'ok', _modified: true })

Note: fields can start with `_` but not with `$` (exception).
