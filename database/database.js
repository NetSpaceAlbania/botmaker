const mongoose = require('mongoose');
require('dotenv').config();
const mongoose_uri = process.env.MONGOOSE_URI;
module.exports = mongoose.connect(mongoose_uri,
{ useNewUrlParser: true, useUnifiedTopology: true });