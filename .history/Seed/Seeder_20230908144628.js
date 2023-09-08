const fs = require("fs");
fs.rename(`./images/${req.params.filename}`, "./build/images", function (err) {
  if (err) throw err;
  console.log("Successfully renamed - AKA moved!");
});
