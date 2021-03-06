const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.redirect('/web/');
});

router.get('/downloads', function (req, res, next) {
  var apkFile = `./downloads/nowaste.apk`;
  if(!fs.existsSync(apkFile))
      return res.status(404).send('Sorry no APKs here');
  res.download(apkFile);
});

module.exports = router;
