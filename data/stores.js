require('dotenv').config();
const fetch = require('node-fetch');

module.exports = async function () {
  const data = await fetch(process.env.API_SERVER + '/api/v0/places').then((res) => {
    return res.json();
  });
  return data;
};
