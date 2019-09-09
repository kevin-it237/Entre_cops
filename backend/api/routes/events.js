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
        cb(null, "supplier-" + Date.now() + path.extname(file.originalname))
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

// Get all invalidaded events
router.get('/all', (req, res, next) => {
    Event.find({ validated: false})
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

module.exports = router;