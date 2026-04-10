// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// // Import Models
// const User = require('./models/User');
// const Game = require('./models/Game');
// // ... you can import the rest as you build features

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Add this in server.js after your middleware (app.use(cors)...)
// app.get('/', (req, res) => {
//     res.send("<h1>🚀 X-Cloud Nexus Backend is Online!</h1><p>Status: Connected to MongoDB Atlas</p>");
// });

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("🔥 X-Cloud Nexus: DB Connected Successfully"))
//     .catch(err => console.log(err));

// // Test Route: Fetch all users
// app.get('/api/users', async (req, res) => {
//     const users = await User.find();
//     res.json(users);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));

// // //api for games
// // const Game = require('./models/Game'); // Import the model

// // app.get('/api/games', async (req, res) => {
// //     try {
// //         const allGames = await Game.find(); // This "fetches" from MongoDB
// //         res.json(allGames); // This "sends" it to the website
// //     } catch (err) {
// //         res.status(500).json({ message: "Error fetching data" });
// //     }
// // });

// // Add these inside server.js after your DB connection
// const Game = require('./models/Game');
// const User = require('./models/User');

// // Route to get all games
// app.get('/api/games', async (req, res) => {
//     const games = await Game.find();
//     res.json(games);
// });

// // Route to get all users
// app.get('/api/users', async (req, res) => {
//     const users = await User.find();
//     res.json(users);
// });





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- 1. IMPORT MODELS (Matching your naming perfectly) ---
const User = require('./models/User_Profile');
const Game = require('./models/Game_Catalog');
const Session = require('./models/Streaming_Session');
const Subscription = require('./models/Subscription_Tier');
const Achievement = require('./models/Achievement_Log');
const Billing = require('./models/Billing_History');
const ServerNode = require('./models/Server_Node');
const Addon = require('./models/Game_Addons');

const app = express();

// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 3. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 X-Cloud Nexus: DB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- 4. API ROUTES (8 Endpoints for your Classmate) ---

app.get('/', (req, res) => {
    res.send("<h1>🚀 X-Cloud Nexus Backend is Online!</h1><p>Status: Connected to MongoDB Atlas</p>");
});

// 1. User Profiles
app.get('/api/users', async (req, res) => {
    try { res.json(await User.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching User_Profile" }); }
});

// 2. Subscription Tiers
app.get('/api/subscriptions', async (req, res) => {
    try { res.json(await Subscription.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Subscription_Tier" }); }
});

// 3. Game Catalog
app.get('/api/games', async (req, res) => {
    try { res.json(await Game.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Game_Catalog" }); }
});

// 4. Game Addons
app.get('/api/addons', async (req, res) => {
    try { res.json(await Addon.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Game_Addons" }); }
});

// 5. Server Nodes
app.get('/api/servers', async (req, res) => {
    try { res.json(await ServerNode.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Server_Node" }); }
});

// 6. Streaming Sessions
app.get('/api/sessions', async (req, res) => {
    try { res.json(await Session.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Streaming_Session" }); }
});

// 7. Billing History
app.get('/api/billing', async (req, res) => {
    try { res.json(await Billing.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Billing_History" }); }
});

// 8. Achievement Logs
app.get('/api/achievements', async (req, res) => {
    try { res.json(await Achievement.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Achievement_Log" }); }
});

// --- 5. SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 X-Cloud Server running on port ${PORT}`);
    console.log(`🔗 Checking from Phone? Use your Ngrok URL!`);
});