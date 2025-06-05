require("dotenv").config();
const bodyParser = require("body-parser");
let express = require("express");
let app = express();
let path = __dirname + "/views/index.html";

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get("/", function (req, res) {
    res.sendFile(path);
});

app.get("/json", function (req, res) {
    let message = "Hello json";

    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }

    res.json({ message: message });
});

app.get("/now",
  function (req, res, next) {
    req.time = new Date().toString(); 
    next();
  },
  function (req, res) {
    res.json({time: req.time});
  }
);

app.get("/:word/echo", function(req,res){
    let word = req.params.word;
    res.json({echo: word});
});

app.route("/name")
.get((req, res) => {
  let firstname = req.query.first;
  let lastname = req.query.last;
  res.json({ name: `${firstname} ${lastname}` });
})

.post((req,res) => {
    let firstname = req.body.first;
    let lastname = req.body.last;
    res.json({name:`${firstname} ${lastname}`});
});
module.exports = app;
