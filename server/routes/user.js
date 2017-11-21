const express = require('express');
const router = new express.Router();

router.post('/user', (req, res)=> {
  if(req.isAuthenticated()){
    res.json({user:req.user});
  }
  else{
    res.json({});
  }
});

module.exports = router;
