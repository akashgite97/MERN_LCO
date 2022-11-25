var express = require("express");
var router = express.Router();
const {MakePayment} = require("../controllers/MakePayment");

router.post("/stripepayment", MakePayment);

module.exports = router;
