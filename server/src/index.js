const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded());
// HTTP request logger
app.use(morgan("combined"));

app.get("/home", (req, res) => {
  res.json("home");
});
app.post("/search", (req, res) => {
  const httpGet = (url) => {
    return new Promise((resolve, reject) => {
      const http = require("http");
      https = require("https");

      let client = http;

      if (url.toString().indexOf("https") === 0) {
        client = https;
      }

      client
        .get(url, (resp) => {
          let chunks = [];

          // A chunk of data has been recieved.
          resp.on("data", (chunk) => {
            chunks.push(chunk);
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            resolve(Buffer.concat(chunks));
          });
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  };

  (async (url) => {
    const buf = await httpGet(url);
    res.json(buf.toString("utf-8"));
  })(req.body.url);
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
