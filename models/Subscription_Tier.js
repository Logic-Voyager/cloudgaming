const mongoose = require('mongoose');
const SubSchema = new mongoose.Schema({
    tier_id: Number,
    tier_name: String,
    tier_details: String,
    monthly_price: Number,
    max_resolution: String
});
module.exports = mongoose.model('Subscription_Tier', SubSchema);
// module.exports = mongoose.model('Subscription_Tier', SubSchema, 'Subscription_Tier');