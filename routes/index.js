const express = require('express');
const path = require('path');

const router = express.Router();

/*
/* <host>/
*/
router.route('/')
  /* GET */
  .get(function (req, res, next) {
    res.redirect('/index');
  });

/*
/* <host>/index
*/
router.route('/index')
  /* GET */
  .get(function (req, res, next) {
    res.sendFile('index/index.html', { root: path.resolve(__dirname) });
  });




module.exports = router;
