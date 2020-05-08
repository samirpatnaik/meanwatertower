var connection = require('../common/connection')
var PlanSection = require('../schemas/plansectiontext')

exports.fetchplancontent = (req,res) =>{
  PlanSection.find({},(err, rows) => {
    if(err){ return res.status(400).send(err)}
    
    if(!rows.length){
      return res.render('plan_section_text',{details:'', rid : '', message:''});
    }
    else{
      var content		=	rows[0].details.replace("'","&#39;");
      return res.render('plan_section_text',{details:content, rid : rows[0]._id, message:''});
    }
  })
}

exports.saveplancontent = (req,res) =>{
  var content = req.body.details.replace("'","&#39;");
  var rid = req.body.rid;
  if(rid != ''){
    PlanSection.update({_id:rid},{details : content},(err,result) =>{
      if(err){ res.status(400).send(err)}
      if(result){
        return res.render('plan_section_text',{details:content,rid:rid, message:'Content Updated Successfully'});
      }
    });
  }else{
    var plansec = PlanSection();
    plansec.details = content;
    plansec.save((err, result) =>{
      if(err){ res.status(400).send()}
      if(result){
        return res.render('plan_section_text',{details:content,rid:result._id, message:'Content Inserted Successfully'});
      }
    });
  }
}
