var TrafficsignstypeModel = require('../models/trafficSignsTypeModel.js');

/**
 * trafficSignsTypeController.js
 *
 * @description :: Server-side logic for managing trafficSignsTypes.
 */
module.exports = {

    /**
     * trafficSignsTypeController.list()
     */
    list: function (req, res) {
        TrafficsignstypeModel.find(function (err, trafficSignsTypes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trafficSignsType.',
                    error: err
                });
            }

            return res.json(trafficSignsTypes);
        });
    },

    /**
     * trafficSignsTypeController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        TrafficsignstypeModel.findOne({_id: id}, function (err, trafficSignsType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trafficSignsType.',
                    error: err
                });
            }

            if (!trafficSignsType) {
                return res.status(404).json({
                    message: 'No such trafficSignsType'
                });
            }

            return res.json(trafficSignsType);
        });
    },

    /**
     * trafficSignsTypeController.create()
     */
    create: function (req, res) {
        var trafficSignsType = new TrafficsignstypeModel({
			title : req.body.title
        });

        trafficSignsType.save(function (err, trafficSignsType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating trafficSignsType',
                    error: err
                });
            }

            return res.status(201).json(trafficSignsType);
        });
    },

    /**
     * trafficSignsTypeController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        TrafficsignstypeModel.findOne({_id: id}, function (err, trafficSignsType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trafficSignsType',
                    error: err
                });
            }

            if (!trafficSignsType) {
                return res.status(404).json({
                    message: 'No such trafficSignsType'
                });
            }

            trafficSignsType.title = req.body.title ? req.body.title : trafficSignsType.title;
			
            trafficSignsType.save(function (err, trafficSignsType) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating trafficSignsType.',
                        error: err
                    });
                }

                return res.json(trafficSignsType);
            });
        });
    },

    /**
     * trafficSignsTypeController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        TrafficsignstypeModel.findByIdAndRemove(id, function (err, trafficSignsType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the trafficSignsType.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
