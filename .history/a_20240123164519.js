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
  
let num = 15;

let aa = setInterval(() => {
    // const element = arr[index];

      var mailOptions = {
    from: "CustomerService@unifresh.com.au",
    to: `${arr[num]}; qais.kazimi@unifresh.com.au`,
    subject: "When Deb Is Away Direct Debits",
    text: `
    Hello Team Pizza Hut,
  
      You will receive your Statement early on 22nd/23rd January instead of the usual 29th/ 30th for Direct Debit On Friday 2nd February as Normal.
  
      Thank you.
  
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  
  delete arr[num]
  num--;
  console.log(num)
  if (num === 0) {
    clearInterval(aa)
  }
  console.log(arr[num])
}, 500);
