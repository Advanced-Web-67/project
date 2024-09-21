// user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type:String },
    about: { type:String },
}, {timestamps: true ,
    collection: 'users'
});

// ตรวจสอบว่ามีการสร้างโมเดล users แล้วหรือยัง
let User;
try {
    User = mongoose.model('users');
} catch (error) {
    User = mongoose.model('users', userSchema);
}

module.exports = User;
