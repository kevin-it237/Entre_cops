const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Service = require('../models/service');
const Event = require('../models/event');

// Delete many reservations
router.patch('/reservations/delete', (req, res, next) => {
    const reservations = req.body.reservations;
    
    let Announce;
    
    // Loop and delete all reservations
    reservations.forEach((resa, i) => {
        const announceId = resa.link.split("/")[3];
        const announceType = resa.link.split("/")[2];
        if (announceType === "event") {
            Announce = require('../models/event');
        } else if(announceType === "service") {
            Announce = require('../models/service');
        }

        Announce.updateOne({ _id: announceId }, {
            $pull: { "reservations": { "userId": resa.userId} }
        }, function(err, announce) {
            if (err) return res.status(500).json({ error: err });

            // Check if we already loop over whole array
            if(reservations.length == (i+1)) {
                return res.status(201).json({
                    announce: announce
                })
            }
        })
    });
})

module.exports = router;