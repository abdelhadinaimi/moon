const express = require('express');
const multer  = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = new express.Router();

/* TODO
  1- POST /upload uploads any media
  2- validate media
  3- generate unique ID
  4- save it to /media/:id on the server
  5- redirect to /media/:id client side
  */

module.exports = router;
