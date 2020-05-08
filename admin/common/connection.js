const mongoose = require('mongoose');

//Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/watertower', {useMongoClient: true});

module.exports = mongoose;
