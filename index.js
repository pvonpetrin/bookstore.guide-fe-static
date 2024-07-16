require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const { exec } = require('child_process');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const cors = require('cors');
const path = require('path');
const request = require('request');

const goatToken = process.env.GOAT_TOKEN;
const goatSite = process.env.GOAT_SITE;

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
  })
);

/** dynamic URLs go before use static  */
app.get('/rebuild', ClerkExpressRequireAuth(), (req, res) => {
  let child = exec('npm run build');

  child.stdout.on('data', function (data) {
    console.log('rebuild: stdout: ' + data);
  });

  child.stderr.on('data', function (data) {
    console.log('rebuild: stderr: ' + data);
  });

  child.on('close', function (code) {
    console.log('rebuild: child process exited with code ' + code);
    res.send('rebuild complete');
  });
});

app.use(function (req, res, next) {
  const filename = path.basename(req.url);
  const extension = path.extname(filename);
  if (extension === '') {
    const req_path = '/' + filename;
    console.log(req.url, req_path);
    request.post({
      url: `https://${goatSite}.goatcounter.com/api/v0/`,
      json: { no_sessions: true, hits: [{ path: req_path }] },

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${goatToken}`
      }
    });
  }
  next();
});

app.use(express.static('public'));

// catch-all when static fails
app.use(function (req, res) {
  res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
