var connection = require('../common/connection')
var DesignSection = require('../schemas/designsectiontext')

exports.fetchdesigncontent = (req,res) =>{
  DesignSection.find({}, (err,rec) => {
    if(err){
      return res.status(400).send(err);
    }
    if(!rec.length){
      return res.render('design_section_text.hbs',{details:'',rid:'',message:''});
    }else{
      var content = rec[0].details.replace("'","&#39;");
      res.render('design_section_text',{details:content, rid: rec[0]._id, message:''});
    }
  });
}

exports.savedesigncontent = (req,res) =>{

  var content = req.body.details.replace("'","&#39;");
  var rid = req.body.rid;

  if(rid != ''){
    DesignSection.update({_id:rid}, {details:content},(err,result)=>{
      if(err){ res.status(400).send(err)}
      if(result){
        res.render('design_section_text',{details:content,rid: rid, message:'Content Updated Successfully'});
      }
    });
  }
  else{
      var designsec = DesignSection();
      designsec.details = content;
      designsec.save((err,result) =>{
        if(err) { res.status(400).send(err)}
        if(result){
          return res.render('design_section_text',{details:content,rid:result._id, message:'Content Inserted Successfully'});
        }
      })
  }

}
