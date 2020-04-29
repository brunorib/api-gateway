var express = require('express');
var router = express.Router()
var authController = require('./authController')
var worklowController = require('./workflowController')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(authController)
router.use(worklowController)

module.exports = router;
