const express = require('express')
const path = require("path");
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

const User = require('../models/user');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/suppliersImages')
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
router.post('/new', upload.single('profileImage'), (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            // Verify if ther is already a suppier account with this email
            if (user) {
                if (user.role === "user") {
                    //Update the user with more supplier informations
                    User.updateOne({ _id: user._id }, {
                        $set: {
                            name: req.body.name,
                            profileImage: req.file.path,
                            tel: req.body.tel,
                            location: req.body.location,
                            services: req.body.services,
                            otherInfos: req.body.otherInfos,
                            accountValidated: false,
                            role: "supplier",
                        }
                    })
                        .then(supplier => {
                            res.status(201).json({
                                message: 'Supplier saved successfully',
                                supplier: supplier
                            })
                        })
                        .catch(err => {
                            res.status(500).json({ error: err })
                        })
                } else {
                    return res.status(409).json({
                        message: 'EMAIL_EXIST'
                    })
                }
            } else {
                // Save new supplier
                const supplier = new User({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    profileImage: req.file.path,
                    tel: req.body.tel,
                    location: req.body.location,
                    services: req.body.services,
                    otherInfos: req.body.otherInfos,
                    accountValidated: false,
                    role: "supplier",
                    date: new Date()
                })
                supplier.save()
                    .then(supplier => {
                        res.status(201).json({
                            message: 'Supplier saved successfully',
                            supplier: supplier
                        })
                    })
                    .catch(err => {
                        res.status(500).json({ error: err })
                    })
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
})

// Get all suppliers
router.get('/all', (req, res, next) => {
    User.find({ "role": "supplier" })
    .exec()
        .then(suppliers => {
        return res.status(201).json({
            suppliers: suppliers
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Validate suppliers
router.patch('/validate/:id', (req, res, next) => {
    User.updateOne({ _id: req.params.id }, {
        $set: { accountValidated: true}
    })
    .exec()
    .then(supplier => {
        return res.status(201).json({
            supplier: supplier
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})


// Get a single supplier
router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
    .exec()
    .then(supplier => {
        return res.status(201).json({
            supplier: supplier
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

module.exports = router;