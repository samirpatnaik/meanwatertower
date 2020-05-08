var connection = require('../common/connection')

exports.fetchhomeinfo=function(req,res){
  connection.query("select * from homepage_text where siteid='wt'",function (error,rows) {
    if(error) throw error;
    res.render('home_page_text',{
                pageHeading:rows[0].pageheading,
                pageKeyword:rows[0].pagekeyword,
                Description:rows[0].description,
                pageTitle:rows[0].pagetitle,
                message:''});
  });
}

exports.addhomeinfo=function(req,res){
  var info = {
    pageheading : req.sanitize('pageheading').escape().trim(),
    pagekeyword : req.sanitize('pagekeyword').escape().trim(),
    description : req.sanitize('description').escape().trim(),
    pagetitle : req.sanitize('pagetitle').escape().trim()
  };

 connection.query("UPDATE homepage_text set ? where siteid='wt'",info,function (error,result) {
    if(error) throw error;
    res.render('home_page_text',{
      pageHeading : info.pageheading,
      pageKeyword : info.pagekeyword,
      Description : info.description,
      pageTitle : info.pagetitle,
      message : 'Record Updated Successfully'
    });
 });
}
