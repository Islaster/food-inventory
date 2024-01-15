module.exports={
    auth,
    callback
}

const passport = require('passport');

function auth(){
    passport.authenticate('google', { scope : ['profile', 'email'] });
}

function callback(req, res){
    passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  }
}