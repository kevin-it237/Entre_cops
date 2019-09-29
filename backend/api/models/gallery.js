const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: { type: String, required: false },
    images: { type: Array, required: false },
    date: { type: Date, required: false },
})

module.exports = mongoose.model('Gallery', gallerySchema)