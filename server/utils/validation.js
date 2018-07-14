const validator = require('validator');


function isEmail(email){
  return email && typeof email === 'string' && validator.isEmail(email);
}

function isPassword(password){
  return password && typeof password === 'string' && password.trim().length > 8;
}

function isUsername(username){
  return username && typeof username === 'string' && username.trim().length < 16 && username.trim().length > 8;
}



module.exports={
  isEmail,isPassword,isUsername
}
