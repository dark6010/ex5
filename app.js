var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");
var app = express();
var weather = new ForecastIo("https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE");
app.use(express.static(path.resolve(__dirname, "public")));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", function(req, res) {
 res.render("index");
});
app.get(/^\/(\d{5})$/, function(req, res, next) {
    console.log(req.params);
 var zipcode = req.params[0];
 var location = zipdb.zipcode(zipcode);
    console.log(location);
 if (!location.zipcode) {
 next();
 return;
 }
 var latitude = location.latitude;
 var longitude = location.longitude;
 //weather.forecast(latitude, longitude, function(err, data) {
 weather.forecast(-17.39, -66.15, function(err, data) {
 if (err) {
     console.log("bad")
 next();
 return;
 }
    console.log("good");
 res.json({
 zipcode: zipcode,
 temperature: data.currently.temperature
 });
 });
});
app.use(function(req, res) {
 res.status(404).render("404");
});
app.listen(3000); 