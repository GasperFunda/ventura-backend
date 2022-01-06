var express = require("express");
var router = express.Router();
var compassController = require("../controllers/compassController.js");

/*
 * GET
 */
router.get("/", compassController.get);
router.post("/", compassController.create);
module.exports = router;
