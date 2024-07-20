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
const blockTracking = process.env.BLOCK_TRACKING !== undefined;

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
  })
);

app.use(function (req, res, next) {
  const filename = path.basename(req.url);
  const extension = path.extname(filename);
  if (extension === '' && !blockTracking) {
    const req_path = '/' + filename;
    request.post({
      url: `https://${goatSite}.goatcounter.com/api/v0/count`,
      json: {
        no_sessions: false,
        hits: [
          {
            path: req_path,
            ip: req.ip,
            ref: req.get('Referrer'),
            user_agent: req.get('User-Agent')
          }
        ]
      },
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
