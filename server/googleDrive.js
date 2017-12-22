const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const path = require('path');
const drive = google.drive('v3');

const key = require('./data/client_token.json');
//folder mime : application/vnd.google-apps.folder
module.exports = class GoogleDrive{
  constructor(){
    this.MEDIA_FOLDER_ID = '1PJaAp4euTF4dnuNJ9tQ92llQ1PiHslNM';
    this.PROFILE_FOLDER_ID = '1VPa3j3NngwYPow9OZdFzqQ3m60fbiET8';
    this.jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/drive'],
      null
    );
    var t;
    setTimeout(()=>{t = this.getFile('yLo4yTloaO')},1000);
    setTimeout(()=>console.log(t),4000);
  }

  authorize(){
    return new Promise(res =>{
      this.jwtClient.authorize((authErr) => {
        if (authErr) {
          console.log(authErr);
          return;
        }
        console.log("Authorized");
      });
      res(this.jwtClient);
    });
  }
  listAllFiles(){
    this.authorize().then(jwtClient=>{
      drive.files.list({ auth: jwtClient }, (listErr, resp) => {
        if (listErr) {
          console.log(listErr);
          return;
        }
        resp.files.forEach((file) => {
          if(file.name === 'yLo4yTloaO'){
            console.log(`${file.name} (${file.mimeType})`);
            console.log(file);
            return;
          }
        });
        console.log("list finished");
      });
    });
  }
  getFile(filename){
    let resFile = null;
    this.getAllFiles().then(files=>{
      console.log("files",files);
    });
    return resFile;
  }
  getAllFiles(){
    return this.authorize().then((jwtClient)=>{
      drive.files.list({ auth: jwtClient }, (listErr, resp) => {
        Promise.resolve(resp.files);
      });
    });
  }
  uploadFile(media,metadata,cb){
    const parents = metadata.parents[0];
    metadata.parents[0] = parents === 'media' ? this.MEDIA_FOLDER_ID : this.PROFILE_FOLDER_ID;
    this.authorize().then(jwtClient=>{
      drive.files.create({
        auth: this.jwtClient,
        resource: metadata,
        media,
        fields: 'id'
      },(err,file)=>{
        if (err) {
          console.log(err);
          return;
        }
        console.log('Uploaded File Id: ', file.id);
        cb(err,file.id);
      });
    });
  }
}



/*
const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const path = require('path');
const googleDrive = require('google-drive');
//folder mime : application/vnd.google-apps.folder
module.exports = class GoogleDrive{
  constructor(){
    this.TOKEN_DIR = './server/data/';
    this.TOKEN_PATH = this.TOKEN_DIR + 'drive_token.json';
    fs.readFile(this.TOKEN_DIR+'client_secret.json',(err, content) =>{
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }
      // Authorize a client with the loaded credentials, then call the
      // Drive API.
      this.auth = this.authorize(JSON.parse(content));
    });
  }

  authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    fs.readFile(this.TOKEN_PATH, (err, token)=>{
      oauth2Client.credentials = JSON.parse(token);
    });
    return oauth2Client;
  }
  listFiles() {
    var service = google.drive('v3');
    service.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name)"
    },(err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var files = response.files;
      if (files.length == 0) {
        console.log('No files found.');
      } else {
        console.log('Files:');
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log('%s (%s)', file.name, file.id);
        }
      }
    });
  }

  uploadFile(){
    var fileMetadata = {
      'name': 'photo.jpg'
    };
    var media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream(path.resolve(__dirname,'files','photo.jpg'))
    };
    var service = google.drive('v3');
    service.files.create({
      auth: this.auth,
      resource: fileMetadata,
      media: media,
      fields: 'id'
    },(err,file)=>{
      if (err) {
        console.error(err);
        } else {
          console.log('File Id: ', file.id);
        }
        console.log("Upload in progress...");
    });
    console.log("Upload started");
  }
}
*/
