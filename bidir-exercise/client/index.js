var grpc = require('grpc');
var calculators = require('../server/protos/calculator_pb');
var service = require('../server/protos/calculator_grpc_pb');


function main() {
    console.log('hello from client');
    //  callGreetings();
    // callGreetManyTimes();
    // callLongGreeting();
    callBiDirect();

}

function callBiDirect() {
    let client = new service.FindMaximumServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

    let call = client.findMaximum();

    call.on('data', response => {
        console.log('current largest number ' + response.getResult());
    })

    call.on('error', err => {
        console.log(err);
    });
    call.on('end', () => {
        console.log('Bidi Client End');
    });

    let arr = [5,1,2,3,6,2,10]
    for (let i = 0; i < arr.length; i++) {

        let request = new calculators.FindMaximumRequest();
        request.setNum(arr[i]);
        call.write(request);
    }

    call.end();

}

main();
