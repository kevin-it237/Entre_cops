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
    if (file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'video/mkv' ) { 
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

// Event creation
router.post('/new', upload.any(), (req, res, next) => {
    // Save new supplier
    let video = '';
    req.files.forEach(file => {
        if (file.fieldname === 'eventVideo') {
            video = file.path;
        }
    })
    const images = req.files.filter(el => el.fieldname === "images");
    const filesPath = images.map(file => file.path)
    const event = new Event({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        owner: JSON.parse(req.body.user),
        image: images[0].path,
        images: filesPath,
        video: video,
        place: req.body.place,
        youtubeVideoLink: req.body.youtubeVideoLink,
        maxReservation: parseInt(req.body.maxReservation),
        description: req.body.description,
        category: req.body.category,
        otherInfos: req.body.otherInfos,
        tags: req.body.tags,
        mapLink: req.body.mapLink,
        validated: false,
        date: req.body.date,
        comments: [],
        reservations: [],
        createdAt: new Date()
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

// Update event
router.patch('/:id', upload.any(), (req, res, next) => {
    let request = {
        title: req.body.title,
        place: req.body.place,
        youtubeVideoLink: req.body.youtubeVideoLink,
        description: req.body.description,
        date: req.body.date,
        category: req.body.category,
        maxReservation: parseInt(req.body.maxReservation),
        otherInfos: req.body.otherInfos,
        mapLink: req.body.mapLink,
        tags: req.body.tags,
    };
    if(req.files) {
        // Vérify if there is new images
        req.files.forEach(file => {
            if (file.fieldname === 'images') {
                const images = req.files.filter(el => el.fieldname === "images");
                const filesPath = images.map(file => file.path)
                request = { ...request, images: filesPath, image: images[0].path }
                return;
            }
        })

        // Vérify if there is a new video
        req.files.forEach(file => {
            if (file.fieldname === 'eventVideo') {
                request = { ...request, video: file.path }
                return;
            }
        })
    }
    Event.updateOne({ _id: req.params.id }, {
        $set: request
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

// Get all events
router.get('/all', (req, res, next) => {
    Event.find({ date: { $gte: new Date() }}).sort({ $natural: -1 })
    .exec()
        .then(events => {
        return res.status(200).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Search events by  title
router.get('/:query/search', (req, res, next) => {
    const query = req.params.query
    Event.find({ title: new RegExp(query, 'i'), validated: true, date: { $gte: new Date() } })
    .exec()
    .then(events => {
        return res.status(200).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get last 5 invalidaded/validated events
router.get('/5', (req, res, next) => {
    Event.find({ date: { $gte: new Date() }}).sort({ $natural: -1 }).limit(5)
    .exec()
        .then(events => {
        return res.status(200).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get last all validated events
router.get('/validated/all', (req, res, next) => {
    Event.find({validated: true, date: { $gte: new Date() }}).sort({ $natural: -1 })
    .exec()
        .then(events => {
        return res.status(200).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get last 4 validated events
router.get('/4', (req, res, next) => {
    Event.find({validated: true, date: { $gte: new Date() }}).sort({ $natural: -1 }).limit(4)
    .exec()
        .then(events => {
        return res.status(200).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get events of the same category
router.get('/category/:name', (req, res, next) => {
    Event.find({category: req.params.name, validated: true, date: { $gte: new Date() } }).sort({ $natural: -1 })
    .exec()
    .then(events => {
        return res.status(200).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get all events with coupon
router.get('/with/coupon', (req, res, next) => {
    Event.find({"coupons": { $ne:null }, "coupons.nCoupons":  {$gt: 0 }, date: { $gte: new Date() }, validated: true})
        .exec()
        .then(events => {
            return res.status(200).json({
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
            return res.status(200).json({
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
            return res.status(200).json({
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

// Make a reservation
router.patch('/:id/makereservation', (req, res, next) => {
    const userReservation = req.body.reservation;
    const id = req.params.id;
    // check if user is already registered to this event
    Event.findOne({ _id: id, reservations: { $elemMatch: { userId: userReservation.userId } } })
    .exec()
    .then(event => {
        if(event) {
            // The user is already registered to this event
            return res.status(200).json({
                event: event
            })
        } else {
            Event.updateOne({ _id: req.params.id }, {
                $push: { reservations: userReservation }
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
        }
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})


// Submit a comment
router.patch('/:id/comment', (req, res, next) => {
    let comment = req.body.comment;
    comment._id = mongoose.Types.ObjectId();
    Event.updateOne({ _id: req.params.id }, {
        $push: { comments: comment }
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


// Delete a comment
router.patch('/:id/deletecomment', (req, res, next) => {
    let commentId = req.body.commentId;

    Event.updateOne({ _id: req.params.id }, {
        $pull: { comments: {_id: commentId} }
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

// Vote an event
router.patch('/:id/vote/:value', (req, res, next) => {
    Event.updateOne({ _id: req.params.id }, {
        $set: { rate: { value: Number(req.params.value),  clients: req.body.clients  } }
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

// Search events by category, town or date
router.post('/filter', (req, res, next) => {
    const category = req.body.category
    const tag = req.body.tag
    const tagRegex = new RegExp(tag, 'i')
    const town = req.body.town
    const townRegex = new RegExp(town, 'i')
    const date1 = req.body.date1
    const date2 = req.body.date2
    // Category, town, date1, tag, date2
    if (category.length&& town.length&& date1 && date2 && tag.length) {
        query = { $and: [{ category: category, place: townRegex, validated: true, tags: tagRegex }, { createdAt: { $gt: date1 } }, { createdAt: { $lt: date2 } }, { date: { $gte: new Date()}}] }
    }
    // Category, town, date1, date2
    if (category.length&& town.length&& date1 && date2 && !tag.length) {
        query = { $and: [{ category: category, place: townRegex, validated: true }, { createdAt: { $gt: date1 } }, { createdAt: { $lt: date2 } }, {date: { $gte: new Date()}}] }
    }
    // Category, town, date1
    if (category.length && town.length && date1 && !date2&& !tag.length) {
        query = { category: category, place: townRegex, createdAt: { $gt: date1 }, validated: true, date: { $gte: new Date()} }
    }
    // Category, town
    if (category.length && town.length && !date1 && !date2&& !tag.length) {
        query = { category: category, place: townRegex, date: { $gte: new Date()} }
    }
    // Category
    if (category.length && !town.length && !date1 && !date2&& !tag.length) {
        query = { category: category, validated: true, date: { $gte: new Date()} }
    }
    // town
    if (!category.length && town.length && !date1 && !date2&& !tag.length) {
        query = { place: townRegex, validated: true, date: { $gte: new Date()} }
    }
    // date1
    if (!category.length && !town.length && date1 && !date2&& !tag.length) {
        query = { createdAt: { $gt: date1 }, validated: true, date: { $gte: new Date()} }
    }
    // Category, date1
    if (category.length && !town.length && date1 && !date2&& !tag.length) {
        query = { category: category, createdAt: { $gt: date1 }, validated: true, date: { $gte: new Date()} }
    }
    // town, date1
    if (!category.length && town.length && date1 && !date2&& !tag.length) {
        query = { place: townRegex, createdAt: { $gt: date1 }, validated: true, date: { $gte: new Date()} }
    }
    // Category,town, date2
    if (category.length && town.length && !date1 && date2&& !tag.length) {
        query = { category: category, place: townRegex, validated: true, date: { $gte: new Date()} }
    }
    // date1, date2
    if (!category.length && !town.length && date1 && date2&& !tag.length) {
        query = { $and: [{ createdAt: { $gt: date1 } }, { createdAt: { $lt: date2 }}, {validated: true}, {date: { $gte: new Date()}}] }
    }
    // date1, date2, tag
    if (!category.length && !town.length && date1 && date2&& tag.length) {
        query = { $and: [{ createdAt: { $gt: date1 } }, { createdAt: { $lt: date2 }}, {validated: true, tag: tagRegex}, {date: { $gte: new Date()}}] }
    }
    // Category,town,tag
    if (category.length && town.length && !date1 && !date2&& tag.length) {
        query = { category: category, town: townRegex, tags: tagRegex, validated: true, date: { $gte: new Date()} }
    }
    // Category,town,tag,date1
    if (category.length && town.length && date1 && !date2&& tag.length) {
        query = { category: category, town: townRegex, createdAt: { $gt: date1 }, tags: tagRegex, validated: true, date: { $gte: new Date()} }
    }
    // Category,tag
    if (category.length && !town.length && !date1 && !date2&& tag.length) {
        query = { category: category, tags: tagRegex, validated: true, date: { $gte: new Date()} }
    }
    // town,tag
    if (!category.length && town.length && !date1 && !date2&& tag.length) {
        query = { town: townRegex, tags: tagRegex, validated: true, date: { $gte: new Date()} }
    }
    // date1, tag
    if (!category.length && !town.length && date1 && !date2&& tag.length) {
        query = { tags: tagRegex, createdAt: { $gt: date1 }, validated: true, date: { $gte: new Date()} }
    }
    // tag
    if (!category.length&& !town.length&& !date1 && !date2&& tag.length) {
        query = { tags: tagRegex, validated: true, date: { $gte: new Date()} }
    }
    Event.find(query).sort({ $natural: -1 })
    .exec()
    .then(events => {
        return res.status(200).json({
            events: events
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

module.exports = router;