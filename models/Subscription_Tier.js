const mongoose = require('mongoose');
const SubSchema = new mongoose.Schema({
    tier_id: Number,
    tier_name: String,
    tier_details: String,
    monthly_price: Number,
    max_resolution: String
});
// ADD THE THIRD ARGUMENT HERE TO MATCH ATLAS EXACTLY
module.exports = mongoose.model('Subscription_Tier', SubSchema, 'Subscription_Tier');