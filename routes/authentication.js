const express = require('express');
const { authenticate } = require('passport');
const router = express.Router();
const passport = require('passport')
const { isLoggedIn, isNotLogged }= require('../lib/auth')

/* GET users listing. */
router.get('/signup',isNotLogged, (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup',isNotLogged, passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/signin',isNotLogged, (req, res) => {
  res.render('auth/signin')
})

router.post('/signin',isNotLogged, (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
      failureFlash: true
  })(req, res, next)
})

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile')
})

router.get('/logout',isLoggedIn, (req, res) => {  
  req.logOut(function(err){
    if (err) return next(err)
  })  
  res.redirect('/signin')
})

module.exports = router;