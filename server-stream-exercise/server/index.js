/*
* Prime Number Decomposition API Server
* */


const grpc = require('grpc');
let decompositions = require('../server/protos/decompostion_pb');
let service = require('../server/protos/decompostion_grpc_pb');

function getFactor(call, callback) {
    let number = parseInt(call.request.getNum());


    let k = 2;
    while (number > 1) {
        let decompostionResponse = new decompositions.DecompositionResponse();
        if (number % k === 0) {
            //send k
            console.log(k)
            decompostionResponse.setResult(k.toString());
            number = number / k;
            call.write(decompostionResponse);

        } else {
            k++;
        }


    }
    call.end();

}

function main() {
    let server = new grpc.Server();
    server.addService(service.DecompositionServiceService, {
        getFactor: getFactor
    });
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();


    console.log('server running on port ', 50051);

}

main();
