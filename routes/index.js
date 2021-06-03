var express = require("express");
var router = express.Router();
const multer = require("multer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Ventura" });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }
    res.send(req.file);
  });
});

module.exports = router;
