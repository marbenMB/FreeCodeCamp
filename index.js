require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// My code

const parseValidUrl = (url) => {
  let valid;
  try {
    valid = new URL(url);
  } catch (err) {
    return false;
  }
  return valid.protocol === "http:" || valid.protocol === "https:";
};

app.post("/api/shorturl", (req, res) => {
  const { url } = req.body;
  if (!parseValidUrl(url)) return res.json({ error: "invalid url" });
  const newUrl = { id: db.length + 1, url: url };
  db.push(newUrl);
  console.log(db);
  res.json({ original_url: newUrl.url, short_url: newUrl.id });
});

app.get("/api/shorturl/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id > db.length + 1)
    return res.json({ error: "invalid short url" });
  const url = db.filter((url) => url.id === id);

  console.log(url);
  res.redirect(url[0].url);
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
