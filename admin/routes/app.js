var express = require('express');
var router = express.Router();
var mongoose = require('../common/connection');
var nodemailer = require('nodemailer');

var User = require('../models/user');
var changepwd = require('../models/changepassword');
var slidebanner = require('../models/slidebanner');
var homepagetext = require('../models/home_page_text');
var plansectiontext = require('../models/plan_section_text');
var designsectiontext = require('../models/design_section_text');
var buildsectiontext = require('../models/build_section_text');
var aboutustext = require('../models/about_us_text');
var projectcategory = require('../models/projects_category');
var projects = require('../models/projects');
var team = require('../models/team');
var contact_info = require('../models/contact_info');
var projects_gallery = require('../models/projects_gallery');
var service_gallery = require('../models/service_gallery');
var FroalaEditor = require('../public/lib/froalaEditor.js');
var isNull = require('is-null-or-empty');
var app = express();

/**
 * This module let us use HTTP verbs such as PUT or DELETE
 * in places where they are not supported
 */
var methodOverride = require('method-override');

/**
 * using custom logic to override method
 *
 * there are other ways of overriding as well
 * like using header & using query value
 */
app.use(methodOverride("_method"));

router.get('/', (req, res) => {
  res.render('index.hbs', {message:''});
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        res.redirect('/admin');
        return res.render('index.hbs');
      }
    });
  }
});

router.get('/inner', function (req, res) {
  sess = req.session;
  if(sess.uname) {
    res.render('inner.hbs');
  }
  else {
    res.redirect('/admin');
    return res.render('index.hbs');
  }
});

// Define authentication middleware BEFORE your routes
var authenticate = function (req, res, next) {
  // your validation code goes here.
  sess = req.session;
  if(sess.uname) {
    next();
  }
  else {
    // redirect user to authentication page or throw error or whatever
    res.redirect('/admin');
    return res.render('index.hbs');
  }
}


/*CREATING REST API FOR FRONT END ANGULAR 4*/

//Fetch records from Database
router.get("/aboutus",function(req,res){
  connection.query("select details from aboutus_text where siteid='wt'",function(err,recordsArray,fields){
    res.send(recordsArray);
  });
});

router.post('/service_gallery',authenticate, service_gallery.deletegallery);
router.get('/service_gallery', authenticate, service_gallery.loadpage);
router.get('/service_gallery/:id', authenticate, service_gallery.fetchgallery);
router.post('/service_gallery/:id', authenticate, service_gallery.addgallery);

router.post('/projects_gallery',authenticate, projects_gallery.deletegallery);
router.get('/projects_gallery', authenticate, projects_gallery.loadpage);
router.get('/projects_gallery/:id', authenticate, projects_gallery.fetchgallery);
router.post('/projects_gallery/:id', authenticate, projects_gallery.addgallery);

router.get('/contact_info',authenticate, contact_info.fetchcontactinfo);
router.post('/contact_info',authenticate, contact_info.savecontactinfo);

router.get('/team',authenticate, team.getteam);
router.get('/team/add',authenticate, team.addteam);
router.post('/team/add',authenticate, team.saveteam);
router.get('/team/edit/:id',authenticate, team.editteam);
router.post('/team/edit/:id',authenticate, team.updateteam);
router.post('/team/delete/:id',authenticate, team.deleteteam);

router.get('/projects',authenticate, projects.getproject);
router.get('/projects/add',authenticate, projects.addproject);
router.post('/projects/add',authenticate, projects.saveproject);
router.get('/projects/edit/:id',authenticate, projects.editproject);
router.post('/projects/edit/:id',authenticate, projects.updateproject);
router.post('/projects/delete/:id',authenticate, projects.deleteproject);

router.get('/project_category',authenticate, projectcategory.getcategory);
router.get('/project_category/add',authenticate, projectcategory.addcategory);
router.post('/project_category/add',authenticate, projectcategory.savecategory);
router.get('/project_category/edit/:id',authenticate, projectcategory.editcategory);
router.post('/project_category/edit/:id',authenticate, projectcategory.updatecategory);
router.post('/project_category/delete/:id',authenticate, projectcategory.deletecategory);

router.get('/about_us_text',authenticate, aboutustext.fetchaboutuscontent);
router.post('/about_us_text',authenticate, aboutustext.saveaboutuscontent);

router.get('/design_section_text',authenticate, designsectiontext.fetchdesigncontent);
router.post('/design_section_text',authenticate, designsectiontext.savedesigncontent);

router.get('/build_section_text',authenticate, buildsectiontext.fetchbuildcontent);
router.post('/build_section_text',authenticate, buildsectiontext.savebuildcontent);

router.get('/plan_section_text',authenticate, plansectiontext.fetchplancontent);
router.post('/plan_section_text',authenticate, plansectiontext.saveplancontent);

router.get('/home_page_text',authenticate, homepagetext.fetchhomeinfo);
router.post('/home_page_text',authenticate, homepagetext.addhomeinfo);

router.get('/slidebanner',authenticate, slidebanner.getbanner);
router.get('/slidebanner/add',authenticate, slidebanner.addbanner);
router.post('/slidebanner/add',authenticate, slidebanner.savebanner);
router.get('/slidebanner/edit/:id',authenticate, slidebanner.editbanner);
router.post('/slidebanner/edit/:id',authenticate, slidebanner.updatebanner);
router.post('/slidebanner/delete/:id',authenticate, slidebanner.deletebanner);

router.get('/changepassword',authenticate, changepwd.showpage);
router.post('/changepassword',authenticate, changepwd.updatepwd);

router.post('/',User.login);
//router.post('/',User.newuser);


module.exports = router;

/**
***********************************
REST API SET UP
***********************************
**/

//Fetch records from Slide Banner
router.get("/homebanner",function(req,res){
  connection.query("select * from banner where siteid='g2' order by display_order",function(err,recordsArray,fields){
    res.send(recordsArray);
  });
});

//Fetch records from About Us
router.get("/aboutus",function(req,res){
  connection.query("select * from aboutus_text where siteid='wt'",function(err,recordsArray,fields){
    res.send(recordsArray);
  });
});

//Fetch records from Team
router.get("/teamsection",function(req,res){
  connection.query("select * from team where siteid='wt' order by display_order",function(err,recordsArray,fields){
    res.send(recordsArray);
  });
});

//Fetch records from Build Section Text
router.get("/buildsection",function(req,res){
  connection.query("select * from buildsection_text where siteid='wt'",function(err,recordsArray,fields){
    res.send(recordsArray);
  });
});

//Fetch records from Design Section Text
router.get("/designsection",function(req,res){
  connection.query("select * from designsection_text where siteid='wt'",function(err,recordsArray,fields){
    res.send(recordsArray);
  });
});

//Fetch records from Plan Section Text
router.get("/plansection",function(req,res){
  connection.query("select * from plansection_text where siteid='wt'",function(err,recordsArray,fields){
    res.send(recordsArray);
  });
});

//Fetch records from Service Gallery
router.get("/servicegallery",function(req,res){
  connection.query("select * from service_gallery where siteid='wt'",function(err,recordsArray,fields){
    res.send(recordsArray);
  });
});

//Fetch records from Project SECTION
router.get("/project",function(req,res){
  connection.query("SELECT * FROM projects where siteid='wt' order by display_order",function(err,recordsArray,fields){
    res.send(recordsArray);
  });
});

//Fetch records from Project SECTION

router.get("/projectdtls/:id",function(req,res){
    connection.query("SELECT a.title,a.location,a.details,b.imgnm FROM projects as a , project_gallery as b where a.id = " + req.params.id + " and a.siteid='wt' and a.id=b.pid",function(err,recordsArray,fields){
    res.send(recordsArray);
  });
});



//Fetch records from Contact Section Text
router.get("/contactsection",function(req,res){
  connection.query("select * from contact_info where siteid='wt'",function(err,recordsArray,fields){
    res.send(recordsArray);
  });
});

router.post('/sendMail', function (req,res) {

  var smtpTransport = nodemailer.createTransport("SMTP", {
    host: "smtp.watertowerstudio.com", // hostname
    secureConnection: false, // use SSL
    port: 587, // port for secure SMTP
    auth: {
      user: "noreply@watertowerstudio.com",
      pass: "Admin@1234567"
    }
  });

  var mailOptions = {
    from: req.body.email, // sender address
    to: "Water Tower <samir.freelancer@gmail.com>", // list of receivers
    subject: "Contact Through Water Tower", // Subject line
    html: "<b>First Name</b> :" + req.body.fname + "<br><b>Last Name</b> :" + req.body.lname + "<br><b>Email</b> :" + req.body.email  + "<br><b>Phone</b> :" + req.body.phone + "<br><b>Message</b> : <br>" + req.body.message// html body
  };

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
  });
})
