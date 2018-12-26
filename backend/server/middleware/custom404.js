'use strict';
module.exports = function () {
  var path = require('path');
  return function urlNotFound(req, res, next) {
    let fallback_index = path.resolve('client/index.html');
    res.sendFile(fallback_index, function (err) {
      if (err) {
        console.error(err);
        res.status(err.status).end();
      }
    });
  };
};
