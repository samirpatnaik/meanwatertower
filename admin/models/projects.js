var connection = require('../common/connection')
var ProjectSection = require('../schemas/projects')
var ProjectCategory = require('../schemas/projectcategory')
var fs = require('fs');
var sanitize = require('sanitize-filename');
var {ObjectID} = require('mongodb');

exports.getproject= (req,res)=> {
  ProjectSection.find({},(err,rows) =>{
    if(err) throw err;
    if(!rows.length){
      res.render('projects/list',{data:'', message:'No Record Found'});
    }else{
      res.render('projects/list',{data:rows, message:''});
    }
  });
}

exports.addproject= (req,res) =>{
  ProjectCategory.find({},(err,result) =>{
    if(err) throw err
    res.render('projects/add', {catnm:result});
  });
}

exports.saveproject= (req,res)=>{
  if(!req.files.banner){
      res.send({
        "code": 400,
        "failed": "error occured"
      });
    } else {
      var insertrec= ProjectSection();
      
      var bannerFile = req.files.banner;
      var feature_image = Date.now()+'_'+sanitize(req.files.banner.name);
      insertrec.image.data = feature_image;
      insertrec.image.contentType = "image/jpg";
      insertrec.display_order= req.body.display_order;
      insertrec.title = req.body.title;
      insertrec.location = req.body.location;
      insertrec.catid = req.body.D1;
      insertrec.details = req.body.details.replace("'","&#39;");

      bannerFile.mv('admin/upload_project/'+ feature_image , function(err) {
        if (err) { return res.status(500).send(err);}
        
        insertrec.save((err,rec)=>{
          if(err) throw err;
          res.redirect('/admin/projects/');
          return res.render('/projects/list',{message: 'Project Added Successfully'});
        });
      });
    }
  }

// SHOW EDIT BANNER FORM
exports.editproject= (req, res)=>{

    if(!ObjectID.isValid(req.params.id)){
      res.redirect('/admin/projects/');
      return res.render('/projects/list',{message:'Project Not Found'});
    }
    ProjectSection.findById({_id:req.params.id}).populate('catid').exec((err,rows)=>{
      if(err){res.status(400).send(err)}
      if(rows){
        ProjectCategory.find({},(err,result) =>{
          if(err) throw err;
            res.render('projects/edit', {
              catnm: result,
              id: rows._id,
              bannerimage: rows.image.data,
              display_order: rows.display_order,
              title:rows.title,
              location:rows.location,
              prcatnm:rows.catid.project_category,
              prcatid:rows.catid._id,
              details:rows.details
            });
        });
      }
    });
}

exports.updateproject= (req,res) =>{

  if(!ObjectID.isValid(req.params.id)){
    res.redirect('/admin/projects/');
    return res.render('/projects/list',{message:'Project Not Found'});
  }

  var feature_image='';

  if(!req.files.banner){
    feature_image= req.body.bannerimage;
  }else {
    var filePath = 'admin/upload_project/'+ req.body.bannerimage;
    fs.unlinkSync(filePath);

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var bannerFile = req.files.banner;
    feature_image = Date.now() + '_' + sanitize(req.files.banner.name);
    bannerFile.mv('admin/upload_project/'+ feature_image, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
    });
  }

  var display_order= req.body.display_order;
  var project_title = req.body.title;
  var project_location = req.body.location;
  if(req.body.D1 != ''){
    var catid = req.body.D1;
  }
  else{
    var catid = req.body.catid;
  }
  var project_details = req.body.details.replace("'","&#39;");

  ProjectSection.update({_id:req.params.id},
                        {$set:{
                          catid:catid,
                          title:project_title,
                          location:project_location,
                          details: project_details,
                          image:{data:feature_image},
                          display_order: display_order
                        }},(err,rec) =>{
                          if(err) throw err;
                          res.redirect('/admin/projects/');
                          return res.render('/projects/list',{message:'Project Updated Successfully'});
                        });
}

exports.deleteproject= (req,res) =>{

  if(!ObjectID.isValid(req.params.id)){
    res.redirect('/admin/projects/');
    return res.render('/projects/list',{message:'Project Not Found'});
  }

  ProjectSection.findOneAndRemove({_id:req.params.id},(err,rows)=>{
    if(err) throw err;        
    var filePath = 'admin/upload_project/'+ rows.image.data;
    fs.unlinkSync(filePath);
    res.redirect('/admin/projects/');
    return res.render('/projects/list',{message:'Banner Deleted Successfully'});
  });
}
