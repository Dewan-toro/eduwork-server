const router = require("express").Router();
const invoiceController = require("./controller");

router.get("/invoices", invoiceController.show);

module.exports = router;
