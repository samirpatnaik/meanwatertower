var connection = require('../common/connection')
var ServiceGallery = require('../schemas/servicegallery')
var fs = require('fs');
var sanitize = require('sanitize-filename');
var {ObjectID} = require('mongodb')

exports.loadpage= (req,res) =>{
  ServiceGallery.find({},(err,rec) =>{
      if(err){res.status(400).send(err)}
      return res.render('service_gallery.hbs', {rec:'', serid:'', message:''});
  });
}

exports.addgallery= (req,res) =>{

  if(!req.files.banner){
      res.send({
        "code": 400,
        "failed": "error occured"
      });
    } else {
        var serid = req.body.D1;
        var uploadedImages = Array.isArray(req.files.banner) ? req.files.banner : [req.files.banner];

        uploadedImages.forEach(function (value) {
          var gallery_image = Date.now() + '_' + sanitize(value.name);

          value.mv('admin/upload_gallery/' + gallery_image, function (err) {
            if (err) {
              return res.status(500).send(err);
            }
            var gallerydata = ServiceGallery();
            gallerydata.sid = serid;
            gallerydata.imgnm.data  = gallery_image;
            gallerydata.imgnm.contentType = "image/jpg";
            gallerydata.save((err,rec) =>{
                if(err){ res.status(400).send(err)}
                if(rec){
                  res.redirect('/admin/service_gallery/')
                  return res.render('service_gallery.hbs', {rec:'', serid:'', message: 'Image Uploaded Successfully'});
                }
            });
          });
        });
    }
  }

// SHOW GALLERY
exports.fetchgallery= (req, res) =>{
    ServiceGallery.find({sid : req.params.id},(err,rows)=>{
      if(err) { res.status(400).send(err)}
      if(rows){
        return res.render('service_gallery.hbs', {
          serid:req.params.id,
          rec:rows,
          message:''
        });
      }
      else{
        return res.render('service_gallery.hbs',{erid:req.params.id,rec:'',message:'Project Not Found'});
      }
    });
}

exports.deletegallery= (req,res) =>{

  if(!ObjectID.isValid(req.body.delid)){
    return res.render('service_gallery.hbs',{message:'Project Not Found'});
  }else{

    ServiceGallery.findByIdAndRemove(req.body.delid,(err,rows)=>{
      if(err){ res.status(400).send(err)}
      if(rows){
        var filePath = 'admin/upload_gallery/'+ rows.imgnm.data;
        fs.unlinkSync(filePath);
        return res.render('service_gallery.hbs',{message:'Image Deleted Successfully'});
      }
      
    });
  }
}


