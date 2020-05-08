var mongoose = require('mongoose');

var teamschema = mongoose.Schema({
    title : {type : String, required : true, trim : true},
    designation : {type : String, required : true, trim : true},
    experience :  {type : String, required : true, trim : true},
    details :  {type : String,  trim : true},
    image :  {data : String, contentType : String },
    display_order :  {type : Number, required : true}
});

var TeamSection = mongoose.model('team',teamschema);

module.exports = TeamSection;