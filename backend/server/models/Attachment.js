'use strict';

module.exports = function(Attachment) {
  Attachment.getApp(function (err, app) {
    if (err) return err;
    app.dataSources.myfilesystem.connector.getFilename = function(uploadingFile, req, res) {
      return Math.random().toString().substr(2) + '.jpg';
    };
  });
};
