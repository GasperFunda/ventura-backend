var express = require("express");
var router = express.Router();
var heartbeatController = require("../controllers/heartbeatController.js");
const auth = require("../middleware/auth.js");

/*
 * GET
 */
router.get("/", auth, heartbeatController.list);

/*
 * GET
 */
router.get("/:id", heartbeatController.show);
router.get("/user/:id", auth, heartbeatController.userHeartbeats);

/*
 * POST
 */
router.post("/", auth, heartbeatController.create);

/*
 * PUT
 */
router.put("/:id", auth, heartbeatController.update);

/*
 * DELETE
 */
router.delete("/:id", auth, heartbeatController.remove);

module.exports = router;
