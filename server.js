var express = require('express')
var morgan = require('morgan')

var app = express()

app.use(morgan('dev'));

app.get('/', (req, res) => {
  var name = 'Ironman'
  res.json('My name is ' + name)
})

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('server is running on port 3000');
});
