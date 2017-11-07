const express = require('express');
const validator = require('validator');
var pgp = require('pg-promise')();
var pg = require('pg');
const router = new express.Router();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'moonDB',
    user:'postgres',
    password: '123456789'
}

const db = pgp(cn);

function addUser(user){
  db.none('INSERT INTO \"Users\" (username,email,hash) VALUES($1,$2,$3)',[user.username,user.email,user.password])
    .catch(err => {
      console.log(err);
    });
    console.log("INSERTED SUCCESSFULLY");
}

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.password2 !== 'string' || payload.password2.trim() !== payload.password) {
    isFormValid = false;
    errors.password2 = 'Passwords must match.';
  }

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }
  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json(validationResult);
  }
  addUser(req.body);
  return res.status(200).json({validationResult}).end();
});

module.exports = router;
