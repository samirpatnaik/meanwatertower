var mongoose  = require('mongoose');

var aboutschema = new mongoose.Schema({
    details : {type: String, required : true, trim : true}
});

var AboutUsSection = mongoose.model('aboutus_text',aboutschema);
module.exports= AboutUsSection;