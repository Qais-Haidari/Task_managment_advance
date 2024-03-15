const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: "587",
    secureConnection: true,
    tls: { ciphers: "SSLv3" },
    auth: {
      user: "customerservice@unifresh.com.au",
      pass: "ypzgnwhfgqnrzcbm",
    },
  });
//   const arr = [
//     "admin@gohardtopend.com; dpa98463@dominos.net.au",
//     "admin@gohardtopend.com; dpa98479@dominos.net.au",
//     "dominosdarwininvoices@outlook.com",
//     "michellewootton@bigpond.com",
//     "mahoneyalex@live.com; paulmichael.will@gmail.com",
//     "michellewootton@bigpond.com",
//     "mark.coyle@sspizza.com.au",
//     "accounts@teamvandiemen.com",
//     "scottacoyle@hotmail.com",
//     "pdhruv611@gmail.com",
//     "Vincent-law@live.com.au",
//     "dominos.sspl@gmail.com",
//     "dominos.anshu@gmail.com",
//     "accounts@teamvandiemen.com",
//     "dominos.anshu@gmail.com",
//     "accounts@teamvandiemen.com",
//     "ryan.devink@bigpond.com; dpa98703@dominos.net.au",
//     "reindeer.zeyangding@gmail.com dpa98738@dominos.net.au",
//     "glenungadominos@gmail.com",
//     "harjeetlongia@gmail.com",
//     "www.leon.com.au@live.com",
//     "moon_aref@hotmail.com",
//     "accounts@teamvandiemen.com",
//     "dpa98708@dominos.net.au",
//     "accounts@teamvandiemen.com",
//     "food.invoicing@dominos.com.au",
//     "accounts@teamvandiemen.com",
//     "ngrivec@gmail.com",
//     "accounts@teamvandiemen.com",
//     "mark.coyle@sspizza.com.au",
//     "antonynroy@gmail.com",
//     "kvenkani@gmail.com",
//     "kishore.linga@gmail.com; dominosmunnopara@gmail.com",
//     "accounts@teamvandiemen.com",
//     "yogir78@gmail.com",
//     "www.leon.com.au@live.com; madwinili@gmail.com",
//     "mark.coyle@sspizza.com.au",
//     "pdhruv611@gmail.com",
//     "dpa98713@dominos.net.au; joyce-jade@hotmail.com",
//     "dpa98710@dominos.net.au",
//     "shaktijadeja3525@gmail.com",
//     "ryan.devink@bigpond.com; dpa98725@dominos.com.au",
//     "portlincolndominos@gmail.com",
//     "ryan.devink@bigpond.com",
//     "danulsaurusrex@gmail.com lacey191@southernphone.com.au",
//     "dpa98705@dominos.com.au; mark.coyle@sspizza.com.au",
//     "mark.coyle@sspizza.com.au",
//     "palu_gor@yahoo.com",
//     "technology@unifresh.com.au",
//     "meetviren23@yahoo.co.in; pateltisha90@gmail.com; sumiit887@gmail.com; meeturvashi15@yahoo.co.in",
//     "accounts@teamvandiemen.com",
//     "samba.p@gmail.com",
//     "benedict.mamauag@hotmail.com",
//     "dominos.anshu@gmail.com",
// ]
// let num = 54;

// let aa = setInterval(() => {
//     // const element = arr[index];

      var mailOptions = {
    from: "customerservice@unifresh.com.au",
    to: `qais.kazimi@unifresh.com.au`,
    subject: "When Deb Is Away Direct Debits",
    text: `
    Hello Team Dominos,

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
  
//   delete arr[num]
//   num--;
//   console.log(num)
//   if (num === 0) {
//     clearInterval(aa)
//   }
//   console.log(arr[num])
// }, 500);
