const express = require('express')
const path = require("path");
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

const Service = require('../models/service');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/servicesimages')
    },
    filename: function (req, file, cb) {
        cb(null, "service-" + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'video/mkv') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50
    },
    fileFilter: fileFilter
})

// Service creation
router.post('/new', upload.any(), (req, res, next) => {
    let video = '';
    req.files.forEach(file => {
        if (file.fieldname === 'serviceVideo') {
            video = file.path;
        }
    })
    const filesPath = req.files.map(file => file.path)
    // Save new supplier
    const service = new Service({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        owner: JSON.parse(req.body.user),
        image: req.files[0].path,
        images: filesPath,
        target: req.body.cible,
        youtubeVideoLink: req.body.youtubeVideoLink,
        video: video,
        problem: req.body.problem,
        category: req.body.category,
        offre: req.body.offre,
        duration: req.body.duration,
        place: req.body.place,
        validated: false,
        comments: [],
        reservations: [],
        date: new Date(),
    })
    service.save()
    .then(service => {
        res.status(201).json({
            message: 'Service saved successfully',
            service: service
        })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
})

// Update service
router.patch('/:id', upload.array('images'), (req, res, next) => {
    console.log(req.files)
    const filesPath = req.files.map(file => file.path)
    Service.updateOne({ _id: req.params.id }, {
        $set: { images: filesPath, image: req.files[0].path }
    })
    .exec()
    .then(service => {
        return res.status(201).json({
            service: service
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Search services by  title
router.get('/:query/search', (req, res, next) => {
    const query = req.params.query
    Service.find({ title: new RegExp(query, 'i') })
        .exec()
        .then(services => {
            return res.status(200).json({
                services: services
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

// Get all services
router.get('/all', (req, res, next) => {
    Service.find({}).sort({ $natural: -1 })
        .exec()
        .then(services => {
            return res.status(200).json({
                services: services
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

// Get last 5  services
router.get('/5', (req, res, next) => {
    Service.find({}).sort({ $natural: -1 }).limit(5)
        .exec()
        .then(services => {
            return res.status(200).json({
                services: services
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

// Get all validaded services
router.get('/validated/all', (req, res, next) => {
    Service.find({validated: true}).sort({ $natural: -1 })
        .exec()
        .then(services => {
            return res.status(200).json({
                services: services
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

// Get services of the same category
router.get('/category/:name', (req, res, next) => {
    Service.find({category: req.params.name, validated: true}).sort({ $natural: -1 })
    .exec()
    .then(services => {
        return res.status(200).json({
            services: services
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get last 4 validaded services
router.get('/4', (req, res, next) => {
    Service.find({validated: true}).sort({ $natural: -1 }).limit(4)
        .exec()
        .then(services => {
            return res.status(200).json({
                services: services
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

// Get a single service
router.get('/:id', (req, res, next) => {
    Service.findById(req.params.id)
        .exec()
        .then(service => {
            return res.status(200).json({
                service: service
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

// Get a all events of a supplier
router.get('/supplier/:id', (req, res, next) => {
    Service.find({"owner._id" : req.params.id, validated: true})
    .exec()
    .then(services => {
        return res.status(200).json({
            services: services
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Validate service
router.patch('/validate/:id', (req, res, next) => {
    Service.updateOne({ _id: req.params.id }, {
        $set: { validated: true }
    })
        .exec()
        .then(service => {
            return res.status(201).json({
                service: service
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

// Make a reservation
router.patch('/:id/makereservation', (req, res, next) => {
    Service.updateOne({ _id: req.params.id }, {
        $push: { reservations: req.body.reservation }
    })
    .exec()
    .then(service => {
        return res.status(201).json({
            service: service
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Submit a comment
router.patch('/:id/comment', (req, res, next) => {
    Service.updateOne({ _id: req.params.id }, {
        $push: { comments: req.body.comment }
    })
    .exec()
    .then(service => {
        return res.status(201).json({
            service: service
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Vote an event
router.patch('/:id/vote/:value', (req, res, next) => {
    Service.updateOne({ _id: req.params.id }, {
        $set: { rate: { value: Number(req.params.value),  clients: req.body.clients  } }
    })
    .exec()
    .then(service => {
        return res.status(201).json({
            service: service
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Set coupons
router.patch('/:id/add/coupon', (req, res, next) => {
    Service.updateOne({ _id: req.params.id }, {
        $set: { coupons: req.body.coupon }
    })
    .exec()
    .then(service => {
        return res.status(201).json({
            service: service
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})


// Remove coupons
router.patch('/:id/remove/coupon', (req, res, next) => {
    Service.updateOne({ _id: req.params.id }, {
        $set: { coupons: {} }
    })
    .exec()
    .then(service => {
        return res.status(201).json({
            service: service
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Delete service
router.delete('/:id', (req, res, next) => {
    Service.remove({ _id: req.params.id })
        .exec()
        .then(service => {
            return res.status(201).json({
                service: service
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})


// Search events by category, town or date
router.post('/filter', (req, res, next) => {
    const category = req.body.category
    const town = new RegExp(req.body.town, 'i')
    const date1 = req.body.date1
    const date2 = req.body.date2
    let query = {}
    // Category, town, date1, date2
    if (category != "" && town != "" && date1 && date2) {
        query = { $and: [{ category: category, place: town }, { date: { $gt: date1 } }, { date: { $lt: date2 } }] }
    }
    // Category, town, date1
    if (category != "" && town != "" && date1 && !date2) {
        query = { category: category, place: town, date: { $gt: date1 } }
    }
    // Category, town
    if (category != "" && town != "" && !date1 && !date2) {
        query = { category: category, place: town }
    }
    // Category
    if (category != "" && town == "" && !date1 && !date2) {
        query = { category: category }
    }
    // town
    if (category == "" && town != "" && !date1 && !date2) {
        query = { place: town }
    }
    // date1
    if (category == "" && town == "" && date1 && !date2) {
        query = { date: { $gt: date1 } }
    }
    // Category, date1
    if (category != "" && town == "" && date1 && !date2) {
        query = { category: category, date: { $gt: date1 } }
    }
    // town, date1
    if (category == "" && town != "" && date1 && !date2) {
        query = { place: town, date: { $gt: date1 } }
    }
    // Category,town, date2
    if (category != "" && town != "" && !date1 && date2) {
        query = { category: category, place: town }
    }
    // date1, date2
    if (category == "" && town == "" && date1 && date2) {
        query = { $and: [{ date: { $gt: date1 } }, { date: { $lt: date2 } }] }
    }
    Service.find(query).sort({ $natural: -1 })
        .exec()
        .then(services => {
            return res.status(200).json({
                services: services
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})


module.exports = router;