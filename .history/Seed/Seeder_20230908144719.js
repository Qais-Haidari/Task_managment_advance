const fs = require("fs");
fs.rename(`./images/`, "./build/images", function (err) {
  if (err) throw err;
  console.log("Successfully renamed - AKA moved!");
});
