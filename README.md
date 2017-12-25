## a Basic GRPC Server & Client uses Apache Kafka and Avro
As in topic, it is a sample of how to use GRPC server and client with Apache Kafka and its Avro package.<br>
In this tutorial I generate random "Langitude" and "Latitude" variables and send it to Server in view of GRPC(uses protos, req/resp pipeline etc).<br>Kafka Consumer dispatchs all flowed data, which is wrapped with Apache Avro, to console.

### Prerequisites
* Install [Node JS](https://nodejs.org/en/download/)
* Install [Kafka](https://kafka.apache.org/)

### Run
* Run Zookeeper <br> ```zkserver start```
* for Kafka, be carefull given path is suitable for you or not ! <br> ```kafka-server-start /usr/local/etc/kafka/server.properties```
* for Server <br> ```node server.js```
* for Client <br> ```node client.js```
* for Kafka Consumer <br> ```node kafka_consumer.js```
