var ActivityModel = require("../models/activityModel.js");

/**
 * activityController.js
 *
 * @description :: Server-side logic for managing activitys.
 */
module.exports = {
  /**
   * activityController.list()
   */
  list: function (req, res) {
    ActivityModel.find(function (err, activitys) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting activity.",
          error: err,
        });
      }

      return res.json(activitys);
    });
  },

  /**
   * activityController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    ActivityModel.findOne({ _id: id }, function (err, activity) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting activity.",
          error: err,
        });
      }

      if (!activity) {
        return res.status(404).json({
          message: "No such activity",
        });
      }

      return res.json(activity);
    });
  },
  getUserActivities: function (req, res) {
    var id = req.params.id;
    ActivityModel.find({ user: id }, function (err, activities) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting activities.",
          error: err,
        });
      }

      if (!activities) {
        return res.status(404).json({
          message: "This user has no activities",
        });
      }

      return res.json(activities);
    });
  },

  /**
   * activityController.create()
   */
  create: function (req, res) {
    var activity = new ActivityModel({
      title: req.body.title,
      location: req.body.location,
      speed: req.body.speed,
      direction: req.body.direction,
      distance: req.body.distance,
      type: req.body.type,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      user: req.body.user,
    });

    activity.save(function (err, activity) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating activity",
          error: err,
        });
      }

      return res.status(201).json(activity);
    });
  },

  /**
   * activityController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    ActivityModel.findOne({ _id: id }, function (err, activity) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting activity",
          error: err,
        });
      }

      if (!activity) {
        return res.status(404).json({
          message: "No such activity",
        });
      }

      activity.title = req.body.title ? req.body.title : activity.title;
      activity.location = req.body.location
        ? req.body.location
        : activity.location;
      activity.speed = req.body.speed ? req.body.speed : activity.speed;
      activity.direction = req.body.direction
        ? req.body.direction
        : activity.direction;
      activity.distance = req.body.distance
        ? req.body.distance
        : activity.distance;
      activity.type = req.body.type ? req.body.type : activity.type;
      activity.start_time = req.body.start_time
        ? req.body.start_time
        : activity.start_time;
      activity.end_time = req.body.end_time
        ? req.body.end_time
        : activity.end_time;
      activity.user = req.body.user ? req.body.user : activity.user;

      activity.save(function (err, activity) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating activity.",
            error: err,
          });
        }

        return res.json(activity);
      });
    });
  },

  /**
   * activityController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    ActivityModel.findByIdAndRemove(id, function (err, activity) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the activity.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
