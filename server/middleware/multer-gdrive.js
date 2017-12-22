var google = require('googleapis'),
  uuid = require('uuid'),
  Promise = require('bluebird');


function DriveStorage(opts, preproc) {
  this.drive = google.drive('v3');
  this.auth = opts;
  this.preproc = preproc;
  console.log("DriveStorage initialized");
}

DriveStorage.prototype._handleFile = function(req, file, cb) {
  var stream = file.stream;
  var self = this;
  if(typeof this.preproc === 'function') {
    stream = this.preproc(stream);
  } else {
    stream = new Promise(function(resolve) {
      return resolve(stream);
    });
  }
  this.auth.authorize((authErr) => {
    if (authErr) {
      console.log(authErr);
      return;
    }
    stream
    .then(function(_stream) {
      console.log("upload in progress...",file.originalname);
      self.drive.files.create({
        auth: this.auth,
        resource: {
          name: file.originalname,
          mimeType: file.mimetype,
        },
        media: {
          mimeType: file.mimetype,
          body: _stream,
        }
      }, function(err, response) {
        if(err) {
          console.log(err);
          return cb(err, null);
        }
        console.log("Upload Successful");
        return cb(err, {
          googleId: response.id
        });
      });
    })
    .catch(function(err) {
      console.error('caught error', err);
    });
  });
};

DriveStorage.prototype._removeFile = function(req, file, cb) {
  this.drive.files.delete({
    fileId: file.googleId,
  }, cb);
};

module.exports = function (opts, preproc) {
  return new DriveStorage(opts, preproc);
};
