#!/usr/bin/env node
const path = require("node:path");

let AUTHKEY = "";

// nodemailer stuff
const nodemailer = require("nodemailer");
const mailSettings = require("./configuration/email.json");
let transporter;
async function initiateMail() {
  transporter = nodemailer.createTransport({
    host: "pro1.mail.ovh.net",
    port: 587,
    secure: false,
    auth: {
      user: mailSettings.user,
      pass: mailSettings.pass,
    },
  });

  let info = await transporter.sendMail({
    from: '"Max @ Mvasten" <m.ax@mvasten.nl>', // sender address
    to: "max@worthy.technology", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
}
initiateMail().catch(console.error);

// Initiate server
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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

app.get("/pos", function (req, res) {
  res.render("pos/login");
});

app.get("/pos/:authKey", function (req, res) {
  //Check if authKey matches current generated authkey
  if (req.params.authKey == AUTHKEY) {
    res.render("pos/index");
  } else {
    res.render("other/failed_login");
  }
});

const generateAuthKey = () => {
  return "_" + Math.random().toString(16).slice(2);
};

// Generate a new authKey every hour
setInterval(() => {
  AUTHKEY = generateAuthKey();
}, 1000 * 60 * 60);

AUTHKEY = generateAuthKey();

// Run server
app.listen(80);
console.log("Server is listening on port 80");
console.log("Authkey: " + AUTHKEY);
