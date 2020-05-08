var mongoose = require('mongoose');

var buildschema = new mongoose.Schema({
    details :{type: String, trim: true}
})

var BuildSection = mongoose.model('buildsection_text', buildschema);
module.exports = BuildSection; 