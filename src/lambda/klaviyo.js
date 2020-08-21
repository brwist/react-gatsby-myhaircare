require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const axios = require('axios')

export function handler(event, context, callback) {
  const CORS_HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    Accept: 'application/json',
  }

  const klaviyoEmail = event.queryStringParameters.email
  const klaviyoListId = event.queryStringParameters.listId

  if (event.httpMethod === 'POST') {
    axios
      .post(
        `https://a.klaviyo.com/api/v2/list/${klaviyoListId}/subscribe`,
        {
          api_key: process.env.KLAVIYO_API_KEY,
          profiles: [
            {
              email: klaviyoEmail,
            },
          ],
        },
        { headers: CORS_HEADERS }
      )
      .then(function(res) {

        console.log(res)

        callback(null, {
          statusCode: 200,
          body: 'Success',
        })
      })
      .catch(function(err) {

        console.log(err)

        callback(null, {
          statusCode: 400,
          body: 'Failed',
        })
      })
  }
}
