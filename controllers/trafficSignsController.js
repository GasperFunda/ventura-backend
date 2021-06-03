var TrafficsignsModel = require("../models/trafficSignsModel.js");

/**
 * trafficSignsController.js
 *
 * @description :: Server-side logic for managing trafficSignss.
 */
module.exports = {
  /**
   * trafficSignsController.list()
   */
  list: function (req, res) {
    TrafficsignsModel.find(function (err, trafficSignss) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting trafficSigns.",
          error: err,
        });
      }

      return res.json(trafficSignss);
    });
  },

  /**
   * trafficSignsController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    TrafficsignsModel.findOne({ _id: id }, function (err, trafficSigns) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting trafficSigns.",
          error: err,
        });
      }

      if (!trafficSigns) {
        return res.status(404).json({
          message: "No such trafficSigns",
        });
      }

      return res.json(trafficSigns);
    });
  },

  /**
   * trafficSignsController.create()
   */
  create: function (req, res) {
    var trafficSigns = new TrafficsignsModel({
      type: req.body.type,
      latitude: req.body.latitude,
      longtitude: req.body.longtitude,
      user: req.body.user,
      path: req.body.path,
      image: req.body.image,
    });
    var data = req.body.image.replace("/^data:image/png;base64,/", "");
    var filename = req.body.path;
    require("fs").writeFile(
      "public/images/" + filename,
      data,
      "base64",
      function (err) {
        console.log(err);
      }
    );
    trafficSigns.save(function (err, trafficSigns) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating trafficSigns",
          error: err,
        });
      }

      return res.status(201).json(trafficSigns);
    });
  },

  /**
   * trafficSignsController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    TrafficsignsModel.findOne({ _id: id }, function (err, trafficSigns) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting trafficSigns",
          error: err,
        });
      }

      if (!trafficSigns) {
        return res.status(404).json({
          message: "No such trafficSigns",
        });
      }

      trafficSigns.type = req.body.type ? req.body.type : trafficSigns.type;
      trafficSigns.value = req.body.value ? req.body.value : trafficSigns.value;
      trafficSigns.location = req.body.location
        ? req.body.location
        : trafficSigns.location;

      trafficSigns.save(function (err, trafficSigns) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating trafficSigns.",
            error: err,
          });
        }

        return res.json(trafficSigns);
      });
    });
  },

  /**
   * trafficSignsController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    TrafficsignsModel.findByIdAndRemove(id, function (err, trafficSigns) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the trafficSigns.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
