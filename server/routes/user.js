const express = require('express');
const db = require('../queries');
const router = new express.Router();

/* TODO
  
*/


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
      }
      else{
        res.json(data);
      }
    })
});

module.exports = router;
