const mongoose = require('mongoose');

class Database {
    constructor(url) {
        this.url = url
    }

    async db_connect() {
        const db = await mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log('DB connected');
    }

}

module.exports = Database;