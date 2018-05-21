var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// The user schema attributes
var UserSchema = new Schema({
  email: {type: String, unique: true, lowecase: true},
  password: String,


  profile: {
    name: {type: String, default: ''},
    picture: {type: String, default: ''}
  },

  address: String,
  history: [{
    date: Date,
    paid: {type: Number, default: 0},
    // item: {type: Schema.Types.ObjectID, ref: ''}
  }]
})

// Hash the password before we save it to

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash)=>{
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

//compare password in db and the one the use types in
UserSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(this.password);
}

module.exports = mongoose.model('User', UserSchema);
