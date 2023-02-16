const express = require('express');
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

router.get('/profile', (req, res) => {
  res.send('This is your profile')
})

module.exports = router;