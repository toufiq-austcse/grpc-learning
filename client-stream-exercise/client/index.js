/*
* client streaming api client
* */

let grpc = require('grpc');
let calculator = require('../server/protos/calculator_pb');
let service = require('../server/protos/calculator_grpc_pb');

function main() {
    getAvg();
}

function getAvg() {
    let client = new service.CalculatorServiceClient('localhost:50051', grpc.credentials.createInsecure());
    let request = new calculator.ComputeAvgRequest();
    let call = client.computeAvg(request, (err, response) => {

        if (!err) {
            console.log('Result ', response.getResult());
        } else {
            console.log('error ', err.message);
        }
    });

    for (let i = 0; i < 100000; i++) {
        let request = new calculator.ComputeAvgRequest();
        request.setNum(i.toString());
        call.write(request);
    }


    // let requestTwo = new calculator.ComputeAvgRequest();
    // requestTwo.setNum('2');
    //
    // let requestThree = new calculator.ComputeAvgRequest();
    // requestThree.setNum('3');
    //
    // let requestFour = new calculator.ComputeAvgRequest();
    // requestFour.setNum('4');



    // call.write(requestTwo);
    // call.write(requestThree);
    // call.write(requestFour);
    call.end();
    console.log('finished');

}

main();
