const PROTO_PATH = __dirname + '/proto/gateway.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: Number,
     enums: String,
     defaults: true,
     oneofs: true
    });

const pb = grpc.loadPackageDefinition(packageDefinition);

const addr = `forecasts.anko-investor.com:443`;
const ua = `github.com/anglo-korean/anko-node-sdk#0.1.0`;

class Connection {
    constructor(token, identifier) {
        this.metadata = new grpc.Metadata();
        this.metadata.add('authorization', `bearer ${token}`);

        this.ankoMeta = {'ua': ua, 'tags': [{'Identifier': identifier}]};

        this.connect();
    }

    connect() {
        this.client = new pb.Forecasts(addr,
                                       grpc.credentials.createSsl());
    }

    handle(f) {
        const root = this;
        this.connect();

        let call = this.client.Stream(this.ankoMeta, this.metadata);

        call.on('data', function(forecast) {
            if (forecast.id != 'dummy-forecast') f(forecast) ;
        });

        call.on('error', function(e) {
            // If a received error is *not* a network error then throw it
            // otherwise, continue back around the infinite loop
            if (e &&
                e.code && e.code === 13 &&
                e.details && e.details === 'Received RST_STREAM with code 2 (Internal server error)') {

                root.handle(f);
            } else {
                throw(e);
            }
        });
    }
}

exports.Connection = Connection;
