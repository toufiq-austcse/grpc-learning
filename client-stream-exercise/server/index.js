/*
* client stream api server
* */
let grpc = require('grpc');
let calculator = require('../server/protos/calculator_pb');
let service = require('../server/protos/calculator_grpc_pb');

function computeAvg(call, callback) {
    let sum = 0;
    let count = 0;
    call.on('data', request => {
        let num = parseInt(request.getNum());
        count++;
        sum += num;
    });
    call.on('error', err => {
        console.log('err ', err);
    });
    call.on('end', () => {
        // compute the actual avg
        let avg = sum / count;
        let response = new calculator.ComputeAvgResponse();
        response.setResult(avg.toString());
        callback(null, response);
    })

}

function main() {
    let server =new grpc.Server();
    server.addService(service.CalculatorServiceService, {
        computeAvg:computeAvg
    })

    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();


    console.log('server running on port ', 50051);
}

main();
