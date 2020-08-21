"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.queryAll = exports.queryOnce = exports.printGraphQLError = exports.createClient = void 0;

var _graphqlRequest = require("graphql-request");

var _prettyjson = _interopRequireDefault(require("prettyjson"));

var _fp = require("lodash/fp");

/**
 * Create a Shopify Storefront GraphQL client for the provided name and token.
 */
const createClient = (shopName, accessToken) => new _graphqlRequest.GraphQLClient(`https://${shopName}.myshopify.com/api/graphql`, {
  timeout: 1000000,
  headers: {
    "X-Shopify-Storefront-Access-Token": accessToken
  }
});
/**
 * Print an error from a GraphQL client
 */


exports.createClient = createClient;

const printGraphQLError = e => {
  const prettyjsonOptions = {
    keysColor: `red`,
    dashColor: `red`
  };
  if (e.response && e.response.errors) console.error(_prettyjson.default.render(e.response.errors, prettyjsonOptions));
  if (e.request) console.error(_prettyjson.default.render(e.request, prettyjsonOptions));
};
/**
 * Request a query from a client.
 */


exports.printGraphQLError = printGraphQLError;

const queryOnce = async (client, query, first = 100, after) => await client.request(query, {
  first,
  after
});
/**
 * Get all paginated data from a query. Will execute multiple requests as
 * needed.
 */


exports.queryOnce = queryOnce;

const queryAll = async (client, path, query, first = 100, after = null, aggregatedResponse = null) => {
  const data = await queryOnce(client, query, first, after);
  const edges = (0, _fp.get)([...path, `edges`], data);
  const nodes = edges.map(edge => edge.node); // nodes.forEach(node => aggregatedResponse.push(node))

  aggregatedResponse = aggregatedResponse ? aggregatedResponse.concat(nodes) : nodes;

  if ((0, _fp.get)([...path, `pageInfo`, `hasNextPage`], data)) {
    return await queryAll(client, path, query, first, (0, _fp.last)(edges).cursor, aggregatedResponse);
  }

  return aggregatedResponse;
};

exports.queryAll = queryAll;