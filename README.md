# NeoBank — MERN Stack Authentication Flow

A modern banking dashboard web app built using the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring full user authentication and authorization, including protected routes and secure token handling.

---

##  Features

- **JWT-based User Authentication** (register, login, auto-login with `localStorage`)
- **Protected Backend Routes** using middleware to validate token
- **React Context API** for managing authentication state
- **Client-side Routing** with React Router
- **Form Validation** with real-time feedback
- **Clean & Scalable Structure**

---

##  Project Structure

NeoBank/

├── client/ # React frontend

│ ├── src/

│ ├── context/ # AuthContext using createContext + useReducer

│ ├── pages/ # Register, Login, Dashboard

│ ├── components/ # Navbar, PrivateRoute, etc.

│ └── App.js # Route configuration

└── server/ # Express backend

├── controllers/ # Authentication logic

├── middleware/ # authMiddleware.js (JWT verification)

├── models/ # User schema (MongoDB/Mongoose)

├── routes/ # authRoutes.js

├── config/ # Database connection setup

└── server.js # Server entry point

---

##  Tech Stack
-------------------------------------------------------------------------------
| Frontend      | Backend           | Auth        | Tools                     |
|---------------|-------------------|-------------|---------------------------|
| React         | Node.js & Express | JWT         | ESLint, Prettier, Postman |
| Tailwind CSS  | MongoDB (Mongoose)| bcrypt      |                           |
-------------------------------------------------------------------------------

---

##  Setup & Running Locally

### Backend
```bash
cd server
npm install
# Create .env file using the template below
npm run dev
```

### Frontend
```bash
cd client
npm install
npm start
```

Visit the frontend (typically at http://localhost:3000 or http://localhost:3001 depending on your setup).

---

## Environment Variables

### Backend (server/.env)

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Frontend (client/.env — if needed)

REACT_APP_API_URL=http://localhost:5000

---

## Screenshots


---

## Further Enhancements

•  Logout functionality

•  Handling JWT token expiry and refresh flow

•  Implementing role-based access control

•  Adding toast notifications for user feedback

•  Dashboard UI enhancements (charts, transaction summaries, etc.)

---

## Contribution

Contributions and suggestions are welcome! Feel free to fork, send PRs, or open issues.

---

## License

© 2025 Mridul