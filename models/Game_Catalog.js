const mongoose = require('mongoose');
const GameSchema = new mongoose.Schema({
    game_id: Number,
    title_name: String,
    publisher: String,
    genre: String,
    is_cloud_enabled: Boolean
});
module.exports = mongoose.model('Game_Catalog', GameSchema);