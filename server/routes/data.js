const express = require('express');
const router = new express.Router();
const countries = require('../data/countries');


router.post('/countries',(req,res) =>{
  res.json(countries);
});

module.exports = router;
