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

app.get('/api/addons', async (req, res) => {
    try { res.json(await Addon.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Game_Addons" }); }
});

app.get('/api/servers', async (req, res) => {
    try { res.json(await ServerNode.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Server_Node" }); }
});

app.get('/api/sessions', async (req, res) => {
    try { res.json(await Session.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Streaming_Session" }); }
});

app.get('/api/billing', async (req, res) => {
    try { res.json(await Billing.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Billing_History" }); }
});

app.get('/api/achievements', async (req, res) => {
    try { res.json(await Achievement.find()); } 
    catch (err) { res.status(500).json({ error: "Error fetching Achievement_Log" }); }
});

// // --- GET: USER PROFILE (Fetch by ID) ---
// app.get('/api/profile', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: "Invalid User ID format or server error" });
//     }
// });

// --- GET: USER PROFILE (General / Testing) ---
// app.get('/api/profile', async (req, res) => {
//     try {
//         // Option A: During testing, just fetch the first user to show data exists
//         const user = await User.findOne({}); 

//         if (!user) {
//             return res.status(404).json({ error: "No users found in database" });
//         }

//         res.json(user);
//     } catch (err) {
//         console.error("Profile Fetch Error:", err);
//         res.status(500).json({ error: "Server error fetching profile" });
//     }
// });

app.get('/api/profile', async (req, res) => {
    try {
        // Get the email or ID from the request sent by the Flutter app
        const userEmail = req.query.email; 

        if (!userEmail) {
            return res.status(400).json({ error: "Email is required to fetch profile" });
        }

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Server error fetching profile" });
    }
});

// --- POST: SIGNUP ROUTE (Auto-generating ID via MongoDB _id) ---
app.post('/api/signup', async (req, res) => {
    try {
        const { full_name, gamertag, email, hashed_password, country } = req.body;

        const newUser = new User({
            full_name,
            gamertag,
            email,
            hashed_password,
            country,
            account_status: "ACTIVE"
        });

        const savedUser = await newUser.save();
        
        // We return the auto-generated _id as 'user_id' for Himanshu
        res.status(201).json({ 
            message: "User registered successfully!", 
            user_id: savedUser._id,
            gamertag: savedUser.gamertag 
        });
        
        console.log(`✅ New user registered: ${gamertag} with MongoID: ${savedUser._id}`);
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: "Registration failed. Check if all placeholders are filled." });
    }
});

// --- POST: LOGIN ROUTE (Simple check) ---
app.post('/api/login', async (req, res) => {
    try {
        const { email, hashed_password } = req.body;
        const user = await User.findOne({ email, hashed_password });

        if (user) {
            res.status(200).json({ 
                message: "Login successful!", 
                user_id: user._id, 
                gamertag: user.gamertag 
            });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error during login" });
    }
});

// --- 5. SERVER START ---
// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 10000; // Render likes port 10000
app.listen(PORT, () => {
    console.log(`🚀 X-Cloud Server running on port ${PORT}`);
    console.log(`🔗 Checking from Phone? Use your Ngrok URL!`);
});

