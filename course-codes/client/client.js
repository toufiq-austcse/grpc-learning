var grpc = require('grpc');
var greets = require('../server/protos/greet_pb');
var service = require('../server/protos/greet_grpc_pb');


function main() {
    console.log('hello from client');
  //  callGreetings();
   // callGreetManyTimes();
   // callLongGreeting();
    callBiDirect();

}

/*
* Unary implementation
* */
function callGreetings() {
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
        } else {
            console.log(err)
        }
    });
}

/*
* server streaming implementation
* */
function callGreetManyTimes() {
    var client = new service.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );


    var request = new greets.GreetManyTimesRequest();
    var greeting = new greets.Greeting();
    greeting.setFirstName("Toufiqul");
    greeting.setLastName("Islam");
    request.setGreeting(greeting);
    var call = client.greetManyTimes(request, () => {
    });
    call.on('data', response => {
        console.log('client streaming response ', response.getResult());
    });
    call.on('status', status => {
        console.log('status ', status);
    });
    call.on('error', err => {
        console.log(err);
    });
    call.on('end', () => {
        console.log('streaming end')
    })
}

/**
 * Client Streaming Implementation
 */
function callLongGreeting() {
    var client = new service.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );
    var request = new greets.LongGreetRequest();
    var call = client.longGreet(request, (error, response) => {
        if (!error) {
            console.log('server response ', response.getResult());
        } else {
            console.log(error);
        }
    });

    let count = 0, intervalID = setInterval(() => {
        console.log('sending message ' + count);
        var request = new greets.LongGreetRequest();
        var greeting = new greets.Greeting();
        greeting.setFirstName("Toufiqul");
        greeting.setLastName("Islam");
        request.setGreet(greeting);
        call.write(request);
        count++;

        if (count > 3) {
            clearInterval(intervalID);
            call.end();
            console.log('finished');
        }
    }, 1000)
}


/*
* Bidi Client APi Implementation
* */
async function sleep(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), interval);
    });
}

async function callBiDirect() {

    let client = new service.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );


    let call = client.greetEveryone((error, response) => {
        console.log('server response on Bidi ', response);
    })

    call.on('data', response => {
        console.log('Hello Client ' + response.getResult());
    })

    call.on('error', err => {
        console.log(err);
    });
    call.on('end', () => {
        console.log('Bidi Client End');
    })

    for (let i = 0; i < 10; i++) {
        let greeting = new greets.Greeting();
        greeting.setFirstName('Toufiqul');
        greeting.setLastName('Islam');

        let request = new greets.GreetEveryoneRequest();
        request.setGreet(greeting);
        call.write(request);
        await sleep(1500);
    }

    call.end();

}

main();
