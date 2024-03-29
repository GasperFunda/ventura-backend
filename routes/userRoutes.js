var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController.js");
const auth = require("../middleware/auth.js");

/*
 * GET
 */
router.get("/", userController.list);

/*
 * GET
 */
router.get("/:id", userController.show);

/*
 * POST
 */

router.post("/login", userController.login);
router.post("/register", userController.register);

/*
 * PUT
 */
router.put("/:id", userController.update);

/*
 * DELETE
 */
router.delete("/:id", userController.remove);

module.exports = router;
