var express = require('express');
var router = express.Router();
var trafficSignsController = require('../controllers/trafficSignsController.js');

/*
 * GET
 */
router.get('/', trafficSignsController.list);

/*
 * GET
 */
router.get('/:id', trafficSignsController.show);

/*
 * POST
 */
router.post('/', trafficSignsController.create);

/*
 * PUT
 */
router.put('/:id', trafficSignsController.update);

/*
 * DELETE
 */
router.delete('/:id', trafficSignsController.remove);

module.exports = router;
