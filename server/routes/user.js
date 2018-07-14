const express = require('express');
const db = require('../queries');
const validator = require('validator');
const validation = require('../utils/validation');
const multer  = require('multer');
const countries = require('../data/countries');
const path = require('path');
const strings = require('../utils/strings');
const router = new express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..','uploads','profile'));
  },
  filename: function (req, file, cb) {
    cb(null,req.user);//+path.extname(file.originalname)
  }
});

var upload = multer({ storage: storage });

function getUserInfo(username){
  let data = {};
  return db.getUser(username)
    .then(user=> {
      if(!user || user.length == 0)
        return {};

      user = user[0];
      data.birthday = user.birthday;
      data.country = user.country;
      data.gender = user.gender;
      data.name = user.name;
      data.username = user.username;
      return db.getProfile(username)
      .then(profile => {
        if(!profile || profile.length == 0){
          return {};
        }
        profile = profile[0];
        data.interests = profile.interests;
        data.about = profile.about;
        return data;
      });
    })
}

router.post('/user/:id', (req, res) => {
  getUserInfo(req.params.id).then(data=>{
    if(data.username === undefined){
        res.status(404).json({error:"User not found"});
    }else{
      data.isOwner = req.isAuthenticated() && req.user === data.username;
      res.json(data);
    }
  });
});

router.post('/user/:id/edit',upload.single('photo'),(req,res)=> {
    if(req.isAuthenticated() && req.user === req.params.id){
      let validationResult = validateEditInput(req.body);
      if(!validationResult.success){
        return res.status(400).json(validationResult);
      }
      db.updateUser(req.body);
      return res.status(200).json({success:true,message:strings.success.profile});
    }else{
      return res.json({
        success: false,
        message: strings.info.authFailed
      });
    }
});

router.post('/user/:id/settings/email',(req,res)=>{

  if(req.isAuthenticated() && req.user === req.params.id){
    const {email,passwordEmail} = req.body;
    let validationInput = validateEmailInput(req.body);
    if(!validationInput.success){
      return res.status(400).json(validationInput);
    }
    return validateEmail(req.user,email,passwordEmail).then(validationResult => {
      if(validationResult.success){
        db.updateEmail(req.user,email);
        return res.json({success: true, message: strings.success.settings});
      }
      return res.json({success: validationResult.success, errors: validationResult.errors});
    });
  }else{
    return res.json({
      success: false,
      message: strings.info.authFailed
    });
  }
});
router.post('/user/:id/settings/password',(req,res)=>{
  if(req.isAuthenticated() && req.user === req.params.id){
    const {oldPassword,passwordChange1} = req.body;
    let validationInput = validatePasswordInput(req.body);
    if(!validationInput.success){
      return res.status(400).json(validationInput);
    }
    return validatePassword(req.user,oldPassword).then(validationResult => {
      if(validationResult.success){
        db.updatePassword(req.user,passwordChange1);
        return res.json({success: true, message: strings.success.settings});
      }
      return res.json({success: validationResult.success, errors: validationResult.errors});
    });
  }else{
    return res.json({
      success: false,
      message: strings.info.authFailed
    });
  }
});
function validateEmail(user,email,password){
  let errors = {};
  let success = true;
  const promises=[
    db.checkEmail(email).then(data => {
      if(data.length != 0){
        errors.email = strings.info.emailTaken;
        success = false;
      }
    }),
    db.checkPass(user,password).then(passMatch => {
      if(!passMatch){
        errors.passwordEmail = strings.info.wrongPass;
        success = false;
      }
    })
  ];
  return Promise.all(promises).then(res=>{ return {success,errors}});
}
function validatePassword(user,password){
  let errors = {};
  let success = true;
  return db.checkPass(user,password).then(passMatch =>{
    if(!passMatch){
      errors.oldPassword = strings.info.wrongPass;
      success = false;
    }
    return {success,errors}
  });

}
function validateEmailInput(payload){
  const errors = {};
  let isFormValid = true;
  if(!validation.isEmail(payload.email)){
    errors.email = strings.input.email;
    isFormValid = false;
  }
  if(!validation.isPassword(payload.passwordEmail)){
    errors.passwordEmail = strings.input.password;
    isFormValid = false;
  }

  return {errors, success:isFormValid};
}
function validatePasswordInput(payload){
  const errors = {};
  let isFormValid = true;
  if(!validation.isPassword(payload.oldPassword)){
    errors.oldPassword = strings.input.password;
    isFormValid = false;
  }
  if(!validation.isPassword(payload.passwordChange1)){
    errors.passwordChange1 = strings.input.password;
    isFormValid = false;
  }
  if(!validation.isPassword(payload.passwordChange2)){
    errors.passwordChange2 = strings.input.password;
    isFormValid = false;
  }
  if(payload.passwordChange1 !== payload.passwordChange2){
    errors.passwordChange2 = strings.input.passwordMatch;
    isFormValid = false;
  }
  return {errors,success:isFormValid};
}
function validateEditInput(payload){
  const errors = {}; 
  let isFormValid = true;
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your username.';
  }
  else if(payload.name.trim().length > 50){
    isFormValid = false;
    errors.name = 'Username must be less than 50 characters';
  }
  if (!payload || typeof payload.country !== 'string' || payload.country.trim().length === 0) {
    isFormValid = false;
    errors.country = 'Please provide your country.';
  }
  else if(!countries.includes(payload.country)){
    isFormValid = false;
    errors.country = 'Please choose a country from the list.';
  }
  if (!payload || payload.birthday === 'null') {
    isFormValid = false;
    errors.birthday = 'Please provide your birthday.';
  }
  if (!isFormValid) {
    errors.message = 'Check the form for errors.';
  }
  return {
    success: isFormValid,
    errors
  }
}

module.exports = router;
