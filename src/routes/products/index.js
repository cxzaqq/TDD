const express = require("express");
const ctrl = require("./products.ctrl");
const router = express.Router();

router.get("/", ctrl.output.hello);

module.exports = router;
