require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const axios = require('axios')

const HEADERS = {
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'StarShipIT-Api-Key': process.env.STARSHIPIT_API_KEY,
  'Ocp-Apim-Subscription-Key': process.env.STARSHIPIT_SUBSCRIPTION_KEY,
  Accept: 'application/json',
}

export function handler(event, context, callback) {
  if (event.queryStringParameters.endpoint === 'get_shipping_rates') {
    const body = JSON.parse(event.body)

    let streetAddress = body.street

    console.log(body)

    if (streetAddress.includes(' ')) {
      streetAddress = streetAddress.split(' ').join('+')
    }

    // axios
    //   .get(
    //     `https://api.starshipit.com/api/address/validate`,
    //     {
    //       params: {
    //         street: streetAddress,
    //         post_code: body.post_code,
    //         country: body.country_code,
    //       },
    //     },
    //     { headers: HEADERS }
    //   )
    //   .then(res => {
    //     console.log('RES', res)

    //     callback(null, {
    //       statusCode: res.status,
    //       body: JSON.stringify(res.data),
    //     })
    //   })
    //   .catch(err => {
    //     console.log('ERROR', err)

    //     callback(null, {
    //       statusCode: err.status,
    //       body: JSON.stringify(err.data),
    //     })
    //   })

    axios
      .get(
        `https://api.starshipit.com/api/rates?street=${streetAddress}&post_code=${body.post_code}&country_code=${body.country_code}&weight=${body.weight}`,
        { headers: HEADERS }
      )
      .then(res => {
        callback(null, {
          statusCode: res.status,
          body: JSON.stringify(res.data),
        })
      })
      .catch(err => {
        callback(null, {
          statusCode: err.status,
          body: JSON.stringify(err.data),
        })
      })
  }
}
