const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    user_id: { type: String, unique: true }, 
    gamertag: { type: String, unique: true },
    email: { type: String, unique: true },
    hashed_password: { type: String, required: true },
    region_id: Number,
    account_status: { type: String, enum: ['ACTIVE', 'BANNED', 'SUSPENDED'], default: 'ACTIVE' }
});
module.exports = mongoose.model('User_Profile', UserSchema);