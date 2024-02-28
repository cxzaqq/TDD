const express = require("express");
const ctrl = require("./products.ctrl");
const router = express.Router();

router.post("/", ctrl.createProduct);

module.exports = router;
