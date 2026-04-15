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
    console.log("🌱 Seeding Updated X-Cloud Nexus Data to Atlas...");

    // // Clear existing data to avoid conflicts
    // await Promise.all([
    //     User.deleteMany({}), Game.deleteMany({}), Session.deleteMany({}),
    //     Subscription.deleteMany({}), Achievement.deleteMany({}),
    //     Billing.deleteMany({}), ServerNode.deleteMany({}), Addon.deleteMany({})
    // ]);

    // 1. Seed Subscriptions
    await Subscription.insertMany([
        { 
            tier_id: 1, 
            tier_name: "Ultimate", 
            monthly_price: 14.99, 
            max_resolution: "4K",
            tier_details: "Access to 100+ games, EA Play included, and cloud gaming on all devices."
        },
        { 
            tier_id: 2, 
            tier_name: "Core", 
            monthly_price: 9.99, 
            max_resolution: "1080p",
            tier_details: "Online console multiplayer and select catalog of 25+ games."
        }
    ]);

    // 2. Seed 10 User Profiles (user_id field REMOVED)

    await User.insertMany([
        { full_name: "John-117", gamertag: "MasterChief117", email: "chief@unsc.com", country: "USA", account_status: "ACTIVE", hashed_password: "dummy_hash_101" },
        { full_name: "Jack-117", gamertag: "NobleSix", email: "six@reach.com", country: "India", account_status: "ACTIVE", hashed_password: "dummy_hash_102" },
        { full_name: "Josh-117", gamertag: "DoomSlayer", email: "slayer@id.com", country: "United Kingdom", account_status: "ACTIVE", hashed_password: "dummy_hash_103" },
        { full_name: "Joseph-117", gamertag: "Dragonborn", email: "dovah@skyrim.com", country: "Germany", account_status: "SUSPENDED", hashed_password: "dummy_hash_104" },
        { full_name: "Rohn-117", gamertag: "MarcusFenix", email: "fenix@delta.com", country: "Australia", account_status: "ACTIVE", hashed_password: "dummy_hash_105" },
        { full_name: "Harry-117", gamertag: "Arbiter", email: "thel@vadam.com", country: "Canada", account_status: "ACTIVE", hashed_password: "dummy_hash_106" },
        { full_name: "Hermoine-117", gamertag: "CortanaAI", email: "blue@halsey.com", country: "Japan", account_status: "ACTIVE", hashed_password: "dummy_hash_107" },
        { full_name: "Robert Ray", gamertag: "GhostRiley", email: "simon@soap.com", country: "UK", account_status: "ACTIVE", hashed_password: "dummy_hash_108" },
        { full_name: "Rupert Ray", gamertag: "KratosGod", email: "boy@olympus.com", country: "Greece", account_status: "BANNED", hashed_password: "dummy_hash_109" },
        { full_name: "Rohnny Ray", gamertag: "LaraCroft", email: "tomb@raider.com", country: "France", account_status: "ACTIVE", hashed_password: "dummy_hash_110" }
    ]);

    // 3. Seed Game Catalog
    await Game.insertMany([
        { 
            game_id: 501, 
            title_name: "Halo Infinite", 
            publisher: "Xbox Game Studios", 
            genre: "FPS", 
            is_cloud_enabled: true,
            game_details: "Step inside the armor of humanity’s greatest hero to experience an epic adventure.",
            game_image_url: "https://example.com/halo_cover.jpg",
            game_price: 3999.00 
        },
        { 
            game_id: 502, 
            title_name: "Forza Horizon 5", 
            publisher: "Playground Games", 
            genre: "Racing", 
            is_cloud_enabled: true,
            game_details: "Your ultimate Horizon adventure awaits! Explore the vibrant landscapes of Mexico.",
            game_image_url: "https://example.com/forza_cover.jpg",
            game_price: 3499.50 
        },
        { 
            game_id: 503, 
            title_name: "Starfield", 
            publisher: "Bethesda", 
            genre: "RPG", 
            is_cloud_enabled: true,
            game_details: "The first new universe in over 25 years from the creators of Skyrim.",
            game_image_url: "https://example.com/starfield_cover.jpg",
            game_price: 4299.00 
        },
        { 
            game_id: 504, 
            title_name: "Gears 5", 
            publisher: "The Coalition", 
            genre: "Action", 
            is_cloud_enabled: true,
            game_details: "From one of gaming's most acclaimed sagas, Gears is bigger than ever.",
            game_image_url: "https://example.com/gears_cover.jpg",
            game_price: 2699.99 
        },
        { 
            game_id: 505, 
            title_name: "Sea of Thieves", 
            publisher: "Rare", 
            genre: "Adventure", 
            is_cloud_enabled: true,
            game_details: "The essential pirate experience, from sailing to exploring and looting.",
            game_image_url: "https://example.com/sot_cover.jpg",
            game_price: 1999.00 
        }
    ]);

    // 4. Seed Server Nodes
    await ServerNode.insertMany([
        { node_id: 901, data_center: "South India", hardware_spec: "Series_X_Blade", node_status: "ONLINE" },
        { node_id: 902, data_center: "East US", hardware_spec: "Series_X_Blade", node_status: "ONLINE" }
    ]);

    // 5. Seed Streaming Sessions
    await Session.insertMany([
        { session_id: 10001, user_email: "chief@unsc.com", game_id: 501, node_id: 901, avg_latency_ms: 24 },
        { session_id: 10002, user_email: "slayer@id.com", game_id: 503, node_id: 902, avg_latency_ms: 45 }
    ]);

    // 6. Seed Billing History
    await Billing.insertMany([
        { transaction_id: 88001, user_email: "chief@unsc.com", amount: 14.99, payment_method: "Credit Card", payment_status: "SUCCESS" },
        { transaction_id: 88002, user_email: "fenix@delta.com", amount: 9.99, payment_method: "Xbox Wallet", payment_status: "SUCCESS" }
    ]);

    // 7. Seed Achievement Logs
    await Achievement.insertMany([
        { log_id: 7701, user_email: "chief@unsc.com", game_id: 501, award_name: "Legendary Finisher", gs_points: 100 },
        { log_id: 7702, user_email: "six@reach.com", game_id: 502, award_name: "Speed Demon", gs_points: 50 }
    ]);

    // 8. Seed Game Addons
    await Addon.insertMany([
        { addon_id: 301, game_id: 501, addon_name: "Spartan Armor Pack", price: 4.99 },
        { addon_id: 302, game_id: 502, addon_name: "Hot Wheels Expansion", price: 19.99 }
    ]);

    console.log("✅ X-Cloud Nexus: All 8 Collections Seeded Successfully (without manual user_id)!");
    process.exit();
})
.catch(err => {
    console.error("❌ Seed Error:", err);
    process.exit(1);
});