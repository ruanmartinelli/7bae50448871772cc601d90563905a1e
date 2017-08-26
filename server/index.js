require('dotenv').config()

const express = require('express')
const server = express()
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const controllers = require('./controller')

server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '/../dist')))
server.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }))

controllers.init(server)

server.listen(process.env.APP_PORT, err => {
  if (err) throw err

  console.log(`Listening on port ${process.env.APP_PORT}`)
})

module.exports = server
