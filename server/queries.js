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

function getUser(user){
  return db.any('SELECT * FROM users WHERE username = $1',[user]);//promise
}
function checkEmail(email){
  return db.any('SELECT * FROM users WHERE email = $1',[email]);//promise
}

function checkPass(email,password){
  return checkEmail(email).then(data=>{
    return data.length !== 0 && bcrypt.compare(password,data[0].hash).then(res => data[0].username);
  });
}
function getProfile(user){
  return db.any('SELECT * FROM profile WHERE username = $1',[user]);
}

function getTags(mediaid){
  return db.any('SELECT tag FROM tag WHERE mediaid = $1',[mediaid])
    .then(data => data.map(i => i.tag));
}

function getMedia(mediaid){
  return db.any('SELECT * FROM media WHERE mediaid = $1',[mediaid]);
}

function getMediaType(mediaid,type){
  return db.any('SELECT * FROM ' + type + ' WHERE mediaid = $1',[mediaid]);
}

function getLastestUserMedia(user){
  return db.any('SELECT mediaid FROM media WHERE username = $1 and NOT \"isThumbnail\" ORDER BY datecreated DESC NULLS LAST LIMIT 5',[user]);
}
function updateUser(info){
    return Promise.all[
      db.none('UPDATE users SET name = $1, country = $2, birthday = $3, gender = $4 WHERE username = $5'
      ,[info.name,info.country,info.birthday,info.gender,info.username]),
      db.none('UPDATE profile SET about = $1, interests = $2 WHERE username = $3',[info.about,info.interests,info.username])];
}

function addUser(info){
  return bcrypt.hash(info.password, saltRounds).then(hash=>{
    return db.one('INSERT INTO users (username,email,hash) VALUES($1,$2,$3) RETURNING username',[info.username,info.email,hash])
      .then(data => {
        console.log("addUser","INSERTED SUCCESSFULLY");
        db.none('INSERT INTO profile (username) VALUES($1)',[info.username]);//Create Profile
        return data.username;
      })
      .catch(err => {
        console.log("addUser","INSERT UNSUCCESSFULL");
        console.log(err);
        return "Internal Database Error";
      });
  });
}
function addMedia(info){
  return db.none('INSERT INTO media (mediaid,type,username,title,description) VALUES($1,$2,$3,$4,$5)',
          [info.mediaid,info.type,info.username,info.title,info.description])
    .then(()=>{
      info.tags.map(tag => addTag(tag,info.mediaid));
      if(info.thumbnail.filename){
        db.none('INSERT INTO media (mediaid,type,username,title,\"isThumbnail\") VALUES($1,$2,$3,$4,$5)',[info.thumbnail.filename,'pi',info.username,'thumbnail','TRUE'])
          .then(()=> {
              db.none('INSERT INTO picture (mediaid,file_type) VALUES($1,$2)',[info.thumbnail.filename,info.thumbnail.ext]);
              switch (info.type) {
                case "pi":
                db.none('INSERT INTO picture (mediaid,file_type) VALUES($1,$2)',[info.mediaid,info.ext]);
                break;
                case "vi":
                db.none('INSERT INTO video (mediaid,file_type,thumbnail) VALUES($1,$2,$3)',[info.mediaid,info.ext,info.thumbnail.filename]);
                break;
                case "mu":
                db.none('INSERT INTO music (mediaid,file_type,thumbnail) VALUES($1,$2,$3)',[info.mediaid,info.ext,info.thumbnail.filename]);
                break;
              }
          });
      }
    });
}
function addTag(tag,mediaid){
  return db.none('INSERT INTO tag (tag,mediaid) VALUES ($1,$2)',[tag,mediaid]);
}
function getPpPromise(){
  return db;
}
module.exports = {
  getUser,
  getProfile,
  getMedia,
  getMediaType,
  getTags,
  getLastestUserMedia,
  checkEmail,
  checkPass,
  addUser,
  addMedia,
  updateUser,
  getPpPromise
}
