const mongoose = require('mongoose');
const BillingSchema = new mongoose.Schema({
    transaction_id: {type: Number, unique:true},
    email: String,
    amount: Number,
    payment_method: String,
    payment_status: { type: String, enum: ['SUCCESS', 'PENDING', 'FAILED'] },
    createdAt: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Billing_History', BillingSchema, 'Billing_History');