var APP_PORT = 3000;

var Express = require("express");
var app = Express()
var path = require("path")

app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "127.0.0.1");

// serve all static files by their name
app.use(Express.static(path.join(__dirname + "/public")));

// catch-all handles all other requests as the index page
app.use(function(req, res, next) {
  extension = req.path.substring(req.path.lastIndexOf('.'))
  if ([".js", ".css"].indexOf(extension) >= 0) {
    next()
  } else {
    res.sendFile(path.join(__dirname + '/public/index.html'));
  }
});

app.listen(app.get("port"), app.get("host"), function() {
  console.log("Express server listening on port " + app.get("port"));
})