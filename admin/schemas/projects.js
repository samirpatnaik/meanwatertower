var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectschema = mongoose.Schema({
    catid : {type: Schema.Types.ObjectId, ref:'project_category'},
    title : {type : String, trim: true, required: true},
    location : {type : String, trim: true, required: true},
    details : {type : String, trim: true, required: true}, 
    image : {data : String,  contentType: String},
    display_order : {type : String}
});

var ProjectSection = mongoose.model('projects',projectschema);
module.exports = ProjectSection;
