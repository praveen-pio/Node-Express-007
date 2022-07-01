// Route.js
const express = require("express")
const router = express.Router();
const fs = require('fs');
const productRoutes = require('./product.js') // import product route
router.use(productRoutes) // use product route

module.exports = router;