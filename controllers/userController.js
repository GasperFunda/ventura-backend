var UserModel = require("../models/userModel.js");

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {
  /**
   * userController.list()
   */
  list: function (req, res) {
    UserModel.find(function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      return res.json(users);
    });
  },
  register: function (req, res) {
    var user = new UserModel({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });

    user.save(function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating user",
          error: err,
        });
      }

      return res.status(201).json(user);
    });
  },
  login: function (req, res, next) {
    UserModel.authenticate(
      req.body.email,
      req.body.password,
      function (error, user) {
        if (error || !user) {
          var err = new Error("Wrong email or password");
          err.status = 401;
          console.log(error);
          return next(err);
        } else {
          req.session.userId = user._id;
          //return res.redirect("profile");
          return res.status(201).json(user);
        }
      }
    );
  },

  /**
   * userController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    UserModel.findOne({ _id: id }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }

      return res.json(user);
    });
  },

  /**
   * userController.create()
   */
  create: function (req, res) {
    var user = new UserModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });

    user.save(function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating user",
          error: err,
        });
      }

      return res.status(201).json(user);
    });
  },

  /**
   * userController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    UserModel.findOne({ _id: id }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }
      user.first_name = req.body.first_name
        ? req.body.first_name
        : user.first_name;
      user.last_name = req.body.last_name ? req.body.last_name : user.last_name;
      user.email = req.body.email ? req.body.email : user.email;
      user.password = req.body.password ? req.body.password : user.password;

      user.save(function (err, user) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating user.",
            error: err,
          });
        }

        return res.json(user);
      });
    });
  },

  /**
   * userController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    UserModel.findByIdAndRemove(id, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the user.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
