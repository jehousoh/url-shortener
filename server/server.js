const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const ShortUrl = require("./models/shortUrl");
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/urlShortener", {
  useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection;

app.use(cors({ origin:true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/message", (req, res) => {
  res.json({ message: "Shorten my URL!" });
});

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.json({ message: shortUrls});
});

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({
    fullurl: req.body.fullurl
  })
  res.redirect("/")
})

app.post("/:shortUrl", async (req, res) => {
  const urlDetails = await ShortUrl.findOne({ shorturl: req.body.shorturl })
  if (urlDetails == null) return res.sendStatus(404)
  res.json({message:urlDetails.fullurl})
})

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});