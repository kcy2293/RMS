const mg = require('mongoose'),
      Schema = mg.Schema,
      bcrypt = require('bcrypt'),
      SALT_WORK_FACTORY = 10;

var usersSchema = new Schema({
  userid: String,
  name: String,
  password: String,
  role: String,
  isMember: Boolean,
  isManager: Boolean
});

/*
usersSchema.pre('save', (next) => {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTORY, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

usersSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
*/

module.exports = mg.model('users', usersSchema);