const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  authorname: {type: String, required:true},
  username: { type: String, required: true, minlength: 7, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
