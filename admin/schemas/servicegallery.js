var mongoose = require('mongoose');

var servicegalleryschema = mongoose.Schema({
    sid : {type : String},
    imgnm: {data : String, contentType: String}
});

var ServiceGallery = mongoose.model('service_gallery', servicegalleryschema);

module.exports= ServiceGallery;