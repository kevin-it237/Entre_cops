const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    link: { type: String, required: true },
    isCurrent: { type: Boolean, required: true },
    date: { type: Date, required: false },
})

module.exports = mongoose.model('Banner', bannerSchema)