# 🎮 CloudGaming Platform

A full-stack cloud gaming platform designed to provide users with a seamless gaming experience through game discovery, user management, and cloud-based gaming services.

The project focuses on building the foundation of a scalable cloud gaming ecosystem with modern web technologies, database integration, and future support for game streaming infrastructure.

This repository contains the **Backend API**, built to connect seamlessly with the **Flutter mobile/web app** frontend and **MongoDB Atlas** database.

---

## 🚀 Features

### Current Features
- ✅ MongoDB Atlas database integration
- ✅ Secure backend configuration using environment variables
- ✅ Full-stack project architecture
- ✅ Git-based version control workflow

### Planned Features
- 🔐 JWT authentication and authorization
- 👤 User profiles and gaming history
- 🎮 Game library management
- 🔍 Search and filtering of games
- ⭐ Game ratings and reviews
- 📊 User activity analytics
- ☁️ Cloud gaming session management
- 🎥 Real-time game streaming architecture
- 🤖 Personalized game recommendations

---

# 🏗️ Project Architecture

```

CloudGaming
│
├── Flutter App (Frontend)
│   ├── User Interface
│   ├── Game browsing
│   └── Client-side features
│
├── Express API (Backend - This Repo)
│   ├── API services & routes
│   ├── Authentication
│   ├── Business logic
│   └── Database connection
│
├── database
│   └── MongoDB Atlas
│
└── README.md

```

---

# 🛠️ Tech Stack

## Frontend
- Flutter (Dart)

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose ODM

## Tools
- Git & GitHub
- Postman
- VS Code
- MongoDB Compass

---


# 🗄️ Database Design

The application uses MongoDB Atlas as the cloud database.

Primary collections:

## User_Profile

Stores user credentials, gamertag, and account status.

```text
User_Profile
|
├── _id
├── full_name
├── gamertag
├── email
├── hashed_password
├── country
├── account_status
├── createdAt
└── updatedAt

```

---

## Game_Catalog

Stores available cloud games and metadata.

```text
Game_Catalog
|
├── _id
├── game_id
├── title
├── genre
├── publisher
├── rating
├── is_4k_supported
├── createdAt
└── updatedAt

```

---

## Game_Addons

Stores downloadable content and cosmetics for games.

```text
Game_Addons
|
├── _id
├── game_id
├── addon_title
├── type
├── price
├── createdAt
└── updatedAt

```

---

## Subscription_Tier

Stores available membership plans and stream limits.

```text
Subscription_Tier
|
├── _id
├── tier_name
├── price_monthly
├── max_resolution
├── simultaneous_streams
├── createdAt
└── updatedAt

```

---

## Billing_History

Tracks user payment logs and subscription charges.

```text
Billing_History
|
├── _id
├── transaction_id
├── user_email
├── amount
├── payment_method
├── payment_status
├── createdAt
└── updatedAt

```

---

## Streaming_Session

Tracks active and past cloud gaming streaming sessions.

```text
Streaming_Session
|
├── _id
├── session_id
├── user_email
├── game_title
├── resolution
├── fps
├── latency_ms
├── session_status
├── createdAt
└── updatedAt

```

---

## Server_Node

Monitors infrastructure hardware and regional server loads.

```text
Server_Node
|
├── _id
├── node_id
├── region
├── gpu_type
├── status
├── load_percentage
├── createdAt
└── updatedAt

```

---

## Achievement_Log

Stores unlocked gaming achievements and reward points.

```text
Achievement_Log
|
├── _id
├── user_email
├── game_title
├── achievement_title
├── points_awarded
├── createdAt
└── updatedAt

```


---

# ⚙️ Installation and Setup

## 1. Clone Repository

```bash
git clone <repository-url>

cd cloudgaming
````

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Seed the database with initial data:

```bash
npm run seed.js
```

Start backend(Development Mode)

```bash
npm start
```

Expected output:

```
X-Cloud Server running on port 10000
X-Cloud Nexus: DB Connected Successfully
```

---

# Connecting to Flutter Frontend

When connecting your Flutter application to this backend:

1. Android Emulator: Use http://10.0.2.2:10000/api

2. iOS Simulator / Local Web: Use http://localhost:10000/api

3. Physical Device: Use your local network IP or an Ngrok tunnel (ngrok http 10000).

---

# 🔐 Environment Variables

Sensitive information should never be committed to GitHub.

Example:

```
.env
```

contains:

```
MONGO_URI=
JWT_SECRET=
PORT=
```

Make sure `.env` is added to:

```
.gitignore
```

---

# 🌐 MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Add your IP address
5. Copy the connection string
6. Add it to `.env`

Example:

```
mongodb+srv://username:password@cluster.mongodb.net/cloudgaming
```

---

# 📌 Development Roadmap

## Phase 1 — Foundation

* [x] Project setup
* [x] Git repository
* [x] MongoDB Atlas connection

## Phase 2 — Backend Development

* [x] Create API structure
* [x] Database models (Mongoose)
* [x] Seed data scripts
* [x] CRUD operations
* [ ] JWT Authentication

## Phase 3 — Frontend Development

* [x] UI design & layout
* [x] Authentication pages
* [x] Game dashboard & API fetch
* [x] User profile

## Phase 4 — Cloud Gaming Features

* [ ] Gaming session management
* [ ] WebRTC Streaming architecture
* [ ] Performance monitoring
* [ ] Recommendation system

---

# 🔮 Future Improvements

* WebRTC-based game streaming
* GPU server integration
* Real-time multiplayer support
* AI-powered game recommendations
* Cloud infrastructure deployment
* Scalable microservice architecture

```
**currenlty "real-time game streaming" not completed**
```
---

# 🤝 Contribution

Contributions, suggestions, and improvements are welcome.

Steps:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📄 License

This project is developed for learning, experimentation, and scalable purposes.

---

# 👨‍💻 Author

**Logic-Voyager**

GitHub: <https://github.com/Logic-Voyager/cloudgaming>


