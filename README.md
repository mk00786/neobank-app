# 🏦 NeoBank — MERN Stack Authentication Flow

A modern banking dashboard web app built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with full user authentication and authorization flow, including protected routes and secure token handling.

---

## 🚀 Features

- 🔐 JWT-based User Authentication
- 📄 Register, Login, Auto Login with `localStorage`
- 🛡️ Protected Backend Routes
- 👨‍💻 React Context-based Auth State Management
- ✅ Form Validation with Feedback
- 🧭 Client-side Routing with React Router
- 📦 Clean and Scalable Folder Structure

---

## 📂 Project Structure (Simplified)

NeoBank/
├── client/ # React Frontend
│ ├── src/
│ │ ├── context/ # AuthContext using createContext + useReducer
│ │ ├── pages/ # Register, Login, Dashboard
│ │ ├── components/ # Navbar, PrivateRoute, etc.
│ │ └── App.js # Routes config
│ └── ...
└── server/ # Express Backend
├── controllers/ # Auth Logic
├── middleware/ # authMiddleware.js (JWT verification)
├── models/ # User Schema
├── routes/ # authRoutes.js
├── config/ # DB connection
└── server.js

---

## 🧠 Auth Flow Summary

### 🔄 1. **Register**
- Frontend calls `/api/auth/register` with form data
- Backend validates → creates user → returns JWT token
- Frontend stores token in `localStorage` and updates context

### 🔐 2. **Login**
- POST to `/api/auth/login` with credentials
- On success → token + user returned → stored in `localStorage`

### 🔁 3. **Auto Login**
- On App load → check `localStorage.token`
- If valid → call `/api/auth/me` → restore user in context

### 🛡️ 4. **Protected Routes**
- Frontend wraps components with `<PrivateRoute />`
- Backend uses `authMiddleware` to validate JWT for protected APIs

---

## ✅ Tech Stack

- **Frontend**: React, React Router, Context API, Tailwind CSS
- **Backend**: Express.js, MongoDB (Mongoose), JWT
- **Auth**: bcrypt for hashing, jsonwebtoken for token
- **Dev Tools**: Postman, ESLint, Prettier

---

## 🧪 How to Run

### 🔧 Backend
```bash
cd server
npm install
npm run dev

### 🛠️ To-Do Next
 Dashboard UI Enhancements

 Logout functionality

 Token Expiry Handling

 Toast notifications for feedback

 Role-based Access Control (Admin/User)

 🤝 Contributions
Feel free to fork or suggest improvements! This project is open for learning and collaboration.

📘 License
MIT © 2025 Mridul Kapoor