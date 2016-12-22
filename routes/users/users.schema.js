var mg = require('mongoose');
var Schema = mg.Schema;

var usersSchema = new Schema({
  email: String,
  name: String,
  password: String,
  role: String,
  isMember: Boolean,
  isManager: Boolean
});

module.exports = mg.model('users', usersSchema);