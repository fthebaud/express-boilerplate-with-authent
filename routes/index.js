const express = require('express');
const path = require('path');

const router = express.Router();


// top secret password that gives access to the page
const password = 'motmagique';

// Token (will be stored in a cookie)
const token = '45096213712045796';


/* GET / */
router.get('/', function (req, res, next) {
  res.redirect('/index');
});


/* GET /index */
router.get('/index', function (req, res, next) {
  // check if user is authenticated by looking at token in cookie
  if (isTokenValid(req.cookies.userToken)){
    // token OK : send back index page
    res.sendFile('index/html/index.html', { root: path.resolve(__dirname) });
  } else {
    // No token or bad token : redirect to password page
    res.redirect('/password');
  }
});


/* GET /password */
router.get('/password', skipPassword, function (req, res, next) {
  let msg = '<div>Entrer votre mdp</div>';
  if (req.query.loginFailed) {
    msg = '<div class="error">erreur, mot de passe incorrect</div>';
  }
  res.render('index/views/password', { message: msg});
});


/* POST /password  */
router.post('/password', function (req, res, next) {
  // check password
  if (req.body.userPassword !== password) {
    // bad password : redirect to password page with a warning
    res.redirect('/password?loginFailed=true');
  } else {
    // correct password : we add cookie...
    res.cookie('userToken', token, {
      maxAge: 604800, // 7 jours (en secondes)
      httpOnly: true
      /* , secure: true*/
    });
    // ...and we redirect to the index page
    res.redirect('/index');
  }
});

function skipPassword(req, res, next) {
  // is the user is already authenticated, skip directly to index page
  if (isTokenValid(req.cookies.userToken)) {
    res.redirect('/index');
  } else {
    next();
  }
}

function isTokenValid(userToken) {
  return (userToken && userToken === token);
}


module.exports = router;
