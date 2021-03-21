const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)