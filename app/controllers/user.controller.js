
var mongoose=require('mongoose'),
    userModel=require('../models/user.model.js').user_details;
console.log(2);
passport.use(new LocalStrategy(function(login_username, login_userpassword, done) {
	console.log(login_username);
	console.log(login_userpassword);
  console.log(3);

  process.nextTick(function() {
    userModel.findOne({
      'email': login_username, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }
 
      if (!user) {
        return done(null, false);
      }
 
      if (user.password != login_userpassword) {
      	
        return done(null, false);
      }
 
      return done(null, user);
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});
 
app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});