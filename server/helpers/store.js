const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ user: {}, token: {} }).write()

function saveUser (user) {
  db.set('user', user).write()
}

function saveToken (token) {
  db.set('token', token).write()
}

function getToken () {
  return db.get('token').value()
}

function getUser () {
  return db.get('user').value()
}

module.exports = { getToken, saveToken, saveUser, getUser }
