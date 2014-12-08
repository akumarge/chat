/**
 * Module dependencies.
 */

var express=require('express'),
   consolidate=require('consolidate'),
   bodyParser=require('body-parser'),
   morgan=require('morgan'),
   mongoose=require('mongoose'),
   passport=require('passport'),
   LocalStrategy = require('passport-local').Strategy,
   path=require('path'),
   swig=require('swig'),
   http=require('http'),
   app=express(),
   server=http.createServer(app),
   userModel=require('./app/models/user.model.js').user_details,
   user_det='';
   //auth=require('./app/controllers/user.controller.js');

   //mongodb connection with mongoose
   mongoose.connect('mongodb://localhost/tutorial');

  // set the SWIG template engine
  app.engine('html',consolidate.swig);
  app.set('view engine','html');
  app.set('views',__dirname+'/public/views');
  app.set('port',process.env.PORT || 8000);
  app.use(express.static(path.join(__dirname, 'public/views')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
    
//passport login authendication
passport.use(new LocalStrategy(function(login_useremail, login_userpassword, done) {
  /*console.log(login_useremail);
  console.log(login_userpassword);*/
  process.nextTick(function() {
    userModel.findOne({
      'email': login_useremail, 
      'password':login_userpassword,
    }, function(err, user) {
        if (err) {
          return done(err);
      }
 
      if (!user) {
        return done(null, false);
      }else{
        //console.log(user);
         return done(null, user);
      }
 
     
    });
  });
}));

passport.serializeUser(function(user, done) {
  //console.log(user.email);
  user_det=user;
  done(null, user);
});

passport.deserializeUser(function(email, done) {
  userModel.find({email:email}, function (err, user) {
   //console.log(user);
    //user_det=user;
    //console.log(user_det.name);
    done(err, user);

  });
});

//routing
app.get('/',function(req,res){
  res.render('index');
}); 

//signup with inserting user data into mongodb
app.post('/',function(req,res){

  var userName=req.body.user_name,
     userPassword=req.body.user_password,
     userEmail=req.body.user_email,
     userMobile=req.body.user_mobile;

     var user_details= new userModel({
      name : userName,
      password:userPassword,
      email:userEmail,
      mobile:userMobile
    });
    //insert user details into the mongodb
    user_details.save(function (err, data) {
      if (err) console.log(err);
      else console.log('Saved : ', data );
    });

    res.redirect('/');
});


app.post('/login',passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/loginFailure'
  })
);


app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});
 
app.get('/home', function(req, res, next) {
 //var userEmail=req.body.username;
 //console.log(userEmail);
  /*userModel.find({name:'bharath'}, function(err,users){
        console.log(users.name);
      });
  */
 /* userModel.statics.findByName = function (email, cb) {
  this.find({ email:email }, cb);
}

userModel.findByName(userEmail, function (err, users) {
  console.log(users);
});*/
 //console.log(user_det.name);
 res.render('home',{user:user_det});
});

app.post('/update',function(req,res){
   var userName=req.body.edit_user_name,
     userPassword=req.body.edit_user_password,
     userEmail=req.body.edit_user_email,
     userMobile=req.body.edit_user_mobile,
     userEmailHidden=req.body.user_email_hidden;
     console.log(userEmailHidden);
  var conditions = { email: userEmailHidden },
      update = { $set: { 
                            name:userName ,
                            password:userPassword,
                            email:userEmail,
                            mobile:userMobile
                        }
                },
      options = { upsert: true };   
  userModel.update(conditions, update, options, function(req,res){

      userModel.find({email:userEmail}, function(err,user){
       user_det = user[0];
      });


  });
    res.send(req.body);
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
//server listening on port 8000
server.listen(app.get('port'),function(){
  console.log('Server is listening in port '+app.get('port'));
});


module.exports=app;