var connection = require('../common/connection')
var TeamSection = require('../schemas/teamsection')
var fs = require('fs');
var sanitize = require('sanitize-filename');
var {ObjectID} = require('mongodb')

exports.getteam= (req,res) => {
  TeamSection.find({},(err,rec) => {
    if(err){err.status(400).send(err)}
    if( !rec.length){
      res.render('team/list',{data:'', message:'No Record Found'});
    }
    else{
      res.render('team/list',{data: rec, message:''});
    }
  });
}

exports.addteam=function (req,res){
  res.render('team/add');
}

exports.saveteam= (req,res) =>{
  if(!req.files.banner){
      res.send({
        "code": 400,
        "failed": "error occured"
      });
    } else {
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      var bannerFile = req.files.banner;
      var feature_image = Date.now()+'_'+sanitize(req.files.banner.name);
      var display_order= req.body.display_order;
      var title = req.body.title;
      var designation = req.body.designation;
      var experience = req.body.experience;
      var details = req.body.details.replace("'","&#39;");

      bannerFile.mv('admin/upload_team/'+ feature_image , function(err) {
        if (err) { return res.status(500).send(err);}
        var teamrec = TeamSection();
        teamrec.title = title;
        teamrec.designation = designation;
        teamrec.experience = experience;
        teamrec.details = details;
        teamrec.image.data = feature_image;
        teamrec.image.contentType = 'image/jpg';
        teamrec.display_order = display_order;

        teamrec.save((err, rec)=>{
            if(err){res.status(400).send(err)}
            res.redirect('/admin/team/');
            return res.render('team/list',{message: 'Team Member Added Successfully'});
        });
      });
    }
  }

// SHOW EDIT BANNER FORM
exports.editteam= (req, res)=>{

    var someVar = [];
    var rid = req.params.id;
    if(!ObjectID.isValid(rid)){
      res.redirect('/admin/team/');
      return res.render('/team',{message: 'Invalid Details'});
    }
    TeamSection.findById(rid,(err,rows)=>{
      if(err){res.status(400).send(err)}
      res.render('team/edit', {
        bannerimage: rows.image.data,
        display_order: rows.display_order,
        rid: rows._id,
        title:rows.title,
        experience:rows.experience,
        designation:rows.designation,
        details:rows.details
      });
    });
}

exports.updateteam= (req,res)=>{
  var feature_image='';

  if(!req.files.banner){
    feature_image= req.body.bannerimage;
  }else {
    var filePath = 'admin/upload_team/'+ req.body.bannerimage;
    fs.unlinkSync(filePath);

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var bannerFile = req.files.banner;
    feature_image = Date.now() + '_' + sanitize(req.files.banner.name);
    bannerFile.mv('admin/upload_team/'+ feature_image, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
    });
  }

  var display_order= req.body.display_order;
  var title = req.body.title;
  var designation = req.body.designation;
  var experience = req.body.experience;
  var details = req.body.details.replace("'","&#39;");
  var id = req.body.id;

  TeamSection.update({_id:id},
                    {$set:{title:title, 
                          designation:designation,
                          experience:experience,
                          details:details,
                          image:{data:feature_image},
                          display_order : display_order
                          }
                    },(err,rec)=>{
    if(err){res.status(400).send(err)}
    if(rec){
      res.redirect('/admin/team/');
      return res.render('team/list',{message:'Member Updated Successfully'});
    }
  });
}

exports.deleteteam= (req,res) =>{
  var delid = req.params.id;

  if(!ObjectID.isValid(delid)){
    res.redirect('/admin/team/');
    return res.render('team/list',{message:'Member Not Found'});
  }

  TeamSection.findById(delid,(err,rec) =>{
    if(err){
      res.status(400).send(err);
    }

    if(rec) {
      var filePath = 'admin/upload_team/'+ rec.image.data;
      fs.unlinkSync(filePath);

      TeamSection.remove({_id:delid},(err,result) =>{
        if(err){
          rs.status(400).send(err);
        }
        if(result){
          res.redirect('/admin/team/');
          return res.render('team/list',{message:'Member Deleted Successfully'});
        }
      })
    }
  });
}
