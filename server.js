const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  randQ = quotes[Math.floor(Math.random() * quotes.length)];
  res.send({ quote: randQ });
});

app.get("/api/quotes", (req, res, next) => {
  if (req.query.person) {
    resArr = [];
    for (let quoteObj of quotes) {
      if (quoteObj.person === req.query.person) resArr.push(quoteObj);
    }
    res.send({ quotes: resArr });
  } else res.send({ quotes: { quotes }["quotes"] });
});
app.post("/api/quotes", (req, res, next) => {
  if (req.query.person && req.query.quote) {
    quotes.push({ person: req.query.person, quote: req.query.quote });
    res.send(quotes[-1]);
  } else res.status(400).send();
});

app.listen(PORT, () => {
  console.log("app listening on port", PORT);
});
