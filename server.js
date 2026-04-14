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

// --- 1. IMPORT MODELS ---
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

// --- 4. API ROUTES ---

app.get('/', (req, res) => {
    res.send("<h1>🚀 X-Cloud Nexus Backend is Online!</h1><p>Status: Connected to MongoDB Atlas</p>");
});

// GET Endpoints for all Collections
app.get('/api/users', async (req, res) => {
    try { res.json(await User.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching User_Profile" }); }
});

app.get('/api/subscriptions', async (req, res) => {
    try { res.json(await Subscription.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Subscription_Tier" }); }
});

app.get('/api/games', async (req, res) => {
    try { res.json(await Game.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Game_Catalog" }); }
});

// --- GET: SPECIFIC USER PROFILE ---
app.get('/api/profile', async (req, res) => {
    try {
        const { email } = req.query; 
        if (!email) return res.status(400).json({ error: "Missing email parameter" });

        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Server error fetching profile" });
    }
});

// --- POST: BILLING / ADD TRANSACTION ---
app.post('/api/billing/add', async (req, res) => {
    try {
        let uniqueId;
        let exists = true;

        // Generate a unique 6-digit transaction ID
        while (exists) {
            uniqueId = Math.floor(100000 + Math.random() * 900000);
            const check = await Billing.findOne({ transaction_id: uniqueId });
            if (!check) exists = false;
        }

        const newRecord = new Billing({
            transaction_id: uniqueId,
            email: req.body.email, // Joins Billing to User via Email
            amount: req.body.amount,
            payment_method: "Online",
            payment_status: "SUCCESS"
        });

        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- GET: USER BILLING HISTORY ---
app.get('/api/billing/history', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ error: "Email query required" });
        
        const history = await Billing.find({ email: email });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: "Error fetching billing history" });
    }
});

// --- POST: SIGNUP ---
app.post('/api/signup', async (req, res) => {
    try {
        const { full_name, gamertag, email, hashed_password, country } = req.body;
        const newUser = new User({
            full_name, gamertag, email, hashed_password, country,
            account_status: "ACTIVE"
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered!", user_id: savedUser._id });
    } catch (err) {
        res.status(500).json({ error: "Registration failed." });
    }
});

// --- POST: LOGIN ---
app.post('/api/login', async (req, res) => {
    try {
        const { email, hashed_password } = req.body;
        const user = await User.findOne({ email, hashed_password });
        if (user) {
            res.status(200).json({ message: "Login successful!", user_id: user._id, gamertag: user.gamertag });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// --- 5. SERVER START ---
const PORT = process.env.PORT || 10000; 
app.listen(PORT, () => {
    console.log(`🚀 X-Cloud Server running on port ${PORT}`);
});