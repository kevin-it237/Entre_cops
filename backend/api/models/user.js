const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false },
    tel: { type: Number, required: false },
    localisation: { type: String, required: false },
    services: { type: String, required: false },
    supplierAccountValidated: { type: Boolean, required: false },
    otherInfos: { type: String, required: false },
    role: { type: String, required: true },
    date: { type: Date, required: false },
})

module.exports = mongoose.model('User', userSchema)