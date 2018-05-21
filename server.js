var express = require('express')
var morgan = require('morgan')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var ejs = require('ejs');
var engine = require('ejs-mate')

var User = require('./models/user');

var app = express()

mongoose.connect('mongodb://root:jamazon@ds225840.mlab.com:25840/jamazon', (err) =>{
  if (err) {
    console.log(err)
  } else {
    console.log('Connected to database')
  }
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


app.post('/create-user', (req, res, next) => {
  var user = new User();

  user.profile.name = req.body.name;
  user.password= req.body.password;
  user.email = req.body.email;

  user.save( (err) => {
    if (err) return next(err);

    res.json('Successfuly created new user');
  });
});


app.get('/', (req, res)=> {
  res.render('main/home')
})

app.get('/about', (req, res)=> {
  res.render('main/about')
})

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('server is running on port 3000');
});
