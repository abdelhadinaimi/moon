const express = require('express');
const router = new express.Router();


router.post('/logout',(req,res)=>{
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
