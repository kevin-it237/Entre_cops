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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

// Supplier registration
router.post('/new', upload.single('serviceImage'), (req, res, next) => {
    // Save new supplier
    const service = new Service({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        owner: JSON.parse(req.body.user),
        image: req.file.path,
        target: req.body.cible,
        problem: req.body.problem,
        category: req.body.category,
        offre: req.body.offre,
        duration: req.body.duration,
        place: req.body.place,
        validated: false,
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
router.patch('/:id', upload.single('serviceImage'), (req, res, next) => {
    Service.updateOne({ _id: req.params.id }, {
        $set: { image: req.file.path }
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

// Get all services
router.get('/all', (req, res, next) => {
    Service.find({}).sort({ $natural: -1 })
        .exec()
        .then(services => {
            return res.status(201).json({
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
            return res.status(201).json({
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
            return res.status(201).json({
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
        return res.status(201).json({
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
            return res.status(201).json({
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
            return res.status(201).json({
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
        return res.status(201).json({
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

module.exports = router;