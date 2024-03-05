const express = require("express");
const ctrl = require("./products.ctrl");
const router = express.Router();

router.get("/", ctrl.getProducts);
router.get("/:productId", ctrl.getProductById);

router.post("/", ctrl.createProduct);

router.put("/:productId", ctrl.updateProduct);

module.exports = router;
