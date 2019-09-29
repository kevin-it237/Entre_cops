const express = require('./node_modules/express');
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const socketIo = require("socket.io");;

const userRoutes = require('./api/routes/users');
const categoryRoutes = require('./api/routes/categories');
const supplierRoutes = require('./api/routes/suppliers');
const eventRoutes = require('./api/routes/events');
const serviceRoutes = require('./api/routes/services');
const galleryRoutes = require('./api/routes/galleries');

// Model
const User = require('./api/models/user');

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
const server = http.createServer(app);

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
app.use('/api/gallery', galleryRoutes);

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


var io = socketIo.listen(server);

io.on('connection', function (socket) {
    // let client = socket.request._query
    console.log("un client vient de se connecter");
    
    // Notification for recommandation
    socket.on('new notification', function (data) {
        io.emit('display notification',  data)
    })
    socket.on('new anounce notification', function (data) {
        socket.broadcast.emit('display anounce notification',  data)
    })

    socket.on("disconnect", () => console.log("Client disconnected"));
})

// Start the app
const PORT = 5000;
server.listen(PORT, function() {
    console.log("Server started on port " + PORT)
})