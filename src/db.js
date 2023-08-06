const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

module.exports.connect = async() => {
    mongod = await MongoMemoryServer.create();

    const uri = await mongod.getUri();

    await mongoose.connect(uri);
}

module.exports.closeDatabase = async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}