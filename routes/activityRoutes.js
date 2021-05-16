var express = require("express");
var router = express.Router();
var activityController = require("../controllers/activityController.js");

/*
 * GET
 */
router.get("/", activityController.list);

/*
 * GET
 */
router.get("/:id", activityController.show);
router.get("/user/:id", activityController.getUserActivities);
router.get("/profile/:id", activityController.getProfile);
/*
 * POST
 */
router.post("/", activityController.create);

/*
 * PUT
 */
router.put("/:id", activityController.update);

/*
 * DELETE
 */
router.delete("/:id", activityController.remove);

module.exports = router;
