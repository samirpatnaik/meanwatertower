var connection = require('../common/connection')
var ContactInfo = require('../schemas/contactinfo')

exports.fetchcontactinfo = (req,res) =>{
  ContactInfo.find({}, (err,rows) =>{
    if(err){ res.status(400).send(err) }
    if(!rows.length){
      res.render('contact_info',
      {
        details:'',
        heading: '',
        subheading:'',
        phone:'',
        phone1:'',
        email:'',
        social1:'',
        social2:'',
        social3:'',
        social4:'',
        rid:'',
        message:''});
    }
    else{
      var content		=	rows[0].details.replace("'","&#39;");
      res.render('contact_info',
                  {
                    details:content,
                    heading: rows[0].heading,
                    subheading:rows[0].subheading,
                    phone:rows[0].phone,
                    phone1:rows[0].phone1,
                    email:rows[0].email,
                    social1:rows[0].social1,
                    social2:rows[0].social2,
                    social3:rows[0].social3,
                    social4:rows[0].social4,
                    rid: rows[0]._id,
                    message:''});
    }
  });
}

exports.savecontactinfo = (req,res) =>{

  var content = req.body.details.replace("'","&#39;");
  var heading = req.body.heading_text;
  var subheading= req.body.subheading_text;
  var phone= req.body.phone_text;
  var phone1= req.body.phone_text1;
  var email= req.body.email_text;
  var social1 = req.body.social1;
  var social2 = req.body.social2;
  var social3 = req.body.social3;
  var social4 = req.body.social4;
  var rid = req.body.rid;
  
 if(rid != '')
 {
    ContactInfo.update(
      {_id: rid}, 
      {heading:heading, subheading:subheading, phone:phone, phone1:phone1, 
        email: email, details: content, social1: social1, social2: social2, social3: social3 }, 
        (err,rec) =>{
      if(err){ res.status(400).send(err)}
      res.render('contact_info',
      {
        details:content,
        heading: heading,
        subheading:subheading,
        phone:phone,
        phone1:phone1,
        email:email,
        social1:social1,
        social2:social2,
        social3:social3,
        social4:social4,
        rid: rid,
        message:'Content Updated Successfully'})
    })
  }
  else{
    var contactdata = ContactInfo();
    contactdata.details = content;
    contactdata.heading = heading;
    contactdata.subheading = subheading;
    contactdata.phone = phone;
    contactdata.phone1 = phone1;
    contactdata.email = email;
    contactdata.social1 = social1;
    contactdata.social2 = social2;
    contactdata.social3 = social3;
    contactdata.social4 = social4;
    contactdata.save((err,rec) => {
      if(err){ res.status(400).send(err)}
      res.render('contact_info',
      {
        details:content,
        heading: heading,
        subheading:subheading,
        phone:phone,
        phone1:phone1,
        email:email,
        social1:social1,
        social2:social2,
        social3:social3,
        social4:social4,
        rid: rec._id,
        message:'Content Inserted Successfully'})
    })
  }
}
