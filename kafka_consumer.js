var avro = require('avsc');
var kafka = require('kafka-node');
var locationSchema = require('./location_schema.js');

var myAvro = avro.parse(locationSchema);
var HighLevelConsumer = kafka.HighLevelConsumer;
var kafkaClient = new kafka.Client('localhost:2181');
var topics = [{
    topic: 'LOCATION_CHANGE'
}];

var options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'buffer'
}

var consumer = new HighLevelConsumer (kafkaClient, topics, options);

consumer.on('message', (message) => {
    const buffer = new Buffer(message.value, 'binary'); // Read string into a buffer.
    const decodedMessage = myAvro.fromBuffer(buffer.slice(0)); // Skip prefix.
    console.log(decodedMessage);
});

consumer.on('error', (err) => {
    console.log('error', err);
});
  
process.on('SIGINT', () => {
    consumer.close(true, () => {
        process.exit();
    });
});