const express = require('express');
const db = require('../queries');
const validator = require('validator');
const multer  = require('multer');
const countries = require('../data/countries');
const path = require('path');

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
      data.isOwner = false;
      if(req.isAuthenticated() && req.user === data.username){
        data.isOwner = true;
      }
      res.json(data);
    }
  })
});
/* TODO
  1- When user enters this page, check if he is the owner DONE
  2- if a user posts to this page, check if he is the owner DONE
  3- validate data DONE
  4- upload image, if it is provided DONE
  5- Insert to the database DONE
*/

router.post('/user/:id/edit',upload.single('photo'),(req,res)=> {
    if(req.isAuthenticated() && req.user === req.params.id){
      let validationResult = validateEditInput(req.body);
      if(!validationResult.success){
        return res.status(400).json(validationResult);
      }
      db.updateUser(req.body);
      return res.status(200).json({success:true,message:"Profile Saved"});
    }else{
      return res.json({
        success: false,
        message: "You need to login before submitting"
      });
    }
});

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
  };
}

module.exports = router;
