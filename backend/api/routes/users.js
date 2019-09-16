const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user');

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
                            tel: '',
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
                                console.log(err)
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
                    message: 'Auth Fail, Password'
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

// Get all users
router.get('/all', (req, res, next) => {
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

module.exports = router;