---
inclusion: auto
---

# If She Stopped — Project Standards

## Project Overview
This is a full-stack web application with:
- **Frontend**: React + Vite + Tailwind CSS v4 (`frontend/`)
- **Backend**: Node.js + Express + MongoDB (`backend/`)
- **Python**: Flask stats microservice (`python/`)

## Coding Standards

### React / Frontend
- Use functional components with hooks only — no class components
- All components live in `frontend/src/components/`
- Use Tailwind utility classes for all styling — no inline style objects unless for dynamic values (gradients, widths)
- Animation classes (`fade-in-up`, `shake`, `pulse-btn`) are defined in `frontend/src/index.css`
- State management via `useState` / `useReducer` — no external state library
- All static data (roles, tasks, messages) lives in `frontend/src/data.js`
- API calls go through `frontend/src/api.js`

### Node.js / Backend
- All routes use async/await with try/catch
- JWT auth via `backend/middleware/auth.js` — apply to all protected routes
- MongoDB models in `backend/models/`
- Routes in `backend/routes/` — keep each file focused on one resource
- Never expose password fields in responses — use the `sanitize()` pattern

### Python
- Flask app in `python/app.py`
- Runs on port 5001
- CORS allowed for `http://localhost:5173` only
- All endpoints prefixed with `/api/stats/`

## File Naming
- React components: PascalCase (`ImpactDisplay.jsx`)
- Utilities/data: camelCase (`data.js`, `api.js`)
- Backend routes: camelCase (`auth.js`, `simulate.js`)

## Ports
- Frontend: 5173
- Backend (Node): 5000
- Python stats: 5001
- MongoDB: 27017
