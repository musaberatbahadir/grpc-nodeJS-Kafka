var PROTO_PATH = __dirname + '/randomNum.proto';

var grpc = require('grpc');
var avro = require('avsc');
var kafka = require('kafka-node');
var locationSchema = require('./location_schema.js');

var random_proto = grpc.load(PROTO_PATH).pckgRandom;
var HighLevelProducer = kafka.HighLevelProducer;
var myAvro = avro.parse(locationSchema);
var HighLevelProducer = kafka.HighLevelProducer;
//Kafka Client connects Zookeeper on 2181 port which is default port
var kafkaClient = new kafka.Client('localhost:2181', '001', {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});
var myProducer = new HighLevelProducer(kafkaClient);

//keeps the data in Memory 
const inMemoryLocations = [];
function saveInMemory(data) {
    inMemoryLocations.push(data);
}

kafkaClient.on('error', function(error) {
    console.error(error);
});

function getLocations(call){
    var data = {
        longitude: call.request.longitude,
        latitude: call.request.latitude,
    }

    saveInMemory(data);

    var buffer = myAvro.toBuffer(data);

    // Create a new payload
    var payload = [{
        topic: 'LOCATION_CHANGE',
        messages: buffer
    }];

    //Send payload to Kafka and log result/error
    myProducer.send(payload, (error, result) => {
        if (error) {
            console.error(error);
        }
    });

    //to see sended data from client
    console.log("Longitude: " + call.request.longitude + "\n" + "Latitude: " + call.request.latitude);
}

function main() {
    var server = new grpc.Server();
    server.addService(random_proto.srvRandom.service, {getLocations: getLocations});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

myProducer.on('ready', () => {
    main();
});

myProducer.on('error', (error) => {
    console.error(error);
});