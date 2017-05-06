const express = require('express');
const path = require('path');

const router = express.Router();

const password = 'motmagique';

// generate token for cookie
const token = '45096213712045796';

function sendIndexPage(res) {
  res.sendFile('index/html/index.html', { root: path.resolve(__dirname) });
}

function sendPasswordPage(res, msg) {
  res.render('index/views/password', { message: msg ? msg : ''});
}


/* GET home page. */
router.get('/', function (req, res, next) {
  const { userToken } = req.cookies;
  if (!userToken || userToken !== token){
    // No token or bad token : ask for password
    sendPasswordPage(res, 'Please enter your password');
    return;
  }
  // token OK : send back index page
  sendIndexPage(res);
});


/* POST : check password  */
router.post('/', function (req, res, next) {
  // bad password : ask for password again
  if (req.body.userPassword !== password) {
    sendPasswordPage(res, 'erreur, mot de passe incorrect');
    return;
  }
  // password OK : we add cookie
  res.cookie('userToken', token, {
    maxAge: 604800, // 7 jours (en secondes)
    httpOnly: true
    /* , secure: true*/
  });
  // and we send back index page
  sendIndexPage(res);
});


module.exports = router;
