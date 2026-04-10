const mongoose = require('mongoose');
const SubSchema = new mongoose.Schema({
    tier_id: Number,
    tier_name: String,
    monthly_price: Number,
    max_resolution: String
});
module.exports = mongoose.model('Subscription_Tier', SubSchema);