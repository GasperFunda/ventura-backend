const heartbeatModel = require("../models/heartbeatModel.js");
var HeartbeatModel = require("../models/heartbeatModel.js");

/**
 * heartbeatController.js
 *
 * @description :: Server-side logic for managing heartbeats.
 */
module.exports = {
  /**
   * heartbeatController.list()
   */
  list: function (req, res) {
    HeartbeatModel.find(function (err, heartbeats) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting heartbeat.",
          error: err,
        });
      }

      return res.json(heartbeats);
    });
  },
  userHeartbeats: function (req, res) {
    var id = req.params.id;
    heartbeatModel
      .find({ user: id }, function (err, heartbeats) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting heartbeats.",
            error: err,
          });
        }

        if (!heartbeats) {
          return res.status(404).json({
            message: "This user has no heartbeats",
          });
        }

        return res.json(heartbeats);
      })
      .sort({ date: -1 });
  },
  /**
   * heartbeatController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    HeartbeatModel.findOne({ _id: id }, function (err, heartbeat) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting heartbeat.",
          error: err,
        });
      }

      if (!heartbeat) {
        return res.status(404).json({
          message: "No such heartbeat",
        });
      }

      return res.json(heartbeat);
    });
  },

  /**
   * heartbeatController.create()
   */
  create: function (req, res) {
    var heartbeat = new HeartbeatModel({
      avgHeartbeat: req.body.avgHeartbeat,
      date: req.body.date,
      user: req.body.user,
    });

    heartbeat.save(function (err, heartbeat) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error when creating heartbeat",
          error: err,
        });
      }

      return res.status(201).json(heartbeat);
    });
  },

  /**
   * heartbeatController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    HeartbeatModel.findOne({ _id: id }, function (err, heartbeat) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting heartbeat",
          error: err,
        });
      }

      if (!heartbeat) {
        return res.status(404).json({
          message: "No such heartbeat",
        });
      }

      heartbeat.avgHeartbeat = req.body.avgHeartbeat
        ? req.body.avgHeartbeat
        : heartbeat.avgHeartbeat;
      heartbeat.date = req.body.date ? req.body.date : heartbeat.date;
      heartbeat.user = req.body.user ? req.body.user : heartbeat.user;

      heartbeat.save(function (err, heartbeat) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating heartbeat.",
            error: err,
          });
        }

        return res.json(heartbeat);
      });
    });
  },

  /**
   * heartbeatController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    HeartbeatModel.findByIdAndRemove(id, function (err, heartbeat) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the heartbeat.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
