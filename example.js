const anko = require('./index');

const conn = new anko.Connection(process.env.ANKO_TOKEN, "my-node-app");
conn.handle((forecast) => {
    console.log(forecast);
});
