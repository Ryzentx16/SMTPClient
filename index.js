"use strict";

/*
 * require installation of smtp-connection and its dependancies:
 * # npm install nodemailer-direct-transport nodemailer-smtp-transport nodemailer-smtp-pool smtp-connection
 */
var SMTPConnection = require("smtp-connection");

var connectionConfig = {
  host: "mail.ryzentx.com", // remote SMTP server address
  port: 25,
  ignoreTLS: true,
  secure: false,
  //   authMethod: "CRAM-MD5", // can be 'LOGIN' or 'CRAM-MD5' if authentication is required

  //debug: true,

  name: "mylocalcomputer.provider.com", // local connection address (for EHLO message)
};

var connectionAuth = {
  user: "username",
  pass: "password",
};

var sender = {
  name: "Super sendor", // please use [a-zA-Z0-9.- ]
  email: "me@supersendor.net",
};

var recipient = {
  name: "Test recipient", // please use [a-zA-Z0-9.- ]
  email: "test@recipient.net",
};

// below you don't have to configure anything

var now = new Date();
var testMsg =
  "From: " +
  sender.name +
  " <" +
  sender.email +
  ">\r\n" +
  "To: " +
  recipient.name +
  " <" +
  recipient.email +
  ">\r\n" +
  "Subject: Test message on " +
  now +
  "\r\n" +
  "\r\n" +
  "This is a test message\n\n" +
  "On " +
  now;

var connection = new SMTPConnection(connectionConfig);

connection.connect(function () {
  console.log("Connected");

  //   connection.login(connectionAuth, function (err) {
  //     if (err !== null) {
  //       console.log("login err: " + err);
  //     } else {
  //       console.log("Authenticated");

  //       var now = new Date();

  //     }
  //   });
  connection.send(
    {
      from: sender.email,
      to: recipient.email,
    },
    testMsg,
    function (err) {
      console.log("Message sent");
      connection.quit();
    }
  );
});

// works only if connectionConfig.debug === true
connection.on("log", function (data) {
  console.dir(data);
});

connection.on("error", function (err) {
  console.log("Error occurred: " + err);
});
