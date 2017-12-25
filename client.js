var PROTO_PATH = __dirname + '/randomNum.proto';

var grpc = require('grpc');
var random_proto = grpc.load(PROTO_PATH).pckgRandom;

function main () {
    var client = new random_proto.srvRandom('localhost:50051', grpc.credentials.createInsecure());
    //sends random Locations to server between 0 and 10 each second
    setInterval(() => {
        var myLongitude = Math.random() * (10 - 0) + 0;
        var myLatitude = Math.random() * (10 - 0) + 0;
        client.getLocations({longitude: myLongitude, latitude: myLatitude }, function(err, response) {
        });
    }, 1000);
}

main();