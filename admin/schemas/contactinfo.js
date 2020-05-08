var mongoose = require('mongoose');

var contactschema = mongoose.Schema({
    heading : {type: String, require: true, trim: true},
    subheading : {type: String, trim: true},
    phone : {type: String, trim: true},
    phone1 : {type: String, trim: true},
    email : {type: String, trim: true},
    details : {type: String, trim: true},
    social1 : {type: String, trim: true},
    social2 : {type: String, trim: true},
    social3 : {type: String, trim: true},
    social4 : {type: String, trim: true}
});

var ContactInfo = mongoose.model('contact_info',contactschema);
module.exports = ContactInfo;