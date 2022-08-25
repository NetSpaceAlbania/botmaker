const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: false },
    last_input_confess_date: {type: Number,  required: false}
});

const DiscordUser = module.exports = mongoose.model('User', UserSchema);