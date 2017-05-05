const express = require('express');
const path = require('path');

const router = express.Router();

const password = 'motmagique';

// generate token for cookie
const randomNumber = Math.random().toString();
const randomToken = randomNumber.substring(2, randomNumber.length);

function sendIndexPage(res) {
  res.sendFile('html/index.html', { root: path.resolve(__dirname, '../private/') });
}

function sendPasswordPage(res) {
  res.sendFile('html/password.html', { root: path.resolve(__dirname, '../private/') });
}


/* GET password page */
router.get('/checkPassword', function (req, res, next) {
  // bad password : ask for password again
  if (req.body.password !== password) {
    sendPasswordPage(res);
    return;
  }
  // password OK : we add cookie
  res.cookie('token', randomToken, {
    maxAge: 604800, // 7 jours (en secondes)
    httpOnly: true
    /*, secure: true*/
  });
  // and we send back index page
  sendIndexPage(res);
});


/* GET home page. */
router.get('/', function (req, res, next) {
  const { token } = req.cookies;
  if (!token || token !== randomToken){
    // No token or bad token : ask for password
    sendPasswordPage(res);
    return;
  }
  // token OK : send back index page
  sendIndexPage(res);
});



module.exports = router;
