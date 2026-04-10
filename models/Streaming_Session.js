const mongoose = require('mongoose');
const SessionSchema = new mongoose.Schema({
    session_id: Number,
    user_id: String, //FK
    game_id: Number,  //FK
    node_id: Number,  //FK
    start_time: { type: Date, default: Date.now },
    end_time: Date,
    avg_latency_ms: Number
});
module.exports = mongoose.model('Streaming_Session', SessionSchema);