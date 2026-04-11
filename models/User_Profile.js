const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    // user_id: { type: String, unique: true }, 
    full_name: { type: String, required: true },
    gamertag: { type: String, unique: true },
    email: { type: String, unique: true },
    hashed_password: { type: String, required: true },
    country:{type: String, required: true},
    account_status: { type: String, enum: ['ACTIVE', 'BANNED', 'SUSPENDED'], default: 'ACTIVE' }
});
module.exports = mongoose.model('User_Profile', UserSchema);