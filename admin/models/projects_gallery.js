var connection = require('../common/connection')
var fs = require('fs');
var sanitize = require('sanitize-filename');


exports.loadpage=function (req,res){
  connection.query("select id,title from projects where siteid='wt'", function(err,result){
    if(err) throw err.message
    res.render('projects_gallery', {prjnm:result, rec:'', prjid:''});
  });
}

exports.addgallery=function (req,res,next){

  if(!req.files.banner){
      res.send({
        "code": 400,
        "failed": "error occured"
      });
    } else {
        var prjid = req.body.D1;
        var uploadedImages = Array.isArray(req.files.banner) ? req.files.banner : [req.files.banner];

        uploadedImages.forEach(function (value) {
          var gallery_image = Date.now() + '_' + sanitize(value.name);

          value.mv('admin/upload_gallery/' + gallery_image, function (err) {
            if (err) {
              return res.status(500).send(err);
            }
            var insertsql = "insert into project_gallery set pid= ?, imgnm=?, siteid='wt'";
            connection.query(insertsql, [prjid, gallery_image], function (err) {
              if (err) throw err;

              connection.query("select id,title from projects where siteid='wt'", function(err,result){
                if(err) throw err.message
                res.render('projects_gallery', {prjnm:result, rec:'', prjid:''});
              });

            });
          });
        });
    }
  }

// SHOW GALLERY
exports.fetchgallery= function(req, res){

    var someVar = [];
    connection.query('SELECT * FROM project_gallery WHERE pid = ' + req.params.id, function(err, rows, fields) {
      if(err) throw err

      // if user not found
      if (rows.length <= 0) {
        req.flash('error', 'Project Gallery not found with id = ' + req.params.id)
        res.redirect('/admin/projects_gallery/');
        return res.render('projects_gallery',{message:'Project Not Found'});
      }
      else { // if user found
        connection.query("select id,title from projects where siteid='wt'", function(err,result){
          if(err) throw err
          res.render('projects_gallery', {
            prjnm:result,
            prjid:req.params.id,
            rec:rows
          });
        });


      }
    });
}



exports.deletegallery=function (req,res,next){

  connection.query('SELECT * FROM project_gallery WHERE slno = ' + req.body.delid, function(err, rows, fields) {
    if(err) throw err

    // if user not found
    if (rows.length <= 0) {
      req.flash('error', 'Gallery not found with id = ' + req.body.delid)
      res.redirect('/admin/projects_gallery/');
      return res.render('/projects_gallery',{message:'Project Not Found'});
    }
    else { // if user found

      var filePath = 'admin/upload_gallery/'+ rows[0].imgnm;
      fs.unlinkSync(filePath);

      connection.query('delete from project_gallery where slno = ' + req.body.delid, function(err,rows){
        if(err) throw err;
        res.redirect('/admin/projects_gallery/');
        return res.render('/projects_gallery',{message:'Image Deleted Successfully'});
      });
    }
  });
}


