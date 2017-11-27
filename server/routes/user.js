const express = require('express');
const db = require('../queries');
const validator = require('validator');
const countries = require('../data/countries');
const router = new express.Router();

function getUserInfo(user){
  return db.checkUser(user)
    .then(data=> {
      if(data.length == 0){
        return {};
      }
      delete data[0].hash;
      delete data[0].isAdmin;
      delete data[0].email;
      return data[0];
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
  4- upload image, if it is provided
  5- Insert to the database
  6- redirect the user to his profile
*/

router.post('/user/:id/edit',(req,res)=> {
    if(req.isAuthenticated() && req.user === req.params.id){
      let validationResult = validateEditInput(req.body);
      if(!validationResult.success){
        return res.status(400).json(validationResult);
      }
      return res.status(200).json({success:true});
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
  if (!payload || typeof payload.birthday !== 'string' || payload.birthday.trim().length === 0) {
    isFormValid = false;
    errors.birthday = 'Please provide your birthday.';
  }
  if (!payload || typeof payload.gender !== 'number') {
    isFormValid = false;
    errors.gender = 'Please provide your gender.';
  }

  return {
    success: isFormValid,
    errors
  };
}

module.exports = router;
