# If She Stopped: Building a Simulation App to Make Invisible Labor Visible

> A full-stack project built with React, Node.js, Python, and MongoDB — and what I learned building it with Kiro on AWS.

---

## The Idea

Every day, millions of women wake up and carry an invisible weight — not just physical tasks, but the mental load of remembering, planning, anticipating, and holding everything together. Cooking meals, managing appointments, resolving conflicts, checking in on everyone's emotional state, being the social glue.

This work is real. It has enormous value. And it is almost entirely invisible.

**"If She Stopped"** is a simulation app that asks a simple question: *what would happen if she stopped doing all of this?*

Users select roles (Mother, Partner, Caregiver, Professional, Family Planner...) and responsibilities (cooking, childcare, emotional support, managing finances...), then run a simulation. The app shows the ripple effect — what breaks, what suffers, what disappears — when that invisible labor stops.

The goal isn't blame. It's visibility.

---

## The Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Stats API | Python 3, Flask, PyMongo |
| Auth | JWT + bcrypt |
| Dev tooling | Kiro (AI IDE), MCP servers |

---

## Project Structure

```
if-she-stopped/
├── frontend/          # React app
│   └── src/
│       ├── components/    # 16 UI components
│       ├── App.jsx        # Main simulation logic
│       ├── data.js        # Roles, tasks, insights
│       └── api.js
├── backend/           # Express REST API
│   ├── routes/        # auth, simulate, user
│   ├── models/        # User, SimulationLog
│   └── server.js
└── python/            # Flask stats microservice
    └── app.py
```

---

## The Data Model

The heart of the app is in `data.js` — roles and tasks that map to each other, each with an impact message that shows what happens when that responsibility disappears.

```js
export const roles = [
  { id: 'mother', label: 'Mother', emoji: '👩‍👧', 
    description: 'Nurturing, caregiving, and raising children', 
    category: 'household' },
  { id: 'partner', label: 'Partner', emoji: '💑', 
    description: 'Emotional support and relationship management', 
    category: 'emotional' },
  { id: 'planner', label: 'Family Planner', emoji: '📋', 
    description: 'Organizing schedules, appointments, and logistics', 
    category: 'planning' },
  // ...8 roles total
];

export const tasks = [
  { 
    id: 'emotional-support', 
    label: 'Listening & Emotional Support', 
    emoji: '💬', 
    category: 'emotional', 
    roleIds: ['partner', 'mother', 'caregiver', 'friend'], 
    impactMessage: 'No one listens anymore. Tensions rise. Relationships begin to fracture silently.' 
  },
  { 
    id: 'cooking', 
    label: 'Cooking Meals', 
    emoji: '🍳', 
    category: 'household', 
    roleIds: ['mother', 'homemaker', 'partner'], 
    impactMessage: 'No meals are prepared. Hunger sets in. Children cry. The kitchen goes cold and silent.' 
  },
  { 
    id: 'mental-load', 
    label: 'Carrying the Mental Load', 
    emoji: '🧠', 
    category: 'planning', 
    roleIds: ['planner', 'partner', 'mother'], 
    impactMessage: 'No one remembers what needs to be done. Everything falls through the cracks simultaneously.' 
  },
  // ...16 tasks total
];
```

Each task has `roleIds` — so when a user selects roles, only relevant tasks appear. Clean filtering, no hardcoded conditionals.

---

## The Simulation Flow

The app has four emotional states that drive the UI:

```
calm → disruption → chaos → reflection
```

Each state changes the background, colors, and tone of the entire app. Here's how the state machine works in `App.jsx`:

```jsx
const bgClass = {
  calm: 'state-calm',
  disruption: 'state-disruption',
  chaos: 'state-chaos',
  reflection: 'state-reflection',
};

const handleSimulate = () => {
  if (selectedRoles.length === 0) { setRoleError('Please select at least one role.'); return; }
  if (selectedTasks.length === 0) { setTaskError('Please select at least one responsibility.'); return; }
  
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setSimulationState('disruption');
    setShowImpact(true);
  }, 1200);
};

const handleAllImpactsShown = useCallback(() => {
  setSimulationState('chaos');
  setTimeout(() => {
    setSimulationState('reflection');
    setShowInsight(true);
  }, 1500);
}, []);
```

The `calm → disruption` transition happens when the user clicks simulate. `chaos → reflection` happens after all impact cards have been shown. The final reflection state shows the insight, badges, journal, and share card.

---

## Backend: Auth with Streak Tracking

The auth system does more than just login — it tracks daily streaks. Every time a user logs in, we check if they visited yesterday and increment the streak accordingly:

```js
// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Incorrect password' });

  // Streak logic
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  let streak = user.streak;
  
  if (user.lastVisit !== today) {
    streak = user.lastVisit === yesterday ? streak + 1 : 1;
    user.streak = streak;
    user.lastVisit = today;
    await user.save();
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: sanitize(user) });
});
```

The same streak logic runs on the frontend for users who are already logged in (using `localStorage`), so the streak stays accurate even without a backend call on every visit.

---

## Backend: Logging Simulations

Every completed simulation gets logged to MongoDB:

```js
// SimulationLog model
const simulationLogSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  selectedRoles: [{ type: String }],
  selectedTasks: [{ type: String }],
  impactCount:   { type: Number },
  completedAt:   { type: Date, default: Date.now },
});

// POST /api/simulate
router.post('/', authMiddleware, async (req, res) => {
  const { selectedRoles, selectedTasks } = req.body;

  await SimulationLog.create({
    userId: req.user.id,
    selectedRoles,
    selectedTasks,
    impactCount: selectedTasks.length,
  });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $inc: { totalSims: 1 } },
    { new: true }
  );

  res.json({ message: 'Simulation logged', totalSims: user.totalSims });
});
```

This data feeds the stats dashboard — which roles are most selected, which tasks resonate most, how many simulations happen per day.

---

## Python Stats Microservice

Rather than cramming analytics into the Node backend, a separate Python/Flask service handles all the aggregation queries. It connects to the same MongoDB instance and exposes clean endpoints:

```python
@app.route("/api/stats/top-roles", methods=["GET"])
def top_roles():
    all_roles = []
    for doc in logs_col.find({}, {"selectedRoles": 1}):
        all_roles.extend(doc.get("selectedRoles", []))

    counts = Counter(all_roles)
    top = [
        {"role": ROLE_LABELS.get(r, r), "id": r, "count": c}
        for r, c in counts.most_common(8)
    ]
    return jsonify(top)

@app.route("/api/stats/daily", methods=["GET"])
def daily_trend():
    pipeline = [
        {
            "$group": {
                "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$completedAt"}},
                "count": {"$sum": 1},
            }
        },
        {"$sort": {"_id": -1}},
        {"$limit": 7},
    ]
    result = list(logs_col.aggregate(pipeline))
    result.reverse()
    return jsonify([{"date": r["_id"], "count": r["count"]} for r in result])
```

The stats dashboard in the frontend calls these endpoints and renders the data visually. Seeing which roles and tasks people simulate most is one of the most powerful parts of the app — it shows what resonates, what people recognize in their own lives.

---

## Features Built

- Role selection with category filtering
- Task simulation with animated impact reveals
- Four-state emotional UI (calm → disruption → chaos → reflection)
- Daily streak tracking
- Badge unlocks based on simulation patterns
- Reflection journal (saved per user)
- Daily challenges
- Time calculator (estimates hours of invisible work per week)
- Impact meter (visual weight of selected tasks)
- Shareable simulation cards
- Stats dashboard (top roles, top tasks, daily trends)
- Full auth (register, login, JWT)

---

## Building With Kiro

This project was built using [Kiro](https://kiro.dev), an AI IDE. The `.kiro/` folder in the repo contains:

- `specs/` — requirements, design docs, and task lists generated during planning
- `steering/` — project standards and component guidelines that Kiro references during development
- `skills/` — custom skill files for project-specific context

Having the spec files in the repo means the design decisions are documented alongside the code. Anyone cloning the repo can read `requirements.md` and `design.md` to understand *why* things were built the way they were, not just *how*.

---

## AWS Builder Center

This project was built as part of the AWS builder community. [AWS Builder Center](https://builder.aws.com) is a platform for cloud builders to connect, share knowledge, and access resources — including community programs, hands-on workshops, and a Wishlist feature to submit ideas directly to AWS product teams.

If you're building something with social impact on AWS, it's worth joining the community there.

---

## Running It Yourself

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB running locally

### Backend
```bash
cd backend
npm install
cp .env.example .env   # add your MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Python Stats API
```bash
cd python
pip install -r requirements.txt
python app.py
```

---

## What I Learned

**1. Emotional design is a real constraint.** Most apps have one visual state. This one has four, each with a different emotional tone. Every component had to work in all four states. That's a design challenge most tutorials don't cover.

**2. Separate your analytics early.** The Python stats service was added late. It should have been planned from the start. If you know you'll need aggregation queries, put them in their own service from day one.

**3. The data model is the product.** The roles, tasks, and impact messages in `data.js` are what make this app meaningful. Getting those right — the wording, the emotional weight, the accuracy — took more iteration than any of the code.

**4. Invisible work needs visible data.** The stats dashboard wasn't in the original plan. But seeing that "Carrying the Mental Load" is the most-selected task across all simulations is powerful. Data makes the invisible visible in a different way than the simulation does.

---

## Source Code

GitHub: [github.com/your-username/if-she-stopped](https://github.com/your-username/if-she-stopped)

---

*Built with React, Node.js, Python, MongoDB, and Kiro. Part of the AWS builder community.*
