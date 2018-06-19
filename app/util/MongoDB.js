const MongoClient = require('mongodb').MongoClient;

const dbUser = 'fm_node';
const dbPass = 'fm_node';
const dbName = 'forum_madness';
const dbHost = 'mongo';
const dbPort = 27017;

class MongoDB {
    constructor() {
        this.client = MongoClient;
        this.url = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(this.url);
        });
    }
}

module.exports = MongoDB;