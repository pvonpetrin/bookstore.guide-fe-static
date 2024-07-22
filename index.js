require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

// GoatCounter
const goatToken = process.env.GOAT_TOKEN;
const goatSite = process.env.GOAT_SITE;
const blockTracking = process.env.BLOCK_TRACKING !== undefined;

app.use(async function (req, res, next) {
  const filename = path.basename(req.url);
  const extension = path.extname(filename);
  if (extension === '' && !blockTracking) {
    const req_path = '/' + filename;
    await fetch(`https://${goatSite}.goatcounter.com/api/v0/count`, {
      method: 'POST',
      body: JSON.stringify({
        no_sessions: false,
        hits: [
          {
            path: req_path,
            ip: req.ip,
            ref: req.get('Referrer'),
            user_agent: req.get('User-Agent')
          }
        ]
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${goatToken}`
      }
    });
  }

  next();
});
// end GoatCounter

app.use(express.static('public'));

// catch-all when static path not found
app.use(function (req, res) {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
