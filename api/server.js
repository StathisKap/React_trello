/**
 *
 *
 * 
 */
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const rootValue = require('./roots/resolvers');
const fs = require('fs');


/**
 * Build the schema from the schema.gql file
 *
 * 
 */
const schemaString = fs.readFileSync('./schema.gql', 'utf-8');
const schema = buildSchema(schemaString);


const app = express();


/**
 *
 *
 * 
 */
app.use(cors());

/**
 *
 *
 * 
 */
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true 
}));

/**
 *
 *
 * 
 */
app.listen(3001, () => {
  console.log("Now listening on port 3001");
});
