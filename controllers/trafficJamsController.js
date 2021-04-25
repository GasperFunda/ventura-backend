var TrafficjamsModel = require('../models/trafficJamsModel.js');

/**
 * trafficJamsController.js
 *
 * @description :: Server-side logic for managing trafficJamss.
 */
module.exports = {

    /**
     * trafficJamsController.list()
     */
    list: function (req, res) {
        TrafficjamsModel.find(function (err, trafficJamss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trafficJams.',
                    error: err
                });
            }

            return res.json(trafficJamss);
        });
    },

    /**
     * trafficJamsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        TrafficjamsModel.findOne({_id: id}, function (err, trafficJams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trafficJams.',
                    error: err
                });
            }

            if (!trafficJams) {
                return res.status(404).json({
                    message: 'No such trafficJams'
                });
            }

            return res.json(trafficJams);
        });
    },

    /**
     * trafficJamsController.create()
     */
    create: function (req, res) {
        var trafficJams = new TrafficjamsModel({
			title : req.body.title,
			location : req.body.location,
			severity : req.body.severity,
			average_speed : req.body.average_speed
        });

        trafficJams.save(function (err, trafficJams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating trafficJams',
                    error: err
                });
            }

            return res.status(201).json(trafficJams);
        });
    },

    /**
     * trafficJamsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        TrafficjamsModel.findOne({_id: id}, function (err, trafficJams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trafficJams',
                    error: err
                });
            }

            if (!trafficJams) {
                return res.status(404).json({
                    message: 'No such trafficJams'
                });
            }

            trafficJams.title = req.body.title ? req.body.title : trafficJams.title;
			trafficJams.location = req.body.location ? req.body.location : trafficJams.location;
			trafficJams.severity = req.body.severity ? req.body.severity : trafficJams.severity;
			trafficJams.average_speed = req.body.average_speed ? req.body.average_speed : trafficJams.average_speed;
			
            trafficJams.save(function (err, trafficJams) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating trafficJams.',
                        error: err
                    });
                }

                return res.json(trafficJams);
            });
        });
    },

    /**
     * trafficJamsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        TrafficjamsModel.findByIdAndRemove(id, function (err, trafficJams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the trafficJams.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
