var mongoose = require('mongoose');

var prjcategoryschema = mongoose.Schema({
    project_category:{type: String, required: true, trim :  true},
    display_order:{type: Number}
});

var ProjectCategory = mongoose.model('project_category', prjcategoryschema);

module.exports = ProjectCategory;