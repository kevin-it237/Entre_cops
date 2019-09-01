const express = require('./node_modules/express');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to db
mongoose.connect(config.database, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('Connected to mongodb');
})

// App initialization
const app = express();

app.get('/', function(req, res) {
    res.send("Working")
})

// Start the app
const PORT = 3000;
app.listen(PORT, function() {
    console.log("Server started on port " + PORT)
})