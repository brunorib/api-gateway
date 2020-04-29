var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
const { postHandler, putHandler, getHandler } = require('./handlers')
const { checkToken } = require('../middleware/jwt');

const api = apiAdapter(process.env.AUTH_BASE_URL)

// Specific user
router.get('/users/:id', checkToken, (req, res) => {
  return getHandler(api, req, res)
})
router.put('/users/:id', checkToken, (req, res) => {
  return putHandler(api, req, res)
})

// Creation of things
router.post('/login', (req, res) => {
  return postHandler(api, req, res)
})
router.post('/users', (req, res) => {
  console.log(process.env.AUTH_BASE_URL)
  return postHandler(api, req, res)
})


module.exports = router