// Initiate server
const express = require("express");
const app = express();
app.set("view engine", "ejs");

// Connect to mysql database
const databaseCredentials = require("./configuration/database.json");

const mysql = require("mysql");
const con = mysql.createConnection({
  host: databaseCredentials.host,
  user: databaseCredentials.user,
  password: databaseCredentials.password,
  database: databaseCredentials.database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Succesfully connected to the mysql database");
});

con.query(`SHOW TABLES`, function (err, results, fields) {
  if (err) throw err;
  results.forEach((result) => {
    console.log(`Table: ${JSON.stringify(result)}`);
  });
});

// Serve website using EJS
app.get("/", function (req, res) {
  res.render("website/index");
});

app.get("/bookings", function (req, res) {
  res.render("website/bookings");
});

app.get("/reviews", function (req, res) {
  res.render("website/reviews");
});

app.get("/blog", function (req, res) {
  res.render("website/blog");
});

// Serve pos using EJS
app.get("/pos", function (req, res) {
  res.render("pos/index");
});

// Run server
app.listen(8080);
console.log("Server is listening on port 8080");
