var mongoose = require('mongoose')
var Schema = mongoose.Schema

var prjgalleryschema = Schema({
    pid:{type: Schema.Types.ObjectId, ref: 'projects'},
    imgnm : {data: String, contentType : String}
});

var ProjectGallery = mongoose.model('project_gallery', prjgalleryschema);

module.exports = ProjectGallery;