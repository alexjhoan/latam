const ENV = require("./next.config").env;
const fetch = require('node-fetch');
const fs = require('fs');

const body = JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
});

console.log(ENV);

fetch(`${ENV.graphQL_uri}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Origin': "localhost:3000",
    },
    body: body,
})
    .then(result => result.json())
    .then(result => {
        // here we're filtering out any type information unrelated to unions or interfaces
        const filteredData = result.data.__schema.types.filter(
            type => type.possibleTypes !== null,
        );
        result.data.__schema.types = filteredData;
        fs.writeFile('./graph-fragmentTypes.json', JSON.stringify(result.data), err => {
            if (err) {
                console.error('Error writing fragmentTypes file', err);
            } else {
                console.log('Fragment types successfully extracted!');
            }
        });
    });