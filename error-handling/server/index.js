var grpc = require('grpc');
var calc = require('../server/protos/calculator_pb');
var service = require('../server/protos/calculator_grpc_pb');

function squareRoot(call, callback) {
    let number = call.request.getNumber();

    if (number >= 0) {

        let numberRoot = Math.sqrt(number);
        let response = new calc.SquareRootResponse();
        response.setNumberRoot(numberRoot);

        callback(null, response);
    } else {
        return callback({
            code:grpc.status.INVALID_ARGUMENT,
            message:'The number being sent is not positive '+' Number Sent '+number
        })
    }
}

function main() {
    var server = new grpc.Server();

    server.addService(service.CalculatorServiceService,{
        squareRoot:squareRoot
    })
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();


    console.log('server running on port ', 50051);
};

main();
