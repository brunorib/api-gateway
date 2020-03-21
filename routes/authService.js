var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
const { postHandler, putHandler, getHandler } = require('./handlers')

const BASE_URL = 'http://localhost:4567'
const api = apiAdapter(BASE_URL)

// Specific user
router.get('/users/:id', (req, res) => {
  return getHandler(api, req, res)
})
router.put('/users/:id', (req, res) => {
  return putHandler(api, req, res)
})

// Creation of things
router.post('/login', (req, res) => {
  return postHandler(api, req, res)
})
router.post('/users', (req, res) => {
  return postHandler(api, req, res)
})


module.exports = router