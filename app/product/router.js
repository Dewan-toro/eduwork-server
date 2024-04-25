const router = require("express").Router();
const multer = require("multer");
const os = require("os");
const { police_check } = require("../../middlewares");

const productController = require("./controller");

router.post(
  "/products",
  multer({ dest: os.tmpdir() }).single("image"),
  police_check("create", "Product"),
  productController.store
);
router.get("/products", productController.index);
router.put(
  "/products/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  police_check("update", "Product"),
  productController.update
);
router.delete(
  "/products/:id",
  police_check("delete", "Product"),
  productController.destroy
);

module.exports = router;
