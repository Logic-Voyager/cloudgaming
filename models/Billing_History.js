const mongoose = require('mongoose');
const BillingSchema = new mongoose.Schema({
    transaction_id: Number,
    user_id: String,
    amount: Number,
    payment_method: String,
    payment_status: { type: String, enum: ['SUCCESS', 'PENDING', 'FAILED'] }
});
module.exports = mongoose.model('Billing_History', BillingSchema);