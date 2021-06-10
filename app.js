var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRoutes");
var activitiesRouter = require("./routes/activityRoutes");
var trafficSignsRoutes = require("./routes/trafficSignsRoutes");
var heartbeatRoutes = require("./routes/heartbeatRoutes");
const createError = require("http-errors");
var cors = require("cors");
var app = express();
dotenv.config();
var mongoDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ventura.2ym7e.mongodb.net/Ventura?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
cors({ credentials: true, origin: true, exposedHeaders: "*" });
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/activities", activitiesRouter);
app.use("/trafficSigns", trafficSignsRoutes);
app.use("/heartbeat", heartbeatRoutes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
