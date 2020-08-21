require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const axios = require('axios')

const CORS_HEADERS = {
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  Accept: 'application/json',
}

export function handler(event, context, callback) {
  if (event.queryStringParameters.endpoint === 'get_product_reviews') {
    axios
      .get(
        `https://judge.me/api/v1/products/${event.queryStringParameters.handle}`,
        {
          params: {
            api_token: process.env.JUDGE_ME_PUBLIC_TOKEN,
            shop_domain: `${process.env.SHOP_NAME}.myshopify.com`,
            handle: event.queryStringParameters.handle,
          },
        },
        { headers: CORS_HEADERS }
      )
      .then(res => {
        axios
          .get(
            'https://judge.me/api/v1/reviews',
            {
              params: {
                api_token: process.env.JUDGE_ME_PUBLIC_TOKEN,
                shop_domain: `${process.env.SHOP_NAME}.myshopify.com`,
                product_id: res.data.product.id,
                per_page: 5,
                page: event.queryStringParameters.page,
              },
            },
            { headers: CORS_HEADERS }
          )
          .then(res => {
            callback(null, {
              statusCode: 200,
              body: JSON.stringify(res.data),
            })
          })
          .catch(() => {
            callback(null, {
              statusCode: 400,
              body: 'An Error as occured while fetching the product reviews',
            })
          })
      })
      .catch(() => {
        callback(null, {
          statusCode: 400,
          body: 'An Error as occured while fetching the product id',
        })
      })
  } else if (event.queryStringParameters.endpoint === 'new_review') {
    const body = event.body

    axios
      .post('https://judge.me/api/v1/reviews', JSON.parse(body), {
        headers: CORS_HEADERS,
      })
      .then(res => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res.data),
        })
      })
      .catch(err => {
        callback(null, {
          statusCode: 400,
          body: 'An Error as occured',
        })
      })
  } else if (event.queryStringParameters.endpoint === 'get_widget') {

    console.log('hello')

    axios
      .get(
        'https://judge.me/api/v1/widgets/product_review',
        {
          params: {
            api_token: process.env.JUDGE_ME_PUBLIC_TOKEN,
            shop_domain: `${process.env.SHOP_NAME}.myshopify.com`,
            handle: event.queryStringParameters.handle,
          },
        },
        {
          headers: CORS_HEADERS,
        }
      )
      .then(res => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res.data),
        })
      })
      .catch(err => {
        callback(null, {
          statusCode: 400,
          body: 'An Error as occured',
        })
      })
  } else if (event.queryStringParameters.endpoint === 'get_all_review_widget') {
    axios
      .get(
        'https://judge.me/api/v1/widgets/all_reviews_rating',
        {
          params: {
            api_token: process.env.JUDGE_ME_PUBLIC_TOKEN,
            shop_domain: `${process.env.SHOP_NAME}.myshopify.com`,
          },
        },
        {
          headers: CORS_HEADERS,
        }
      )
      .then(res => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res.data),
        })
      })
      .catch(err => {
        callback(null, {
          statusCode: 400,
          body: 'An Error as occured',
        })
      })
  } else if (event.queryStringParameters.endpoint === 'get_all_reviews_count') {
    console.log('first STEP')
    axios
      .get(
        'https://judge.me/api/v1/widgets/all_reviews_count',
        {
          params: {
            api_token: process.env.JUDGE_ME_PUBLIC_TOKEN,
            shop_domain: `${process.env.SHOP_NAME}.myshopify.com`,
          },
        },
        {
          headers: CORS_HEADERS,
        }
      )
      .then(res => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res.data),
        })
      })
      .catch(err => {
        callback(null, {
          statusCode: 400,
          body: 'An Error as occured',
        })
      })
  }
}
