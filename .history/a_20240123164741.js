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
    "tracey@banda.net.au subwaybrokenhill@allsub.net.au",
    "subwaydarwin@ozemail.com.au",
    "subwaybakewell@gmail.com; rsharma_hr@bigpond.com",
    "subway.berrimah@bigpond.com",
    "subwaycasuarina@gmail.com",
    "subwaycoolalinga@bigpond.com",
    "subwaygatewaynt@bigpond.com",
    "accounts@subwaymtgillen.com.au",
    "subwaymarrara@bigpond.com",
    "accounts@subwaymtgillen.com.au",
    "subwaydarwin@ozemail.com.au",
    "rsharma_hr@bigpond.com",
    "R.Styles@peregrine.com.au",
    "E.Miller@peregrine.com.au",
    "toddler78@hotmail.com",
    "invoices@peregrine.com.au",
    "aberfoylepark@submanagementgroup.com.au;maryanne@subway-sa.com.au",
    "orders@synergysubs.com.au",
    "subwayaldinga@agostinogroup.com.au",
    "j.atkinson@peregrine.com.au",
    "E.Miller@peregrine.com.au",
    "R.Styles@peregrine.com.au",
    "subway.arndale@gmail.com",
    "subwayberri@agostinogroup.com.au",
    "j.atkinson@peregrine.com.au",
    "a.rehn@peregrine.com.au",
    "r.richardson@peregrine.com.au",
    "E.Miller@peregrine.com.au",
    "castleplazasub2022@gmail.com",
    "E.Miller@peregrine.com.au",
    "j.atkinson@peregrine.com.au",
    "tracey@banda.net.au; subwayclare@allsub.net.au",
    "j.atkinson@peregrine.com.au",
    "kusto@internode.on.net",
    "E.Miller@peregrine.com.au",
    "j.atkinson@peregrine.com.au",
    "R.Styles@peregrine.com.au",
    "green.de@outlook.com",
    "g.brookes@peregrine.com.au",
    "tracey@banda.net.au",
    "subwayonuni@gmail.com",
    "r.richardson@peregrine.com.au",
    "wcluse@gmail.com",
    "gawlergreen@submanagementgroup.com.au; maryanne@subway-sa.com.au",
    "orders@synergysubs.com.au; accounts@synergysubs.com.au; cohen@synergysubs.com.au",
    "subwayglenelg@gmail.com",
    "r.richardson@peregrine.com.au",
    "janet4545@ymail.com",
    "wcluse@gmail.com",
    "subwaygreenacres@mail.com",
    "subonhackham@gmail.com",
    "subwayharbourtwn@gmail.com",
    "g.brookes@peregrine.com.au",
    "subonhill@gmail.com",
    "orders@synergysubs.com.au",
    "helen@submanagementgroup.com.au; hopevalley@submanagementgroup.com.au",
    "subwayinglefarm@gmail.com; subnewport@gmail.com",
    "tracey@banda.net.au",
    "R.Styles@peregrine.com.au",
    "g.brookes@peregrine.com.au",
    "E.Miller@peregrine.com.au",
    "a.rehn@peregrine.com.au",
    "a.rehn@peregrine.com.au",
    "subonlonsdale@gmail.com",
    "pinky.wun@yahoo.com",
    "marionsubs22@gmail.com",
    "r.richardson@peregrine.com.au",
    "cheriehiggins123@hotmail.com",
    "subwaymac@gmail.com",
    "barrj@tpg.com.au; adridimopoulos@hotmail.com",
    "darren_schwarz@outlook.com",
    "a.rehn@peregrine.com.au",
    "tebesteni@bigpond.com.au",
    "manageratsubwaymodbury@gmail.com",
    "j.atkinson@peregrine.com.au",
    "invoices@peregrine.com.au",
    "darren_schwarz@outlook.com",
    "ash.sub298@gmail.com",
    "melisbrandle@adam.com.au",
    "subwaymc@icloud.com",
    "ben.parkin@unifresh.com.au",
    "a.rehn@peregrine.com.au",
    "g.brookes@peregrine.com.au",
    "manny-8@bigpond.com",
    "E.Miller@peregrine.com.au",
    "rokarrdo@optusnet.com.au",
    "j.atkinson@peregrine.com.au",
    "g.brookes@peregrine.com.au",
    "E.Miller@peregrine.com.au",
    "hiwaymanager@bigpond.com",
    "cohen@synergysubs.com.au",
    "tracey@banda.net.au; subwaypirie@allsub.net.au",
    "R.Styles@peregrine.com.au",
    "subwayportadelaide@allsub.net.au; tracey@allsub.net.au",
    "j.atkinson@peregrine.com.au",
    "subwayrenmark@agostinogroup.com.au",
    "orders@synergysubs.com.au",
    "E.Miller@peregrine.com.au",
    "subwayroxbydowns@agostinogroup.com.au",
    "toddler78@hotmail.com",
    "R.Styles@peregrine.com.au",
    "nikkii.15@optusnet.com.au; darren_schwarz@outlook.com",
    "subwayseaford@agostinogroup.com.au",
    "r.richardson@peregrine.com.au",
    "tmdevgun@gmail.com",
    "R.Styles@peregrine.com.au",
    "helen@submanagementgroup.com.au; stagnes@submanagementgroup.com.au",
    "r.richardson@peregrine.com.au",
    "g.brookes@peregrine.com.au",
    "subwaystirling@agostinogroup.com.au",
    "melisbrandle@adam.com.au julieannetrezis@gmail.com",
    "g.brookes@peregrine.com.au",
    "g.brookes@peregrine.com.au",
    "subwayvictorharbor@agostinogroup.com.au",
    "g.brookes@peregrine.com.au",
    "j.atkinson@peregrine.com.au",
    "r.richardson@peregrine.com.au",
    "r.richardson@peregrine.com.au",
    "subwaywestlakes@agostinogroup.com.au",
    "R.Styles@peregrine.com.au",
    "subwharfpa@bigpond.com",
    "R.Styles@peregrine.com.au",
    "subonwoodcroft@gmail.com",
    "r.richardson@peregrine.com.au",
    "krishna@saffronbiz.com.au; rathoremeena@yahoo.co.in",
    "traceymelrose@bigpond.com.au",
    "subalexanderheights@gmail.com",
    "subwayapplecross@gmail.com",
    "viharmodi17@gmail.com",
    "subwayascot@outlook.com",
    "subwayaveley@yahoo.com",
    "admin@balcattasub.com.au",
    "subwaybaldivis@gmail.com",
    "jameskahwai04@gmail.com",
    "subwaybannisterroad@gmail.com",
    "subbase40433@gmail.com",
    "subwaybayswater@yahoo.com",
    "gunasandi_subway@hotmail.com",
    "jintocv@ymail.com",
    "Subwaybeechboro@svggroup.com.au",
    "beeliar@pestell.com.au",
    "subwaybeldon@gmail.com",
    "SUBWAY@MKPATEL.COM.AU",
    "SUBWAY@MKPATEL.COM.AU",
    "BERTRAMSUBWAY@GMAIL.COM",
    "subwaygardencity@gmail.com",
    "subwaybrabham@gmail.com",
    "paul@subwaynorthwest.com.au",
    "subwaybullcreek@gmail.com",
    "hengaiyen@gmail.com",
    "subwaybusselton@gmail.com",
    "accounts@flynnent.com.au",
    "garrypostan6@gmail.com; kelly.berry@anbrys.com.au",
    "subway.canningvale@gmail.com",
    "subway168success@gmail.com",
    "subcj2015@gmail.com",
    "kylie.sutton6@bigpond.com",
    "Meredith.grindlay03@icloud.com",
    "annatongquek@yahoo.com",
    "prakash_vaghela@yahoo.com",
    "jonicag@internode.on.net",
    "lawbon@bigpond.com; dfosubwayperth@gmail.com",
    "subwaydianella@gmail.com",
    "admin@balcattasub.com.au",
    "subwayduns@gmail.com",
    "liang_lily@msn.com",
    "subwayevp@gmail.com",
    "ellenbrook.subway@gmail.com",
    "balquis@bigpond.net.au",
    "subway43383@gmail.com",
    "subwayfloreat@outlook.com",
    "ritesh_patel8899@yahoo.com",
    "ankeetgorakhia@yahoo.com; subway.woodbridge@yahoo.com.au;",
    "wendyyx@gmail.com",
    "subwaygirrawheen@outlook.com",
    "krishna@saffronbiz.com.au",
    "subwaygosnells@gmail.com",
    "harrisdale.subway@gmail.com",
    "jayvora2405@gmail.com; subwayhaystreet@yahoo.com",
    "haynesplaza@pestell.com.au",
    "ritesh_patel8899@yahoo.com",
    "subwaywhitfords@gmail.com",
    "Subway.ift@gmail.com",
    "subwayinnaloo@hotmail.com",
    "Subway.ift@gmail.com",
    "joe.subwayjandakotairport@gmail.com",
    "Jamie@notlawwa.com.au",
    "arpit_18dec@rediffmail.com; subwaylakesidejoondalup@gmail.com",
    "dgsuccess88@gmail.com",
    "wadeclatworthy@hotmail.com",
    "subwaykalamunda@iinet.net.au; bennygonzales89@gmail.com",
    "subwaykalgoorlie@bigpond.com",
    "joelle.teoh@gmail.com",
    "manager@subkar.com.au",
    "ritesh_patel8899@yahoo.com",
    "rick@fulloflava.com.au",
    "info@subwaykununurra.com.au",
    "stellajoseph@bigpond.com",
    "subway70468@gmail.com",
    "gloria_maduram@hotmail.com",
    "allsubwayinvoices@gmail.com",
    "rick@fulloflava.com.au",
    "robrose2015@bigpond.com",
    "gromyn@bigpond.com",
    "subwaymanjimup@bigpond.com",
    "heeren.shah@gmail.com; shreeshah1984@gmail.com",
    "subway64834@gmail.com",
    "manager_subwaymerredin@bigpond.com",
    "rick@fulloflava.com.au",
    "hayleyh@iinet.net.au",
    "rick@fulloflava.com.au",
    "subway.33977@gmail.com",
    "submorley@nsaholding.com.au",
    "subwaymosman@iinet.net.au",
    "glstagg2020@gmail.com",
    "karendybeck@hotmail.com",
    "rick@fulloflava.com.au",
    "andrea.geller.schenker@gmail.com;subway.melville@westnet.com.au",
    "accounts@subkar.com.au",
    "subwaynoranda@icloud.com",
    "querela@me.com",
    "liberty_77@hotmail.com",
    "sarepatel@yahoo.co.in",
    "jaypinal07@gmail.com",
    "viharmodi17@gmail.com",
    "ctaylor1811@gmail.com",
    "subwayperthtrainstation@gmail.com",
    "subway44990@gmail.com",
    "subway47987@gmail.com",
    "andrea.geller.schenker@gmail.com",
    "emmie@iatcorporation.com",
    "Acc.kmnv@yahoo.com",
    "subway43131@gmail.com",
    "amitk171988@gmail.com; muneet20@yahoo.com",
    "subway68178@gmail.com",
    "sarepatel@yahoo.co.in",
    "paul@subwaynorthwest.com.au",
    "kanichaiantonygeorge@yahoo.com.au",
    "krishna@saffronbiz.com.au; rathoremeena@yahoo.co.in",
    "subway.southernriversquare@gmail.com",
    "SUBWAYSPEARWOOD@GMAIL.COM",
    "subway.stirling@gmail.com",
    "masonglenn66@yahoo.com",
    "Subgate@bigpond.com",
    "aakashpatel82@yahoo.co.in; cynthialeonor2011@hotmail.com",
    "aileen.choo@bigpond.com; kaur.amandeep258@outlook.com",
    "krishna@saffronbiz.com.au",
    "jmaduram@hotmail.com",
    "subway31845@gmail.com",
    "subwaywangara@outlook.com",
    "subwaywanneroo@outlook.com",
    "subway20445@gmail.com",
    "subway.warwick@outlook.com",
    "stellario@bigpond.com",
    "sukhlavut@gmail.com",
    "subwaywembley@gmail.com",
    "kylie.sutton6@bigpond.com",
    "subwaybayswater@yahoo.com",
    "SUBWAYWOODBRIDGE@GMAIL.COM",
    "patelanil1441@gmail.com",
    "grant.horwood@iinet.net.au",
    "querela@me.com"
  ]
// let num = 54;

// let aa = setInterval(() => {
//     // const element = arr[index];

//       var mailOptions = {
//     from: "CustomerService@unifresh.com.au",
//     to: `${arr[num]}; qais.kazimi@unifresh.com.au`,
//     subject: "When Deb Is Away Direct Debits",
//     text: `
//     Hello Team Pizza Hut,
  
//       You will receive your Statement early on 22nd/23rd January instead of the usual 29th/ 30th for Direct Debit On Friday 2nd February as Normal.
  
//       Thank you.
  
//     `,
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
  
//   delete arr[num]
//   num--;
//   console.log(num)
//   if (num === 0) {
//     clearInterval(aa)
//   }
//   console.log(arr[num])
// }, 500);
