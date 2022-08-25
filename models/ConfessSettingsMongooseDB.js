const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    id: { type: String, required: true },
    channel: { type: String, required: true },
    timeout: { type: Number, required: false },
    status: { type: String, required: true },
});

const serverss = module.exports = mongoose.model('ConfessSettings', Schema);