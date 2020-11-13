// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_calculator_pb = require('../protos/calculator_pb.js');

function serialize_calculator_ComputeAvgRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.ComputeAvgRequest)) {
    throw new Error('Expected argument of type calculator.ComputeAvgRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAvgRequest(buffer_arg) {
  return protos_calculator_pb.ComputeAvgRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_ComputeAvgResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.ComputeAvgResponse)) {
    throw new Error('Expected argument of type calculator.ComputeAvgResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAvgResponse(buffer_arg) {
  return protos_calculator_pb.ComputeAvgResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorServiceService = exports.CalculatorServiceService = {
  computeAvg: {
    path: '/calculator.CalculatorService/ComputeAvg',
    requestStream: true,
    responseStream: false,
    requestType: protos_calculator_pb.ComputeAvgRequest,
    responseType: protos_calculator_pb.ComputeAvgResponse,
    requestSerialize: serialize_calculator_ComputeAvgRequest,
    requestDeserialize: deserialize_calculator_ComputeAvgRequest,
    responseSerialize: serialize_calculator_ComputeAvgResponse,
    responseDeserialize: deserialize_calculator_ComputeAvgResponse,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService);
