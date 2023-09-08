const fs = require("fs");
fs.rename(`./`, "./build/images", function (err) {
  if (err) throw err;
  console.log("Successfully renamed - AKA moved!");
});
