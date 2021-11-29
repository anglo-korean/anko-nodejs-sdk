# anko-node-sdk

This module provides a simple Anko Investor Forecasts gRPC Service client for NodeJS.

This client does little more than wrap `@grpc/grpc-js`, the latest protobuf definition for accessing Forecasts, and handling auth.

```bash
$ npm i --save "@anglo-korean/anko-node-sdk"
```

## Usage

Given a valid token from https://anko-investor.com (see: [Getting Started](https://github.com/anglo-korean/documentation#getting-started) for more information), the following example will start consuming Forecasts

```javascript
const hostname = require("os").hostname();
const anko = require('@anglo-korean/anko-node-sdk);

const conn = new anko.Connection(process.env.ANKO_TOKEN, hostname);

conn.handle( (forecast) => {
    console.log(forecast);
});
```

(Here we use the current machine's hostname as a client identifier- this can be anything, really; it's useful to set in case you need to open a support ticket to help debug connections. It can even be an empty string).
