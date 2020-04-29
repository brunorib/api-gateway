var express = require('express');
var router = express.Router()
var authController = require('./authController')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(authController)

module.exports = router;
