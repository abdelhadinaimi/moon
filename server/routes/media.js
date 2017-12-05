const express = require('express');
const path = require('path');
const multer  = require('multer');
var Hashids = require('hashids');
const db = require('../queries');

const router = new express.Router();


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..','uploads','media'));
  },
  filename: function (req, file, cb) {
    const hashids = new Hashids("sqdqc416c1DZD41"+Math.random()*12480,0);
    const hex = Buffer(file.originalname).toString('hex') + Math.floor(Math.random() * 1206000);
    const id = hashids.encodeHex(hex);
    cb(null,id.substring(0,5)+id.substring(10,15));
  }
});
var upload = multer({ storage: storage });

//hashids
/* TODO
  1- POST /upload uploads any media DONE
  2- validate media DONE
  3- generate unique ID DONE
  4- save it to /media/:id on the server DONE
  5- redirect to /media/:id client side
  */

router.get('/media/profile/:id',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'..','..','uploads','profile',req.params.id));
});

router.post('/upload',upload.single('file'),(req,res)=>{
    console.log(req.body.tags.split(','));
    if(req.isAuthenticated()){
      let validationResult = validateUploadInput(req.body);
      if(!validationResult.success){
        return res.status(400).json(validationResult);
      }
      const media = {
        mediaid: req.file.filename,
        username: req.user,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        ext: req.body.ext,
        file: req.file

      }
      //db.addMedia(media);
      return res.status(200).json({success:true,message:"Upload Successful"});
    }else{
      return res.json({
        success: false,
        message: "You need to login before submitting"
      });
    }
});

function validateUploadInput(payload){
  const errors = {};
  let isFormValid = true;
  if (!payload || typeof payload.title !== 'string' || payload.title.trim().length === 0) {
    isFormValid = false;
    errors.title = 'Please provide your title.';
  }
  if (payload.title.trim().length < 5 || payload.title.trim().length > 50) {
    isFormValid = false;
    errors.title = 'The title must be between 5 and 50 characters';
  }
  if (payload.description.length > 2000) {
    isFormValid = false;
    errors.description = 'The description must be less than 2000 characters';
  }
  return {
    success: isFormValid,
    errors
  };
}

module.exports = router;
