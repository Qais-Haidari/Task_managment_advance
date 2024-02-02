const nodemailer = require("nodemailer");

var mailOptions = {
    from: "CustomerService@unifresh.com.au",
    to: "qais.kazimi@unifresh.com.au technology@unifresh.com.au",
    subject: "Dominos Order With Empty Order FIle",
    text: `Empty: ${filename}\nOrder File Name: ${filename}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  var mailOptions = {
    from: "CustomerService@unifresh.com.au",
    to: "qais.kazimi@unifresh.com.au",
    subject: "Unifresh Ordering",
    text: `Store Number is wrong: File Name: ${filename}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });