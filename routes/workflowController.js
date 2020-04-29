var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
const { postHandler, putHandler, getHandler } = require('./handlers')
const { checkToken } = require('../middleware/jwt');

const api = apiAdapter(process.env.WORKFLOW_BASE_URL)

router.post('/balances/token', checkToken, (req, res) => {
  return postHandler(api, req, res)
})

router.put('/balances/:id', checkToken, (req, res) => {
  return putHandler(api, req, res)
})

router.post('/commitments', checkToken, (req, res) => {
  return postHandler(api, req, res)
})

router.get('/commitments/k', (req, res) => {
    return getHandler(api, req, res)
})

router.post('/answers', checkToken, (req, res) => {
  return postHandler(api, req, res)
})


module.exports = router