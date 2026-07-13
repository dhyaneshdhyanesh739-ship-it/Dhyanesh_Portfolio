# Futuristic Cinematic Developer Portfolio - Dhyanesh S E

This is a futuristic digital operating system portfolio built for **Dhyanesh S E**, showcasing his expertise as a Full Stack MERN Developer and Artificial Intelligence & Data Science Student. 

The application utilizes high-performance 3D rendering (Three.js/React Three Fiber), cinematic timelines (GSAP, Framer Motion), smooth scrolling, and a robust Express/MongoDB backend service to record contact messages.

---

## 🌌 The Cinematic Experience Flow

1. **Scene 1 (Intro):** A minimalist dark universe filled with drifting stellar particles and shifting aurora glows. Typewriter animations display cinematic quotes. A glassmorphic button with magnetic parallax hover transitions initiates the boot.
2. **Scene 2 (Tunnel Travel):** A high-speed travel transition traversing a volumetric, multi-color additive blended particle tunnel.
3. **Scene 3 (Spawn LOQ Laptop):** A detailed procedural 3D model of a Lenovo LOQ Laptop appears. Features detailed PBR metal/roughness values, touchpad, power LED indicators, and side/rear port styling.
4. **Scene 4 (Computer Boot Sequence):** Clicking the laptop opens the lid, spins dual cooling fans beneath, activates keyboard RGB lighting cycles, and displays a cybernetic computer BIOS boot console logging kernel files, ending with a camera zoom-in straight into the screen.
5. **Scene 5 (OS HUD Dashboard):** A futuristic Operating System interface mapping widgets, system clock, CPU load gauges, social keys, download credentials (real resume PDF), and navigates 8 reactive tab panels containing:
   - **About (Biometrics):** Journey bio, academic timelines (Kalaignar Karunanidhi Institute of Technology, CGPA 8.24), and count-up stats.
   - **Skills Orbit:** Interactive 3D tag globe. Spheres scale and glow on hover, and trigger a radial particle explosion when clicked.
   - **Project Deck:** Immersive project display highlighting architecture schemas, case studies, structural barriers, and solutions.
   - **Experience Logs:** Detailed timeline documenting MERN internship contributions at Arumexa Technology Private Limited.
   - **Certifications Vault:** Horizontal sliding glass carousel hosting verified Coursera and Cisco credentials.
   - **Algorithm Control:** Analytical LeetCode and CodeChef dashboard with custom SVG activity graphs and rating indexes.
   - **Hackathons:** Achievements log showcasing projects and rendering a 3D rotating metallic bronze trophy for the 3rd Prize.
   - **Transmission (Contact):** A validated contact terminal connected to the MongoDB backend that supports Nodemailer email pings.

---

## 🛠️ Enterprise Directory Structure

```
Kiddo Portfolio/
├── backend/
│   ├── config/             # Database connection definitions
│   ├── controllers/        # Express request controller logic
│   ├── models/             # Mongoose MongoDB models
│   ├── routes/             # REST route bindings
│   ├── .env                # Runtime environment variables
│   ├── package.json        # Service dependencies
│   └── server.js           # Server application entry point
├── frontend/
│   ├── public/             # Static assets (contains dhyaneshresume.pdf)
│   ├── src/
│   │   ├── components/     # Modulized UI panels & 3D WebGL assets
│   │   ├── App.jsx         # Global state flow and scene machine
│   │   ├── index.css       # Tailwind base, neon utility glows
│   │   └── main.jsx        # App bundle mount loader
│   ├── package.json        # Bundle dependency manifests
│   └── tailwind.config.js  # Theme configuration declarations
└── README.md               # Operations manual
```

---

## 🚀 Execution & Setup Guide

### System Prerequisites
- **Node.js:** v18.0.0 or higher
- **MongoDB:** Local instance running or a MongoDB Atlas Connection URI

### 1. Backend Service Launch
1. Open a terminal and navigate to the backend:
   ```bash
   cd backend
   ```
2. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
3. (Optional) Edit `.env` to input your SMTP Gmail or Mailtrap credentials for real email alerts. Mongoose will default to `mongodb://127.0.0.1:27017/portfolio` if no `MONGO_URI` is specified.
4. Run in development mode (launches server with Nodemon reloading):
   ```bash
   npm run dev
   ```
5. The API is hosted at: `http://localhost:5000`

### 2. Frontend Development Server Launch
1. Open a new terminal and navigate to the frontend:
   ```bash
   cd ../frontend
   ```
2. Run the Vite development compiler:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

---

## 📈 Deployment Specifications

### MongoDB Atlas Setup
1. Create a free shared cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Database User and configure network access to allow access from any IP (`0.0.0.0/0`).
3. Copy your Connection String, replacing the placeholder password. Set this as `MONGO_URI` in the backend production env.

### Backend Hosting (Render / Heroku)
- **Deployment Platform:** [Render](https://render.com/) (Web Service)
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- Add environment variables (`MONGO_URI`, `SMTP_USER`, `SMTP_PASS`, etc.) directly to the Render Dashboard.

### Frontend Hosting (Vercel / Netlify)
- **Deployment Platform:** [Vercel](https://vercel.com/)
- **Framework Preset:** `Vite`
- **Output Directory:** `dist`
- Set `VITE_API_URL` as an environment variable in Vercel to point to your live backend endpoint.
