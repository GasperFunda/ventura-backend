var CompassModel = require("../models/compassModel.js");

module.exports = {
  /**
   * compassModel.get()
   */
  get: function (req, res) {
    CompassModel.findOne(function (err, compassData) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting data from db.",
          error: err,
        });
      }
      console.log(compassData);
      return res.json(compassData);
    }).sort("-counter");
  },
  create: function (req, res) {
    var compass = new CompassModel({
      counter: req.body.counter,
      yaw: req.body.yaw,
    });

    compass.save(function (err, compass) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error when creating compass",
          error: err,
        });
      }

      return res.status(201).json(compass);
    });
  },
};
