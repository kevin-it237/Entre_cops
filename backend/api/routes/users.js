const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const path = require("path");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const User = require('../models/user');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/usersImages')
    },
    filename: function (req, file, cb) {
        cb(null, "user-profile-" + Date.now() + path.extname(file.originalname))
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

// Create a user
router.post('/signup', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
                return res.status(409).json({
                    message: 'EMAIL_EXIST'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            profileImage: '',
                            tel: req.body.tel,
                            location: '',
                            accountValidated: false,
                            role: "user",
                            password: hash,
                            date: new Date()
                        });
                        user.save()
                            .then(user => {
                                const token = jwt.sign({
                                    email: user.email,
                                    username: user.username,
                                    userId: user._id
                                }, "ENTRECOPS_SECRET.JWT_KEY",
                                {
                                    expiresIn: "24h"
                                });
                                const now = new Date();
                                const expiresDate = now.getTime() + 60 * 60 * 24  * 1000;
                                return res.status(201).json({
                                    message: 'User Created',
                                    token: token,
                                    user: user,
                                    expiresDate: expiresDate
                                })
                            }).catch(err => {
                                return res.status(500).json({ error: err })
                            })
                    }
                })
            }
        })
})

// User Login
router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'EMAIL_NOT_EXIST'
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth Fail'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        name: user.name,
                        userId: user._id
                    }, "ENTRECOPS_SECRET.JWT_KEY",
                    {
                        expiresIn: "24h"
                    });
                    const now = new Date();
                    const expiresDate = now.getTime() + 60 * 60 * 24 * 1000;
                    return res.status(201).json({
                        message: 'User Login',
                        token: token,
                        user: user,
                        expiresDate: expiresDate
                    })
                }
                res.status(401).json({
                    message: 'WRONG_PASSWORD'
                })
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ error: err })
        })
})

// Regenarate token
router.post('/generatetoken', (req, res, next) => {
    const token = jwt.sign({
        email: req.body.email,
        name: req.body.name,
        userId: req.body._id
    }, "ENTRECOPS_SECRET.JWT_KEY",
    {
        expiresIn: "24h"
    });
    const now = new Date();
    const expiresDate = now.getTime() + 60 * 60 * 24 * 1000;
    return res.status(201).json({
        token: token,
        expiresDate: expiresDate
    })
})

//Update profile without image
router.patch('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
    .exec()
    .then(user => {
        if(user) {
            User.updateOne({ _id: user._id }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    tel: req.body.tel,
                    location: req.body.location,
                }
            })
            .then(user => {
                res.status(201).json({
                    message: 'User updated',
                    user: user
                })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
        } else {
            res.status(500).json({ error: err })
        }
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
});

//Update profile with image
router.patch('/:userId/image', upload.single('profileImage'), (req, res, next) => {
    User.findById(req.params.userId)
        .exec()
        .then(user => {
            if (user) {
                User.updateOne({ _id: user._id }, {
                    $set: {
                        name: req.body.name,
                        profileImage: req.file.path,
                        email: req.body.email,
                        tel: req.body.tel,
                        location: req.body.location
                    }
                })
                .then(user => {
                    res.status(201).json({
                        message: 'User updated successfully',
                        user: user
                    })
                })
                .catch(err => {
                    res.status(500).json({ error: err })
                })
            } else {
                res.status(500).json({ error: err })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
});

// Make recommandation to every user when a project is validated
router.patch('/recommand/to/all', (req, res, next) => {
    User.updateMany({role: "user"}, {
        $push: {
            recommandations: req.body.rec,
        }
    })
    .then(user => {
        res.status(201).json({
            message: 'Recommandation saved successfully',
            user: user
        })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
});


//Update password
router.patch('/:userId/password/update', (req, res, next) => {
    User.findById(req.params.userId)
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'EMAIL_NOT_EXIST'
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'WRONG_PASSWORD'
                    })
                }
                if (result) {
                    bcrypt.hash(req.body.newpassword, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        } else {
                            User.updateOne({ _id: user._id }, {
                                $set: {password: hash}
                            })
                            .then(user => {
                                res.status(201).json({
                                    message: 'User updated',
                                    user: user
                                })
                            })
                            .catch(err => {
                                res.status(500).json({ error: err })
                            })
                        }
                    })
                } else {
                    res.status(401).json({
                        message: 'WRONG_PASSWORD'
                    })
                }
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ error: err })
        })
});

// delete a user
router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            return res.status(200).json({
                message: "User deleted"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
});


// Get  a single user
router.get('/:userId', (req, res, next) => {
    User.findOne({ _id: req.params.userId })
        .exec()
        .then(user => {
            return res.status(200).json({
                user: user
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
});

// send mail
router.post('/sendmail/:email/:subject/:name/:id/:to', (req, res, next) => {
    var sendmail = null;
    if(req.params.to == "validatesupplier") {
        sendmail = require('../mailing/validate_supplier_email');
    }
    try {
        sendmail(req.params.email, req.params.subject, req.params.name, req.params.id);
        return res.status(201).json({
            mail: "Email sent",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "error": error
        })  
    }
})

// Make a recommandation
router.patch('/:id/recommand', (req, res, next) => {
    User.updateOne({ _id: req.params.id }, {
        $push: { recommandations: req.body.rec }
    })
    .exec()
    .then(user => {
        return res.status(201).json({
            user: user
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})


// Set a visited notification to true
router.patch('/:id/notification/seen', (req, res, next) => {
    User.updateOne({ _id: req.params.id }, {
        $set: { recommandations: req.body.rec }
    })
    .exec()
    .then(user => {
        return res.status(201).json({
            user: user
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// Get all users
router.get('/', (req, res, next) => {
    User.find({role: "user"}).sort({ $natural: -1 })
    .exec()
        .then(users => {
        return res.status(201).json({
            users: users
        })
    })
    .catch(err => {
        return res.status(500).json({ error: err })
    })
})

// count all users
router.get('/count/all', (req, res, next) => {
    User.find({ role: "user" }).count()
        .exec()
        .then(n => {
            return res.status(201).json({
                n: n
            })
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

module.exports = router;