const fs = require("fs");
fs.rename(`../images/6731475.ong`, "./build/images", function (err) {
  if (err) throw err;
  console.log("Successfully renamed - AKA moved!");
});
