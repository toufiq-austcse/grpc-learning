var grpc = require('grpc');
var greets = require('../server/protos/greet_pb');
var service = require('../server/protos/greet_grpc_pb');

/*
* implement the greet RPC method
* */

function greet(call, callback) {
    var greeting = new greets.GreetResponse();
    greeting.setResult("hello " + call.request.getGreeting().getFirstName()+' '+call.request.getGreeting().getLastName());
    callback(null, greeting);
}

function main() {
    var server = new grpc.Server();
    server.addService(service.GreetServiceService, {
        greet: greet,
    })
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();


    console.log('server running on port ', 50051);
};

main();
