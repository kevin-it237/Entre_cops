const express = require('express')
const path = require("path");
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

const Event = require('../models/event');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/eventsimages')
    },
    filename: function (req, file, cb) {
        cb(null, "event-" + Date.now() + path.extname(file.originalname))
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

// Event creation
router.post('/new', upload.single('eventImage'), (req, res, next) => {
    // Save new supplier
    const event = new Event({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        owner: JSON.parse(req.body.user),
        image: req.file.path,
        place: req.body.place,
        description: req.body.description,
        category: req.body.category,
        otherInfos: req.body.otherInfos,
        validated: false,
        date: req.body.date,
        comments: [],
        reservations: []
    })
    event.save()
    .then(event => {
        res.status(201).json({
            message: 'Event saved successfully',
            event: event
        })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
})

// Get all events
router.get('/all', (req, res, next) => {
    Event.find({}).sort({ $natural: -1 })
    .exec()
        .then(events => {
        return res.status(201).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get last 5 invalidaded/validaded events
router.get('/5', (req, res, next) => {
    Event.find({}).sort({ $natural: -1 }).limit(5)
    .exec()
        .then(events => {
        return res.status(201).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get last all validated events
router.get('/validated/all', (req, res, next) => {
    Event.find({validated: true}).sort({ $natural: -1 })
    .exec()
        .then(events => {
        return res.status(201).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get last 4 validated events
router.get('/4', (req, res, next) => {
    Event.find({validated: true}).sort({ $natural: -1 }).limit(4)
    .exec()
        .then(events => {
        return res.status(201).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get events of the same category
router.get('/category/:name', (req, res, next) => {
    Event.find({category: req.params.name, validated: true}).sort({ $natural: -1 })
    .exec()
    .then(events => {
        return res.status(201).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get a single event
router.get('/:id', (req, res, next) => {
    Event.findById(req.params.id)
        .exec()
        .then(event => {
            return res.status(201).json({
                event: event
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

// Get a all events of a supplier
router.get('/supplier/:id', (req, res, next) => {
    Event.find({"owner._id" : req.params.id, validated: true})
        .exec()
        .then(events => {
            return res.status(201).json({
                events: events
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

// Validate event
router.patch('/validate/:id', (req, res, next) => {
    Event.updateOne({ _id: req.params.id }, {
        $set: { validated: true }
    })
    .exec()
    .then(event => {
        return res.status(201).json({
            event: event
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Update event
router.patch('/:id', upload.single('eventImage'), (req, res, next) => {
    Event.updateOne({ _id: req.params.id }, {
        $set: { image: req.file.path }
    })
    .exec()
    .then(event => {
        return res.status(201).json({
            event: event
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})


// Make a reservation
router.patch('/:id/makereservation', (req, res, next) => {
    Event.updateOne({ _id: req.params.id }, {
        $push: { reservations: req.body.reservation }
    })
    .exec()
    .then(event => {
        return res.status(201).json({
            event: event
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})


// Submit a comment
router.patch('/:id/comment', (req, res, next) => {
    Event.updateOne({ _id: req.params.id }, {
        $push: { comments: req.body.comment }
    })
    .exec()
    .then(event => {
        return res.status(201).json({
            event: event
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})


// Set coupons
router.patch('/:id/add/coupon', (req, res, next) => {
    Event.updateOne({ _id: req.params.id }, {
        $set: { coupons: req.body.coupon }
    })
    .exec()
    .then(event => {
        return res.status(201).json({
            event: event
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})


// Remove coupons
router.patch('/:id/remove/coupon', (req, res, next) => {
    Event.updateOne({ _id: req.params.id }, {
        $set: { "coupons.nCoupons": 0 }
    })
    .exec()
    .then(event => {
        return res.status(201).json({
            event: event
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Delete event
router.delete('/:id', (req, res, next) => {
    Event.remove({ _id: req.params.id })
    .exec()
    .then(event => {
        return res.status(201).json({
            event: event
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

module.exports = router;