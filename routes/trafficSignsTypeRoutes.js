var express = require('express');
var router = express.Router();
var trafficSignsTypeController = require('../controllers/trafficSignsTypeController.js');

/*
 * GET
 */
router.get('/', trafficSignsTypeController.list);

/*
 * GET
 */
router.get('/:id', trafficSignsTypeController.show);

/*
 * POST
 */
router.post('/', trafficSignsTypeController.create);

/*
 * PUT
 */
router.put('/:id', trafficSignsTypeController.update);

/*
 * DELETE
 */
router.delete('/:id', trafficSignsTypeController.remove);

module.exports = router;
