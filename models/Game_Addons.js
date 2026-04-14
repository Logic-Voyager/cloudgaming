const mongoose = require('mongoose');
const AddonSchema = new mongoose.Schema({
    addon_id: Number,
    game_id: Number, // FK linking to Game_Catalog
    addon_name: String,
    price: Number
});
module.exports = mongoose.model('Game_Addons', AddonSchema, 'Game_Addons');