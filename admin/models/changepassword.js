var connection = require('../common/connection')
var AdminLogin = require('../schemas/adminlogin')

exports.showpage = (req,res) => {
 return res.render('changepassword.hbs', {username: 'admin', message : ''});
}

exports.updatepwd = (req,res)=> {
  var uname = req.body.uname;
  var pwd = req.body.oldpwd;
  var newpwd = req.body.newpwd;

  AdminLogin.findOne({uname:uname, pwd : pwd},(error, rec)=>{
      if(error){
        return res.status(400).send(error);
      }

      if(!rec){
        return res.render('changepassword.hbs',{username: 'admin', message: 'Invalid Login Credential'})
      }
      else
      {
        AdminLogin.update({_id : rec._id}, {$set:{pwd:newpwd}},(err, result) =>{
            if(error){
              return res.status(400).send(error);
            }
            if(result){
              return res.render('changepassword.hbs',{username: 'admin', message: 'Password Updated Successfully'})
            }
        });
      }
  });
}
