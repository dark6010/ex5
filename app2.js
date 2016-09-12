var express = require("express");
var app = express();
var path = require("path");
app.use(express.static(path.resolve(__dirname, "public")));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", function(req, res) {
 res.render("tiempo");
});
app.listen(3000); 