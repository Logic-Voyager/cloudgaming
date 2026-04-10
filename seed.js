const mongoose = require('mongoose');
require('dotenv').config();

// --- 1. Import all 8 Models ---
const User = require('./models/User_Profile');
const Game = require('./models/Game_Catalog');
const Session = require('./models/Streaming_Session');
const Subscription = require('./models/Subscription_Tier');
const Achievement = require('./models/Achievement_Log');
const Billing = require('./models/Billing_History');
const ServerNode = require('./models/Server_Node');
const Addon = require('./models/Game_Addons');

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("🌱 Seeding X-Cloud Nexus Data to Atlas...");

    // Clear existing data to avoid duplicates/conflicts
    await Promise.all([
        User.deleteMany({}), Game.deleteMany({}), Session.deleteMany({}),
        Subscription.deleteMany({}), Achievement.deleteMany({}),
        Billing.deleteMany({}), ServerNode.deleteMany({}), Addon.deleteMany({})
    ]);

    // 1. Seed Subscriptions (Ultimate & Core)
    await Subscription.insertMany([
        { tier_id: 1, tier_name: "Ultimate", monthly_price: 14.99, max_resolution: "4K" },
        { tier_id: 2, tier_name: "Core", monthly_price: 9.99, max_resolution: "1080p" }
    ]);

    // 2. Seed 5 User Profiles
    await User.insertMany([
        { user_id: "u101", gamertag: "MasterChief117", email: "chief@unsc.com", hashed_password: "key1", region_id: 1, account_status: "ACTIVE" },
        { user_id: "u102", gamertag: "NobleSix", email: "six@reach.com", hashed_password: "key2", region_id: 2, account_status: "ACTIVE" },
        { user_id: "u103", gamertag: "DoomSlayer", email: "slayer@id.com", hashed_password: "key3", region_id: 1, account_status: "ACTIVE" },
        { user_id: "u104", gamertag: "Dragonborn", email: "dovah@skyrim.com", hashed_password: "key4", region_id: 3, account_status: "SUSPENDED" },
        { user_id: "u105", gamertag: "MarcusFenix", email: "fenix@delta.com", hashed_password: "key5", region_id: 2, account_status: "ACTIVE" }
    ]);

    // 3. Seed Game Catalog (Major Xbox Titles)
    await Game.insertMany([
        { game_id: 501, title_name: "Halo Infinite", publisher: "Xbox Game Studios", genre: "FPS", is_cloud_enabled: true },
        { game_id: 502, title_name: "Forza Horizon 5", publisher: "Playground Games", genre: "Racing", is_cloud_enabled: true },
        { game_id: 503, title_name: "Starfield", publisher: "Bethesda", genre: "RPG", is_cloud_enabled: true },
        { game_id: 504, title_name: "Gears 5", publisher: "The Coalition", genre: "Action", is_cloud_enabled: true },
        { game_id: 505, title_name: "Sea of Thieves", publisher: "Rare", genre: "Adventure", is_cloud_enabled: true }
    ]);

    // 4. Seed Server Nodes (Infrastructure)
    await ServerNode.insertMany([
        { node_id: 901, data_center: "South India", hardware_spec: "Series_X_Blade", node_status: "ONLINE" },
        { node_id: 902, data_center: "East US", hardware_spec: "Series_X_Blade", node_status: "ONLINE" }
    ]);

    // 5. Seed Streaming Sessions (Active Play Logs)
    await Session.insertMany([
        { session_id: 10001, user_id: "u101", game_id: 501, node_id: 901, avg_latency_ms: 24 },
        { session_id: 10002, user_id: "u103", game_id: 503, node_id: 902, avg_latency_ms: 45 }
    ]);

    // 6. Seed Billing History (Financial Audit)
    await Billing.insertMany([
        { transaction_id: 88001, user_id: "u101", amount: 14.99, payment_method: "Credit Card", payment_status: "SUCCESS" },
        { transaction_id: 88002, user_id: "u105", amount: 9.99, payment_method: "Xbox Wallet", payment_status: "SUCCESS" }
    ]);

    // 7. Seed Achievement Logs (Progression)
    await Achievement.insertMany([
        { log_id: 7701, user_id: "u101", game_id: 501, award_name: "Legendary Finisher", gs_points: 100 },
        { log_id: 7702, user_id: "u102", game_id: 502, award_name: "Speed Demon", gs_points: 50 }
    ]);

    // 8. Seed Game Addons (DLC)
    await Addon.insertMany([
        { addon_id: 301, game_id: 501, addon_name: "Spartan Armor Pack", price: 4.99 },
        { addon_id: 302, game_id: 502, addon_name: "Hot Wheels Expansion", price: 19.99 }
    ]);

    console.log("✅ X-Cloud Nexus: All 8 Collections Seeded Successfully!");
    process.exit();
})
.catch(err => {
    console.error("❌ Seed Error:", err);
    process.exit(1);
});