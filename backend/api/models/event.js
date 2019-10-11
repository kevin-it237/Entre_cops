const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Object, required: true },
    place: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: Array, required: true },
    video: { type: String, required: false },
    tags: { type: String, required: false },
    reservations: { type: Array, required: false },
    otherInfos: { type: String, required: false },
    youtubeVideoLink: { type: String, required: false },
    comments: { type: Object, required: false },
    coupons: { type: Object, required: false },
    rate: { type: Object, required: false },
    validated: { type: Boolean, required: true },
    date: { type: Date, required: false },
    createdAt: { type: Date, required: false }
})

module.exports = mongoose.model('Event', eventSchema);