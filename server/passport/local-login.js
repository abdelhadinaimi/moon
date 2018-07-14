const PassportLocalStrategy = require('passport-local').Strategy;


module.exports = new PassportLocalStrategy({
  usernameField: 'email'
},(username,password, done) => {
    return done(null,username);
});
