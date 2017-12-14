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
var upload = multer({
    storage: storage,
    fileFilter: (req,file,cb) => {
      let validationResult = validateUploadInput(req.body);
      cb(null,validationResult.success);
      req.validationResult = validationResult;
    }

});

router.post('/media/recentUser',(req,res)=>{
    db.getLastestUserMedia(req.body.user,5).then(data=>{
        const dataPromiseMap = data.map(id => getMedia(id.mediaid).then(media => media));
        Promise.all(dataPromiseMap).then(result=>{
            res.json(result);
        });
    });
});
router.post('/media/recentAll',(req,res)=>{
    db.getLastestUserMedia(req.body.user).then(data=>{
        const dataPromiseMap = data.map(id => getMedia(id.mediaid).then(media => media));
        Promise.all(dataPromiseMap).then(result=>{
            res.json(result);
        });
    });
});

router.get('/media/profile/:id',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'..','..','uploads','profile',req.params.id));
});

router.get('/media/:id',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'..','..','uploads','media',req.params.id));
});

const cpUpload = upload.fields([{name:'file',maxCount: 1}, {name:'thumbnail',maxCount: 1}]);

router.post('/upload',cpUpload,(req,res)=>{
  if(req.isAuthenticated()){
    let validationResult = req.validationResult;
    if(!validationResult.success){
      return res.status(400).json(validationResult);
    }
    const media = {
      mediaid: req.files['file'][0].filename,
      thumbnail: req.files['thumbnail'] ? req.files['thumbnail'][0] : {},
      username: req.user,
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags.split(','),
      type: req.body.type,
      ext: req.body.ext,
      file: req.files['file'][0]
    }
    db.addMedia(media);
    return res.status(200).json({success:true,message:"Upload Successful",mediaid:media.mediaid});
  }else{
    return res.json({
      success: false,
      message: "You need to login before submitting"
    });
  }
});

router.post('/media/:id',(req,res)=>{
  getMedia(req.params.id).then(data=>{
    if(data.username === undefined){
        res.status(404).json({error:"Media not found"});
    }else{
      data.isOwner = (req.isAuthenticated() && req.user === data.username);
      res.json(data);
    }
  })
});

function getMedia(mediaId){
  return db.getMedia(mediaId)
    .then(media => {
      if(!media || media.length == 0)
        return {};
      media = media[0];
      let type = '';
      if(media.type === 'pi'){
        type = 'picture';
      }
      else if(media.type === 'vi'){
        type = 'video';
      }
      else if(media.type === 'mu'){
        type = 'music';
      }
      var tags = db.getTags(mediaId).then(data => Object.assign(media,{tags: data}));
      var mediaType = db.getMediaType(mediaId,type).then(data => Object.assign(media,data[0]));
      return Promise.all([tags,mediaType]).then(r => media);
    });
}

function getTags(mediaId){
  return db.getTags(data => data);
}

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
