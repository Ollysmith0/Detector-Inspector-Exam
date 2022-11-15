const httpGet = (url) => {
  return new Promise((resolve, reject) => {
    const http = require('http');
      https = require('https');

    let client = http;

    if (url.toString().indexOf("https") === 0) {
      client = https;
    }

    client.get(url, (resp) => {
      let chunks = [];

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        chunks.push(chunk);
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        resolve(Buffer.concat(chunks));
      });

    }).on("error", (err) => {
      reject(err);
    });
  });
}

(async(url) => {
  var buf = await httpGet(url);
  var regExp = /<table>/g;
  console.log(buf.toString('utf-8'));
})('https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression');

