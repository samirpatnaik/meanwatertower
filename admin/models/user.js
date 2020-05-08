var mongoose = require('../common/connection');
var AdminLogin = require('../schemas/adminlogin');

exports.login = (req,res) => {
  var username= req.body.uname;
  var password = req.body.pwd;
  var sess;
  AdminLogin.findOne({uname:username, pwd:password},(error, results) =>{
      if(error){
        return res.status(400).send(error);
      }
      //return res.send(results);
      if(!results){
       return res.render('index.hbs', {message: 'Incorrect username or password'});
      }
      if(results){
        sess = req.session;
        sess.uname=results._id;
        res.redirect('inner');
      }
  });
}

/*exports.newuser = (req,res) =>{
 
  var newUser = AdminLogin();
  newUser.uname = 'admin';
  newUser.pwd ="manager"

  newUser.save((err, savedUser)=>{
    if(err){
      comsole.log(err);
      res.status(500).send();
    }

    return res.status(200).send();
  })
}*/
