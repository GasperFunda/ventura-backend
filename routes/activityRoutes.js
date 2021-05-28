var express = require("express");
var router = express.Router();
var activityController = require("../controllers/activityController.js");
const auth = require("../middleware/auth.js");

/*
 * GET
 */
router.get("/", activityController.list);

/*
 * GET
 */
router.get("/:id", auth, activityController.show);
router.get("/user/:id", auth, activityController.getUserActivities);
router.get("/profile/:id", auth, activityController.getProfile);
/*
 * POST
 */
router.post("/", auth, activityController.create);

/*
 * PUT
 */
router.put("/:id", auth, activityController.update);

/*
 * DELETE
 */
router.delete("/:id", auth, activityController.remove);

module.exports = router;
