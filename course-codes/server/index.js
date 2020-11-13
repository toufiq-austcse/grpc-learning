var grpc = require('grpc');
var greets = require('../server/protos/greet_pb');
var service = require('../server/protos/greet_grpc_pb');

/*
* implement the greet RPC method
* */

/*
* Unary Server implementation
* */
function greet(call, callback) {
    var greeting = new greets.GreetResponse();
    greeting.setResult("hello " + call.request.getGreeting().getFirstName() + ' ' + call.request.getGreeting().getLastName());
    callback(null, greeting);
}


/*
* Server Streaming implementation
* */
function greetManyTimes(call, callback) {
    let firstName = call.request.getGreeting().getFirstName();
    //   let lastName = call.request.getGreeting().getLastName();

    let count = 0, intervalID = setInterval(() => {
        let greetManyTimesResponse = new greets.GreetManyTimesResponse();
        greetManyTimesResponse.setResult(firstName);
        call.write(greetManyTimesResponse);
        if (++count > 9) {
            clearInterval(intervalID);
            call.end(); //we have sent all message
        }

    }, 1000);

}

/*
* Client Streaming implementation
* */

function longGreet(call, callback) {
    call.on('data', request => {
        let fullName = request.getGreet().getFirstName() + ' ' + request.getGreet().getLastName();
        console.log('Hello ', fullName);
    });
    call.on('error', error => {
        console.error(error)
    });
    call.on('end', () => {
        let response = new greets.LongGreetResponse();
        response.setResult("Long Greet CLient Streaming....");
        callback(null, response);
    });
}


/*
* BiDi Server Imeplementation
* */
async function sleep(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), interval);
    });
}

async function greetEveryone(call, callback) {
    call.on('data', response => {
        let fullName = response.getGreet().getFirstName() + ' ' + response.getGreet().getLastName();
        console.log(fullName);

    });
    call.on('error', error => {
        console.log(error);
    });
    call.on('end', () => {
        console.log('Bidi End');
    });

    for (let i = 0; i < 10; i++) {
        // let greeting = new greets.Greeting();
        // greeting.setFirstName('Toufiqul');
        // greeting.setLastName('Islam');

        let response = new greets.GreetEveryoneResponse();
        response.setResult('Toufiqul Islam from BiDi');

        call.write(response);
        await sleep(1000);
    }
    call.end();
}

function main() {
    var server = new grpc.Server();
    server.addService(service.GreetServiceService, {
        greet: greet,
        greetManyTimes: greetManyTimes,
        longGreet: longGreet,
        greetEveryone: greetEveryone
    })
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();


    console.log('server running on port ', 50051);
};

main();
