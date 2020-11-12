let grpc = require('grpc');
let sum = require('../server/protos/sum_pb');
let service = require('../server/protos/sum_grpc_pb');

function main() {
    console.log('hello from client')
    let client = new service.SumServiceClient('localhost:50051', grpc.credentials.createInsecure());
    let request = new sum.SumRequest();

    let numbers = new sum.Numbers();
    numbers.setNum1('2');
    numbers.setNum2('3');

    request.setNumbers(numbers);

    client.sum(request,(err,res)=>{
        if(!err){
            console.log(res.getResult())
        }else{
            console.log('err',err);
        }
    })

}

main();
