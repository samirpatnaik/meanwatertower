var mongoose = require('mongoose');

var planschema = new mongoose.Schema({
    details :{type: String, trim: true}
})

var PlanSection = mongoose.model('plansection_text', planschema);
module.exports = PlanSection;