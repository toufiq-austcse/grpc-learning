var grpc = require('grpc');
var calculators = require('../server/protos/calculator_pb');
var service = require('../server/protos/calculator_grpc_pb');

function findMaximum(call, callback) {
    let max = 0;
    call.on('data', request => {
        let currentNumber = request.getNum();

        if (currentNumber > max) {
            max = currentNumber;
            let response = new calculators.FindMaximumResponse();
            response.setResult(max);
            call.write(response);
        }
    });

    call.on('error', error => {
        console.log(error);
    });
    call.on('end', () => {
        console.log('Bidi End');
    });
}

function main() {
    let server = new grpc.Server();
    server.addService(service.FindMaximumServiceService, {
        findMaximum: findMaximum
    })

    server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log('server running on port ', 50051);
}

main();
