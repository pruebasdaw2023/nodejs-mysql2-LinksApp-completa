const express = require('express');
const { authenticate } = require('passport');
const router = express.Router();
const passport = require('passport')

/* GET users listing. */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/signin', (req, res) => {
  res.render('auth/signin')
})

router.post('/signin', (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
      failureFlash: true
  })(req, res, next)
})

router.get('/profile', (req, res) => {
  res.render('profile')
})

router.get('/logout', (req, res) => {  
  req.logOut(function(err){
    if (err) return next(err)
  })  
  res.redirect('/signin')
})

module.exports = router;