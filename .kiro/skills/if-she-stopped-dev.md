# If She Stopped — Developer Skill

## Purpose
This skill provides context and guidance for developing the "If She Stopped — Impact Simulator" project. Activate this when working on any part of the codebase.

## Project Stack
- Frontend: React 19 + Vite + Tailwind CSS v4
- Backend: Node.js + Express + MongoDB + Mongoose
- Python: Flask + PyMongo (stats microservice)
- Auth: JWT (jsonwebtoken + bcryptjs)

## Running the Project
```bash
# Terminal 1 — MongoDB
mongod

# Terminal 2 — Backend
cd backend && npm run dev

# Terminal 3 — Python stats
cd python && python app.py

# Terminal 4 — Frontend
cd frontend && npm run dev
```

## Key Files
- `frontend/src/App.jsx` — root component, all state lives here
- `frontend/src/data.js` — all roles, tasks, impact messages
- `frontend/src/api.js` — all fetch calls to Node backend
- `backend/server.js` — Express app entry point
- `backend/routes/auth.js` — register + login
- `backend/routes/simulate.js` — log simulations
- `python/app.py` — stats endpoints

## Adding a New Component
1. Create `frontend/src/components/ComponentName.jsx`
2. Export as default function
3. Import and use in `App.jsx`
4. Add to component table in `.kiro/steering/component-guide.md`

## Adding a New Backend Route
1. Create `backend/routes/routename.js`
2. Import and mount in `backend/server.js` as `/api/routename`
3. Add auth middleware for protected routes
4. Update `frontend/src/api.js` with the new fetch function

## Adding a New Python Endpoint
1. Add route in `python/app.py` under `/api/stats/`
2. Query MongoDB via `pymongo`
3. Fetch from `StatsDashboard.jsx` or new frontend component

## Simulation State Machine
```
calm → disruption → chaos → reflection
```
Controlled by `simulationState` in `App.jsx`.

## localStorage Keys
- `iss_user` — user profile + streak + totalSims
- `iss_journal` — reflection journal entries (array)
- `iss_daylogs` — day tracker logs (object keyed by date string)
- `iss_challenge` — date of last accepted daily challenge
- `iss_celebrated` — week key of last celebration shown
- `iss_token` — JWT auth token
