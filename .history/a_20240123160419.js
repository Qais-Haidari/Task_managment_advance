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
  const arr = [
    "accounts@yoloprojects.com.au",
    "coolalingant@pizzahutaustralia.com.au",
    "pizzahut.palmerston@gmail.com; palmerstonnt@pizzahutaustralia.com.au",
    "gawlersa@pizzahutaustralia.com.au; pizzahutgawler@gmail.com",
    "zebsahi@gmail.com; hollywoodplazasa@pizzahutaustralia.com.au",
    "admin@sajay.com.au",
    "munnoparapizzahut@gmail.com; munnoparasa@pizzahutaustralia.com.au; mehtadips_20@yahoo.com",
    "pizzahutmb5253@gmail.com",
    "shabnam_1352@yahoo.com; paravistasa@pizzahutaustralia.com.au",
    "girishyadav114@gmail.com",
    "portaugustasa@pizzahutaustralia.com.au",
    "zaainy@gmail.com; semaphoresa@pizzahutaustralia.com.au",
    "technology@unifresh.com.au",
    "barrj@tpg.com.au; whyallasa@pizzahutaustralia.com.au",
    "harsh_b_patel@yahoo.co.in"
]

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
      var mailOptions = {
    from: "CustomerService@unifresh.com.au",
    to: `qais.kazimi@unifresh.com.au`,
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

    setInterval(() => {
      
    }, 2000);
  });
  }