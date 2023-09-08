const fs = require("fs");
fs.rename(`../images/6731475.png`, "./", function (err) {
  if (err) throw err;
  console.log("Successfully renamed - AKA moved!");
});
