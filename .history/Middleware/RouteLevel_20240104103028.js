function auth(req, res, next) {
  const Token = req.params.token;
  if (!Token) {
    res.send("NOT Data")
  } else {
    try {
      const decode = jwt.verify(Token, "GAMEOVER");
      if (decode.ROLE === "CLIENT") {
        next();
      } else {
        res.send("Authenticated failed")
      }
    } catch (error) {
      if (error) {
        res.send("Un Authorized Token")
      }
    }
  }
}
module.exports = auth;