const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    game_id: Number,
    title_name: String,
    publisher: String,
    genre: String,
    is_cloud_enabled: Boolean,
    // --- New Fields Added Below ---
    game_details: String,      // For the long description of the game
    game_image_url: String,    // For the link to the cover image
    game_price: Number         
});
module.exports = mongoose.model('Game_Catalog', GameSchema);
// module.exports = mongoose.model('Game_Catalog', GameSchema, 'Game_Catalog');