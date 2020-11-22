var grpc = require('grpc');
var calc = require('../server/protos/calculator_pb');
var service = require('../server/protos/calculator_grpc_pb');


function doErrorCall(){
    var client = new service.CalculatorServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

    let number = -25;
    let squareRootRequest = new calc.SquareRootRequest();

    squareRootRequest.setNumber(number);
    client.squareRoot(squareRootRequest,(err,response)=>{
        if(!err){
              console.log('Square Root Is ',response.getNumberRoot());  
        }else{
            console.log(err);
        }
    })
}

function main(){
    doErrorCall();
};
main();