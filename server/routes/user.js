const express = require('express');
const db = require('../queries');
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
  1- When user enters this page, check if he is the owner
  2- if a user posts to this page, check if he is the owner
  3- validate data
  4- upload image, if it is provided
  5- Insert to the database
  6- redirect the user to his profile
*/

router.post('/user/:id/edit',(req,res)=> {

});

module.exports = router;
