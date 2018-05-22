var router = require('express').Router()
var User = require('../models/user')

router.post('/signup', (req, res, next) => {
  var user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (existingUser) {
      console.log(req.body.email + ' already exists');

      return res.redirect('/signup')
    } else {
      user.save( function (err, user) {
        if (err) return next(err);
        res.json('New user has been created.')
      })
    }
  })
});

module.exports = router;