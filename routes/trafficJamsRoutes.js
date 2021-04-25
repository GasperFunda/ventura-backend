var express = require('express');
var router = express.Router();
var trafficJamsController = require('../controllers/trafficJamsController.js');

/*
 * GET
 */
router.get('/', trafficJamsController.list);

/*
 * GET
 */
router.get('/:id', trafficJamsController.show);

/*
 * POST
 */
router.post('/', trafficJamsController.create);

/*
 * PUT
 */
router.put('/:id', trafficJamsController.update);

/*
 * DELETE
 */
router.delete('/:id', trafficJamsController.remove);

module.exports = router;
