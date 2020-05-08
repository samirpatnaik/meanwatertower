const mongoose = require('mongoose');

var bannerschema = mongoose.Schema({
    image : {data: String, contentType: String},
    display_order : {type : Number, required: true}
});

var SlideBanner = mongoose.model('banner',bannerschema);

module.exports = SlideBanner;