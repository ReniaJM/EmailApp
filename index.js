const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/user');
require('./servises/passport');


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(keys.mongoURI, options)
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('DB Connection Error + ' , err.message)
    });


const db = mongoose.connection;
db.on("error", (err) => {
    console.log("> error occurred from the database",  err.message);
});
db.once("open", () => {
    console.log("> successfully opened the database");
});
const app = express();

require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT);

