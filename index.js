var express = require("express");
var cors = require("cors");
require("dotenv").config();
let fileUpload = require("express-fileupload");

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  const { name, mimetype, size } = req.files.upfile;
  res.json({ name, type: mimetype, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
