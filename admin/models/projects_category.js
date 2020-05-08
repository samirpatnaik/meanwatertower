var connection = require('../common/connection')
var ProjectCategory = require('../schemas/projectcategory')
var {ObjectID} = require('mongodb')

exports.getcategory = (req,res) =>{
  ProjectCategory.find({},(err,rec) =>{
    if(err){ res.status(400).send(err)}
    if(!rec.length){
      return res.render('project_category/list',{data:'', message:'No Record Found'});
    }
    else{
      return res.render('project_category/list',{data:rec, message:''});
    }
  });
}

exports.addcategory=function (req,res){
  return res.render('project_category/add');
}

exports.savecategory= (req,res) => {
  var category_name = req.body.catnm;
  var display_order = req.body.display_order;

  var catdata = ProjectCategory();
  catdata.project_category = category_name;
  catdata.display_order = display_order;
  catdata.save((err, rec)=>{
    if(err){ res.status(400).send(err)}
    if(rec){
      res.redirect('/admin/project_category/');
      return res.render('/project_category/list', {message: 'Category Added Successfully'})
    }
  });
}

// SHOW EDIT BANNER FORM
exports.editcategory= (req, res) =>{
  if(!ObjectID.isValid(req.params.id)){
    res.redirect('/admin/project_category/');
    return res.render('/project_category/list',{message:'Category Not Found'});
  }

  ProjectCategory.findById({_id:req.params.id},(err,rows)=>{
    if(err){ res.status(400).send(err)}
      if(rows){
       res.render('project_category/edit', {
          id: rows._id,
          categoryname: rows.project_category,
          display_order: rows.display_order
        });
      }
  });
}

exports.updatecategory= (req,res)=>{
  var category_name=req.body.catnm;
  var display_order= req.body.display_order;
  var rid = req.body.id;

  if(!ObjectID.isValid(req.body.id)){
    res.redirect('/admin/project_category/');
    return res.render('/project_category/list',{message:'Category Not Found'});
  }
  ProjectCategory.update({_id:rid},{project_category:category_name, display_order: display_order},(err,rows)=>{
    if(err) throw err;
    res.redirect('/admin/project_category/');
    return res.render('/project_category/list',{message: 'Category Updated Successfully' });
  });
}

exports.deletecategory= (req,res) =>{

  if(!ObjectID.isValid(req.params.id)){
    res.redirect('/admin/project_category/');
    return res.render('/project_category/list',{message:'Category Not Found'});
  }

  ProjectCategory.remove({_id:req.params.id},(err,rows)=>{
    if(err) throw err;
    res.redirect('/admin/project_category/');
    return res.render('/project_category/list',{message:'Category Deleted Successfully'});
  });
  
}
