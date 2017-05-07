const express = require('express');
const conf = require ('../configuration/conf');
const tokenValidator = require ('../utils/tokenValidator');

const router = express.Router();

/*
/* <host>/login/
*/
router.route('/')

  /* GET */
  .get(skipLogin, function (req, res, next) {
    let msg = '';
    if (Number.parseInt(req.query.failed)) {
      msg = '<div class="error">erreur, mot de passe incorrect</div>';
    } else {
      msg = '<div>Entrer votre mdp</div>';
    }
    res.render('login/login.ejs', { message: msg});
  })

  /* POST */
  .post(function (req, res, next) {
    // check password
    if (req.body.userPassword !== conf.password) {
      // bad password : redirect to login page with a warning
      res.redirect('/login?failed=1');
    } else {
      // correct password : we add cookie...
      res.cookie('userToken', conf.token, {
        maxAge: 604800, // 7 jours (en secondes)
        httpOnly: true
        /* , secure: true*/
      });
      // ...and we redirect to the index page
      res.redirect('/index');
    }
  });

function skipLogin(req, res, next) {
  // is the user is already authenticated, skip directly to index page
  if (tokenValidator.isTokenValid(req.cookies.userToken)) {
    res.redirect('/index');
  } else {
    next();
  }
}

module.exports = router;
