var grpc = require('grpc');
var greets = require('../server/protos/greet_pb');
var service = require('../server/protos/greet_grpc_pb');


function main() {
    console.log('hello from client')
    var client = new service.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

    var request = new greets.GreetRequest();

    // created a protocol buffer greeting message
    var greeting = new greets.Greeting();
    greeting.setFirstName('Toufiqul');
    greeting.setLastName('Islam');
    request.setGreeting(greeting);

    client.greet(request, (err, response) => {
        if (!err) {
            console.log('Response ', response.getResult())
        }else{
            console.log(err)
        }
    });

}

main();
