require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const Shopify = require('shopify-api-node')
const Multipassify = require('multipassify')
const axios = require('axios')

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_ADMIN_API_PASSWORD,
})

export function handler(event, context, callback) {
  if (event.queryStringParameters.endpoint === 'get_inventory') {
    const quantities = []
    let id = ''

    shopify.product
      .list({ handle: event.queryStringParameters.handle })
      .then(res => {
        id = res[0].id
        res[0].variants.forEach(variant => {
          quantities.push({
            title: variant.title,
            variant_id: variant.id,
            inventory_quantity: variant.inventory_quantity,
          })
        })
      })
      .then(() => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            quantities,
            id
          }),
        })
      })
      .catch(err => {
        callback(null, {
          statusCode: 400,
          body: 'Could not retrieve quantity or id for that product',
        })
      })
  } else if (event.queryStringParameters.endpoint === 'get_countries') {
    shopify.country
      .list()
      .then(res => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res),
        })
      })
      .catch(err => {
        console.error(err)
        callback(null, {
          statusCode: 400,
          body: 'Could not retrieve quantity for that product',
        })
      })
  } else if (
    event.queryStringParameters.endpoint === 'shopify_multi_pass_login'
  ) {
    // Construct the Multipassify encoder
    const multipassify = new Multipassify(process.env.SHOPIFY_MULTIPASS)

    // Create your customer data hash
    const customerData = {
      email: event.queryStringParameters.email,
      created_at: process.env.SHOPIFY_MULTIPASS,
    }

    // Encode a Multipass token
    const token = multipassify.encode(customerData)

    // Generate a Shopify multipass URL to your shop
    const url = multipassify.generateUrl(
      customerData,
      `${process.env.SHOP_NAME}.myshopify.com`
    )

    console.log(url)

    axios.get(url).then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          token,
          url
        }),
      })
    }).catch(err => {
      callback(null, {
        statusCode: 200,
        body: 'An error as occured',
      })
    })

    // Generates a URL like:  https://yourstorename.myshopify.com/account/login/multipass/<MULTIPASS-TOKEN>
  }
}
