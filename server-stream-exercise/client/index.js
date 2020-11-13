/*
* Prime Number Decomposition Client
* */

const grpc = require('grpc');
let decompositions = require('../server/protos/decompostion_pb');
let service = require('../server/protos/decompostion_grpc_pb');

function main() {
    callPrimeNumberDecomposition()
}

function callPrimeNumberDecomposition() {
    let client = new service.DecompositionServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );
    let request =new decompositions.DecompositionRequest();
    request.setNum('1000000000000000');

    let call = client.getFactor(request, () => {
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

main();
