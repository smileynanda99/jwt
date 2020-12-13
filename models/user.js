const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        require : true
    },
    password: String,
    email: String,
    phoneNo: Number
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;