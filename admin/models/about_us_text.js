var connection = require('../common/connection')
var AboutUsSection = require('../schemas/aboutustext');

exports.fetchaboutuscontent = (req,res) => {
  AboutUsSection.find({},(err,rec) =>{
    if(err){ res.status(400).send(err)}
    if(!rec.length){
      res.render('about_us_text',{details:'',rid:'', message:''});
    }
    else{
      var content = rec[0].details.replace("'","&#39;");
      res.render('about_us_text',{details:content,rid:rec._id, message:''});
    }
  })
}

exports.saveaboutuscontent = (req,res)=>{

  var content = req.body.details.replace("'","&#39;");
  var rid =  req.body.rid;

  if(rid != ''){
    AboutUsSection.update({_id:rid}, {details:content},(err,result)=>{
      if(err){ res.status(400).send(err)}
      if(result){
        res.render('about_us_text',{details:content,rid: rid, message:'Content Updated Successfully'});
      }
    });
  }
  else{
      var aboutsec = AboutUsSection();
      aboutsec.details = content;
      aboutsec.save((err,result) =>{
        if(err) { res.status(400).send(err)}
        if(result){
          return res.render('about_us_text',{details:content,rid:result._id, message:'Content Inserted Successfully'});
        }
      })
  }
}
