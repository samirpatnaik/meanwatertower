var mongoose = require('mongoose');

var designschema = new mongoose.Schema({
    details :{type: String, trim: true}
})

var DesignSection = mongoose.model('designsection_text', designschema);
module.exports = DesignSection;