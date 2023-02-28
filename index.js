require("dotenv").config();
var express = require("express");
var app = express();
var request = require("request");
var client_id = process.env.ID;
var client_secret = process.env.SECRETKEY;

console.log(process.env.ID);
app.get("/translate", function (req, res) {
  console.log("req.query", req.query);

  const { text, source, target } = req.query;

  console.log("text", text);
  console.log("soruce", source);
  console.log("target", target);

  var api_url = "https://openapi.naver.com/v1/papago/n2mt";

  var options = {
    url: api_url,
    form: { source: source, target: target, text: text },
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return res.json(JSON.parse(response.body));
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});
app.listen(3000, function () {
  console.log("http://localhost:3000/translate app listening on port 3000!");
});
