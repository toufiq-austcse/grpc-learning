let grpc = require('grpc');
let sum = require('../server/protos/sum_pb');
let service = require('../server/protos/sum_grpc_pb');

function sumFunc(call, callback) {
    let sumResponse = new sum.SumResponse();
    let num1 = parseInt(call.request.getNumbers().getNum1());
    let num2 = parseInt(call.request.getNumbers().getNum2());
    sumResponse.setResult((num1 + num2).toString());
    callback(null, sumResponse);

}

function main() {
    let server = new grpc.Server();
    server.addService(service.SumServiceService, {
        sum:sumFunc
    })

    server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log('server running on port ', 50051);
}

main();
