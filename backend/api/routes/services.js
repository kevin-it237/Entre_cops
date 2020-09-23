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
    const images = req.files.filter(el => el.fieldname === "images");
    const filesPath = images.map(file => file.path)
    // Save new supplier
    const service = new Service({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        owner: JSON.parse(req.body.user),
        image: images[0].path,
        images: filesPath,
        target: req.body.cible,
        youtubeVideoLink: req.body.youtubeVideoLink,
        video: video,
        category: req.body.category,
        maxReservation: parseInt(req.body.maxReservation),
        offre: req.body.offre,
        duration: req.body.duration,
        place: req.body.place,
        tags: req.body.tags,
        mapLink: req.body.mapLink,
        validated: false,
        comments: [],
        reservations: [],
        date: new Date(),
        createdAt: new Date()
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
router.patch('/:id', upload.any(), (req, res, next) => {
    let request = {
        title: req.body.title,
        target: req.body.cible,
        youtubeVideoLink: req.body.youtubeVideoLink,
        category: req.body.category,
        offre: req.body.offre,
        duration: req.body.duration,
        maxReservation: parseInt(req.body.maxReservation),
        place: req.body.place,
        tags: req.body.tags,
        mapLink: req.body.mapLink,
    };

    if (req.files) {
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
            if (file.fieldname === 'serviceVideo') {
                request = { ...request, video: file.path }
                return;
            }
        })
    }
    Service.updateOne({ _id: req.params.id }, {
        $set: request
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
    Service.find({ title: new RegExp(query, 'i'), validated: true })
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

// Get all validated services
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

// Get all services with coupon
router.get('/with/coupon', (req, res, next) => {
    Service.find({"coupons": { $ne:null }, "coupons.nCoupons":  {$gt: 0 }, validated: true})
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

// Get last 4 validated services
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
    const userReservation = req.body.reservation;
    const id = req.params.id;
    // check if user is already registered to this service
    Service.findOne({ _id: id, reservations: { $elemMatch: { userId: userReservation.userId } } })
    .exec()
    .then(service => {
        if(service) {
            // The user is already registered to this service
            return res.status(200).json({
                service: service
            })
        } else {
            Service.updateOne({ _id: req.params.id }, {
                $push: { reservations: userReservation }
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
    Service.updateOne({ _id: req.params.id }, {
        $push: { comments: comment }
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

// Delete a comment
router.patch('/:id/deletecomment', (req, res, next) => {
    let commentId = req.body.commentId;

    Service.updateOne({ _id: req.params.id }, {
        $pull: { comments: {_id: commentId} }
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
    const tag = req.body.tag
    const tagRegex = new RegExp(tag, 'i')
    const town = req.body.town
    const townRegex = new RegExp(town, 'i')
    const date1 = req.body.date1
    const date2 = req.body.date2
    // Category, town, date1, tag, date2
    if (category.length&& town.length&& date1 && date2 && tag.length) {
        query = { $and: [{ category: category, place: townRegex, validated: true, tags: tagRegex }, { createdAt: { $gt: date1 } }, { createdAt: { $lt: date2 } }] }
    }
    // Category, town, date1, date2
    if (category.length&& town.length&& date1 && date2 && !tag.length) {
        query = { $and: [{ category: category, place: townRegex, validated: true }, { createdAt: { $gt: date1 } }, { createdAt: { $lt: date2 } }] }
    }
    // Category, town, date1
    if (category.length && town.length && date1 && !date2&& !tag.length) {
        query = { category: category, place: townRegex, createdAt: { $gt: date1 }, validated: true }
    }
    // Category, town
    if (category.length && town.length && !date1 && !date2&& !tag.length) {
        query = { category: category, place: townRegex }
    }
    // Category
    if (category.length && !town.length && !date1 && !date2&& !tag.length) {
        query = { category: category, validated: true }
    }
    // town
    if (!category.length && town.length && !date1 && !date2&& !tag.length) {
        query = { place: townRegex, validated: true }
    }
    // date1
    if (!category.length && !town.length && date1 && !date2&& !tag.length) {
        query = { createdAt: { $gt: date1 }, validated: true }
    }
    // Category, date1
    if (category.length && !town.length && date1 && !date2&& !tag.length) {
        query = { category: category, createdAt: { $gt: date1 }, validated: true }
    }
    // town, date1
    if (!category.length && town.length && date1 && !date2&& !tag.length) {
        query = { place: townRegex, createdAt: { $gt: date1 }, validated: true }
    }
    // Category,town, date2
    if (category.length && town.length && !date1 && date2&& !tag.length) {
        query = { category: category, place: townRegex, validated: true }
    }
    // date1, date2
    if (!category.length && !town.length && date1 && date2&& !tag.length) {
        query = { $and: [{ createdAt: { $gt: date1 } }, { createdAt: { $lt: date2 }}, {validated: true}] }
    }
    // date1, date2, tag
    if (!category.length && !town.length && date1 && date2&& tag.length) {
        query = { $and: [{ createdAt: { $gt: date1 } }, { createdAt: { $lt: date2 }}, {validated: true, tag: tagRegex}] }
    }
    // Category,town,tag
    if (category.length && town.length && !date1 && !date2&& tag.length) {
        query = { category: category, town: townRegex, tags: tagRegex, validated: true }
    }
    // Category,town,tag,date1
    if (category.length && town.length && date1 && !date2&& tag.length) {
        query = { category: category, town: townRegex, createdAt: { $gt: date1 }, tags: tagRegex, validated: true }
    }
    // Category,tag
    if (category.length && !town.length && !date1 && !date2&& tag.length) {
        query = { category: category, tags: tagRegex, validated: true }
    }
    // town,tag
    if (!category.length && town.length && !date1 && !date2&& tag.length) {
        query = { town: townRegex, tags: tagRegex, validated: true }
    }
    // date1, tag
    if (!category.length && !town.length && date1 && !date2&& tag.length) {
        query = { tags: tagRegex, createdAt: { $gt: date1 }, validated: true }
    }
    // tag
    if (!category.length&& !town.length&& !date1 && !date2&& tag.length) {
        query = { tags: tagRegex, validated: true }
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