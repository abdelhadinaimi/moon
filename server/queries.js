const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'moonDB',
    user:'postgres',
    password: '123456789'
}

const db = pgp(cn);

function checkUser(user){
  return db.any('SELECT * FROM \"Users\" WHERE username = $1',user);//promise
}
function checkEmail(email){
  return db.any('SELECT * FROM \"Users\" WHERE email = $1',email);//promise
}

function checkPass(email,password){
  return checkEmail(email).then(data=>{
    return data.length !== 0 && bcrypt.compare(password,data[0].hash).then(res => data[0].username);
  });
}

function addUser(user){
  return bcrypt.hash(user.password, saltRounds).then(hash=>{
    return db.one('INSERT INTO \"Users\" (username,email,hash) VALUES($1,$2,$3) RETURNING username',[user.username,user.email,hash])
      .then(data => {
        console.log("addUser","INSERTED SUCCESSFULLY");
        db.none('INSERT INTO profile (username) VALUES($1)',user);//Create Profile
        return data.username;
      })
      .catch(err => {
        console.log("addUser","INSERT UNSUCCESSFULL");
        console.log(err);
        return "Internal Database Error";
      });
  });

}
function getPpPromise(){
  return db;
}
module.exports = {
  checkUser,
  checkEmail,
  checkPass,
  addUser,
  getPpPromise
}
