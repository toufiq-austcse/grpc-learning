// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_decompostion_pb = require('../protos/decompostion_pb.js');

function serialize_decomposition_DecompositionRequest(arg) {
  if (!(arg instanceof protos_decompostion_pb.DecompositionRequest)) {
    throw new Error('Expected argument of type decomposition.DecompositionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_decomposition_DecompositionRequest(buffer_arg) {
  return protos_decompostion_pb.DecompositionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_decomposition_DecompositionResponse(arg) {
  if (!(arg instanceof protos_decompostion_pb.DecompositionResponse)) {
    throw new Error('Expected argument of type decomposition.DecompositionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_decomposition_DecompositionResponse(buffer_arg) {
  return protos_decompostion_pb.DecompositionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DecompositionServiceService = exports.DecompositionServiceService = {
  // stream api
getFactor: {
    path: '/decomposition.DecompositionService/GetFactor',
    requestStream: false,
    responseStream: true,
    requestType: protos_decompostion_pb.DecompositionRequest,
    responseType: protos_decompostion_pb.DecompositionResponse,
    requestSerialize: serialize_decomposition_DecompositionRequest,
    requestDeserialize: deserialize_decomposition_DecompositionRequest,
    responseSerialize: serialize_decomposition_DecompositionResponse,
    responseDeserialize: deserialize_decomposition_DecompositionResponse,
  },
};

exports.DecompositionServiceClient = grpc.makeGenericClientConstructor(DecompositionServiceService);
