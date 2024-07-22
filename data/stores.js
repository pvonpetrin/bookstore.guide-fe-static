require('dotenv').config();

module.exports = async function () {
  const data = await fetch(process.env.API_SERVER + '/api/v0/places').then((res) => {
    return res.json();
  });
  return data;
};

/*

EXAMPLE STORE FROM API

{
    "id": 741,
    "name": "Adobe Books & Art Cooperative",
    "address1": "3130 24th Street",
    "address2": null,
    "zip5": "94110",
    "phone": "(415) 864-3936",
    "longDescription": "Cooperative & volunteer run book store and performing arts center with events ranging from self-defense classes to drag queen story hours - as well as live music, literary events, and art shows.",
    "description": "Cooperative & volunteer run book store and performing arts center with a wide range of events.",
    "slug": "adobe-books-art-cooperative",
    "hoursText": "12-7pm Daily",
    "url": "https://www.adobebooks.com/",
    "traits": [
      {
        "id": 29,
        "createdAt": "2024-05-10T02:14:01.656Z",
        "updatedAt": "2024-06-16T02:50:06.657Z",
        "name": "Used Books",
      },
      {
        "id": 30,
        "createdAt": "2024-06-03T19:45:18.130Z",
        "updatedAt": "2024-06-16T02:50:06.657Z",
        "name": "Art",
      },
      {
        "id": 33,
        "createdAt": "2024-06-03T19:45:18.130Z",
        "updatedAt": "2024-06-16T02:50:06.657Z",
        "name": "Live Music",
      }
    ]
  },

*/
