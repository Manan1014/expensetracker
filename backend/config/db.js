const mongoose = require('mongoose');

let x = mongoose.connect("mongodb://Manan:Manan@ac-a5o3slu-shard-00-00.vv4lzi6.mongodb.net:27017,ac-a5o3slu-shard-00-01.vv4lzi6.mongodb.net:27017,ac-a5o3slu-shard-00-02.vv4lzi6.mongodb.net:27017/?replicaSet=atlas-j311v7-shard-0&ssl=true&authSource=admin");
// Connect to MongoDB database
x.then(() => {
    console.log("connection ready successfully");
})
x.catch((err) => {
    console.log("some problem occur in connection creating");
    console.log(err);
})