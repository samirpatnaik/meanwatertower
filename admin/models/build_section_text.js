var connection = require('../common/connection')
var BuildSection = require('../schemas/buildsectiontext')

exports.fetchbuildcontent = (req,res) =>{
  BuildSection.find({}, (err,rec) => {
    if(err){
      return res.status(400).send(err);
    }
    if(!rec.length){
      return res.render('build_section_text.hbs',{details:'',rid:'',message:''});
    }else{
      var content = rec[0].details.replace("'","&#39;");
      res.render('build_section_text',{details:content, rid: rec[0]._id, message:''});
    }
  });
}

exports.savebuildcontent = (req,res) =>{

  var content = req.body.details.replace("'","&#39;");
  var rid = req.body.rid;

  if(rid != ''){
    BuildSection.update({_id:rid}, {details:content},(err,result)=>{
      if(err){ res.status(400).send(err)}
      if(result){
        res.render('build_section_text',{details:content,rid: rid, message:'Content Updated Successfully'});
      }
    });
  }
  else{
      var buildsec = BuildSection();
      buildsec.details = content;
      buildsec.save((err,result) =>{
        if(err) { res.status(400).send(err)}
        if(result){
          return res.render('build_section_text',{details:content,rid:result._id, message:'Content Inserted Successfully'});
        }
      })
  }

}
