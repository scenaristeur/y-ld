// https://comunica.dev/docs/query/advanced/graphql_ld/
// https://comunica.dev/docs/query/getting_started/query_app/
// https://www.linkedin.com/pulse/state-graph-json-ld-graphql-serialization-kurt-cagle/

import { Client } from "graphql-ld";
import { QueryEngineComunica } from "graphql-ld-comunica";

// Define a JSON-LD context
const context = {
  "@context": {
    label: { "@id": "http://www.w3.org/2000/01/rdf-schema#label" },
  },
};

// Create a GraphQL-LD client based on a client-side Comunica engine over 2 sources
const comunicaConfig = {
  sources: [
    // "http://dbpedia.org/sparql",
     "https://ruben.verborgh.org/profile/"],
};
const client = new Client({
  context,
  queryEngine: new QueryEngineComunica(comunicaConfig),
});

// Define a query
const query = `
  query @single {
    label
  }`;

(async function () {
  // Execute the query
  const { data } = await client.query({ query });
  console.log(data);
})();

// const QueryEngine = require('@comunica/query-sparql').QueryEngine;
// const bindingsStreamToGraphQl = require('@comunica/actor-query-result-serialize-tree').bindingsStreamToGraphQl;

// const myEngine = new QueryEngine();
// const result = await myEngine.query(`
// {
//   label @single
//   writer(label_en: \"Michael Jackson\") @single
//   artist @single {
//     label @single
//   }
// }
// `, {
//   sources: ['http://fragments.dbpedia.org/2016-04/en'],
//   queryFormat: {
//     language: 'graphql',
//     version: '1.0'
//   },
//   "@context": {
//     "label": { "@id": "http://www.w3.org/2000/01/rdf-schema#label" },
//     "label_en": { "@id": "http://www.w3.org/2000/01/rdf-schema#label", "@language": "en" },
//     "writer": { "@id": "http://dbpedia.org/ontology/writer" },
//     "artist": { "@id": "http://dbpedia.org/ontology/musicalArtist" }
//   }
// });
// // Converts raw Comunica results to GraphQL objects
// const data = await bindingsStreamToGraphQl(await result.execute(), result.context, {materializeRdfJsTerms: true});
