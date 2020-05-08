const mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var loginschema = new Schema({
     uname:{
        type : String,
        required :  true,
        trim: true
     },
     pwd:{
         type : String,
         required : true,
         trim : true
     }
 });

 var AdminLogin = mongoose.model('admin_login', loginschema);

 module.exports = AdminLogin;