const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    category: { type: String, required: true },
    problem: { type: String, required: true },
    offre: { type: String, required: true },
    duration: { type: String, required: true },
    target: { type: String, required: true },
    place: { type: String, required: true },
    owner: { type: Object, required: true },
    image: { type: String, required: true },
    video: { type: String, required: false },
    reservations: { type: Array, required: false },
    comments: { type: Object, required: false },
    coupons: { type: Object, required: false },
    rate: { type: Number, required: false },
    validated: { type: Boolean, required: true },
    date: { type: Date, required: false }
})

module.exports = mongoose.model('Service', serviceSchema);