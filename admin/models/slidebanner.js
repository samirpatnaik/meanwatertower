var connection = require('../common/connection')
var SlideBanner = require('../schemas/slidebanner')

var fs = require('fs');
var sanitize = require('sanitize-filename');
var {ObjectID} = require('mongodb')

exports.getbanner= (req,res) => {
      SlideBanner.find({}, null, {sort: {display_order: 1}}, (err, rec) => { 
        if(err){
          return res.status(400).send(err)
        }
        if(!rec.length){
            return res.render('slidebanner/list.hbs',{data:'', message:'No Record Found'});
        }
        else
        {
            return res.render('slidebanner/list.hbs',{data:rec, message:''});
        }
      });
}

exports.addbanner=(req,res) =>{
  res.render('slidebanner/add');
}

exports.savebanner=(req,res) => {
  if(!req.files){
      res.send({
        "code": 400,
        "failed": "error occured"
      });
    } else {

      var slidebanner = SlideBanner();
      
      var bannerFile = req.files.banner;
      var newbannerFilePath =  Date.now()+'_'+sanitize(req.files.banner.name);
     
      bannerFile.mv('admin/upload_banner/'+newbannerFilePath, (err) => {
        if (err) { return res.status(400).send(err);}
        slidebanner.image.data = newbannerFilePath;
        slidebanner.image.contentType = 'image/jpg';
        slidebanner.display_order= req.body.display_order;
        slidebanner.save((err,result) => {
          if (err) { return res.status(500).send(err);}
          if(result){
            res.redirect('/admin/slidebanner/');
            return res.render('slidebanner/list.hbs',{message: 'Banner Added Successfully'});
          }
        });
        
      });
    }
  }

// SHOW EDIT BANNER FORM
exports.editbanner= (req, res) =>{
    var eid= req.params.id;
    if(!ObjectID.isValid(eid)){
      res.redirect('/admin/slidebanner/');
      return res.render('slidebanner/list.hbs',{message:'Banner Details Not Found'});
    }
    SlideBanner.findById(eid,(err,rec) => {
        if(err){
          return res.status(400).send(err);
        }
        res.render('slidebanner/edit.hbs', {
          title: 'Edit Banner',
          id: rec._id,
          bannerimage: rec.image.data,
          display_order: rec.display_order
        });
    });
    
}

exports.updatebanner= (req,res) =>{
  var Bannername='';

  if(!req.files.banner){
    Bannername= req.body.bannerimage;
  }else {
    var filePath = 'admin/upload_banner/'+ req.body.bannerimage;
    fs.unlinkSync(filePath);

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var bannerFile = req.files.banner;
    Bannername = Date.now() + '_' + sanitize(req.files.banner.name);
    bannerFile.mv('admin/upload_banner/'+ Bannername, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    });
  }
  var display_order= req.body.display_order;
  SlideBanner.update({_id : req.body.id},{$set:{image:{data:Bannername}, display_order:display_order}},(err,rec) =>{
      if(err){ return res.status(400).send(err)}
      if(rec){
        res.redirect('/admin/slidebanner/');
        return res.render('slidebanner/list.hbs',{message:'Banner Updated Successfully'});
      }
  });
 
}

exports.deletebanner= (req,res) => {
  var delid = req.params.id;
  if(!ObjectID.isValid(delid)){
    res.redirect('/admin/slidebanner/');
    return res.render('/slidebanner.hbs',{message:'Banner Not Found'});
  }
   SlideBanner.findById(delid,(err,rec) =>{
      if(err){ res.status(400).send()}
      if(rec){
        var filePath = 'admin/upload_banner/'+ rec.image.data;
        fs.unlinkSync(filePath);

        SlideBanner.remove({_id: delid},(err,result) =>{
            if(err){ res.status(400).send()}
            if(result){
              res.redirect('/admin/slidebanner/');
              return res.render('slidebanner/list.hbs',{message:'Banner Deleted Successfully'});
            }
        });
      }
   });
}
