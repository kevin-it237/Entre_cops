const express = require('./node_modules/express');
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const userRoutes = require('./api/routes/users');
const categoryRoutes = require('./api/routes/categories');
const supplierRoutes = require('./api/routes/suppliers');
const eventRoutes = require('./api/routes/events');
const serviceRoutes = require('./api/routes/services');

// Connect to db
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.Promise = global.Promise
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('Connected to mongodb');
})

// App initialization
const app = express();

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Type, Accept, Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

/* App Routes */

// User routes
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/service', serviceRoutes);

// Admin routes

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

// Start the app
const PORT = 5000;
app.listen(PORT, function() {
    console.log("Server started on port " + PORT)
})