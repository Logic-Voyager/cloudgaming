const mongoose = require('mongoose');
const AchievementSchema = new mongoose.Schema({
    log_id: Number,
    user_id: String,
    game_id: Number,
    award_name: String,
    gs_points: Number
});
module.exports = mongoose.model('Achievement_Log', AchievementSchema)
// module.exports = mongoose.model('Achievement_Log', AchievementSchema, 'Achievement_Log');