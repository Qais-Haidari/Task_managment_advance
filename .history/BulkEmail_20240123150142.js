const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: "587",
    secureConnection: true,
    tls: { ciphers: "SSLv3" },
    auth: {
      user: "CustomerService@unifresh.com.au",
      pass: "Yourself1",
    },
  });  
    var mailOptions = {
    from: "CustomerService@unifresh.com.au",
    to: "qais.kazimi@unifresh.com.au",
    subject: "When Deb Is Away Direct Debits",
    text: `*Subway SA and WA will receive Statements on 21st January for Direct Debit on 26th January And then Subway SA and WA and Dominos /Pizza hut Fortnightly will receive Statements on 22nd/23'd January instead of 29/30th for Direct Debit On Friday 2nd February as Normal
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });