# If She Stopped

A simulation app that visualizes the invisible labor women carry — as mothers, partners, caregivers, professionals, and more. Users select roles and responsibilities, run a simulation, and see the ripple effect of what would happen if she stopped.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Stats API | Python, Flask, PyMongo |
| Auth | JWT + bcrypt |

## Project Structure

```
if-she-stops/
├── frontend/          # React app (Vite)
│   └── src/
│       ├── components/    # UI components
│       ├── App.jsx        # Main app logic
│       ├── data.js        # Roles, tasks, insights data
│       └── api.js         # API client
├── backend/           # Express REST API
│   ├── routes/        # auth, simulate, user
│   ├── models/        # User, SimulationLog
│   └── server.js
└── python/            # Flask stats microservice
    └── app.py
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB running locally on port 27017

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

### Python Stats API

```bash
cd python
pip install -r requirements.txt
python app.py
```

Runs on `http://localhost:5001`

## Environment Variables

**backend/.env**
```
MONGO_URI=mongodb://localhost:27017/if-she-stopped
JWT_SECRET=your_secret_key
PORT=5000
```

**python/.env**
```
MONGO_URI=mongodb://localhost:27017/if-she-stopped
PORT=5001
```

## Features

- Role selection (Mother, Partner, Caregiver, Professional, and more)
- Task/responsibility simulation with impact messages
- Streak tracking and badges
- Reflection journal
- Daily challenges
- Shareable simulation cards
- Stats dashboard (top roles, top tasks, daily trends)
- User authentication

## API Endpoints

### Node.js Backend (`/api`)
| Method | Route | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login |
| POST | `/simulate` | Log a simulation |
| GET | `/user/profile` | Get user profile |

### Python Stats API (`/api/stats`)
| Method | Route | Description |
|---|---|---|
| GET | `/overview` | Total sims, users, avg tasks |
| GET | `/top-roles` | Most selected roles |
| GET | `/top-tasks` | Most selected tasks |
| GET | `/daily` | Simulations per day (last 7 days) |
| GET | `/impact-distribution` | Task count distribution |
