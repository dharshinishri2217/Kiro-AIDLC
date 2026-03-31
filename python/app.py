from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from collections import Counter
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/if-she-stopped"))
db = client["if-she-stopped"]
logs_col = db["simulationlogs"]
users_col = db["users"]

# Role and task labels for display
ROLE_LABELS = {
    "mother": "Mother",
    "partner": "Partner",
    "caregiver": "Caregiver",
    "employee": "Professional",
    "homemaker": "Homemaker",
    "planner": "Family Planner",
    "friend": "Friend & Confidant",
    "mentor": "Mentor",
}

TASK_LABELS = {
    "emotional-support": "Listening & Emotional Support",
    "conflict-resolution": "Resolving Family Conflicts",
    "mental-health-check": "Checking In on Others",
    "celebration": "Remembering Birthdays & Milestones",
    "cooking": "Cooking Meals",
    "childcare": "Childcare & Supervision",
    "cleaning": "Cleaning & Tidying",
    "elder-care": "Elder Care",
    "grocery": "Grocery & Errands",
    "appointments": "Managing Appointments",
    "mental-load": "Carrying the Mental Load",
    "social-glue": "Being the Social Glue",
    "finances": "Managing Household Finances",
    "work-balance": "Balancing Work & Home",
    "mentoring": "Mentoring Colleagues",
    "volunteering": "Community Volunteering",
}


@app.route("/api/stats/overview", methods=["GET"])
def overview():
    """Total simulations, total users, average tasks per simulation."""
    total_sims = logs_col.count_documents({})
    total_users = users_col.count_documents({})

    pipeline = [{"$group": {"_id": None, "avg": {"$avg": "$impactCount"}}}]
    result = list(logs_col.aggregate(pipeline))
    avg_tasks = round(result[0]["avg"], 1) if result else 0

    return jsonify({
        "totalSimulations": total_sims,
        "totalUsers": total_users,
        "avgTasksPerSim": avg_tasks,
    })


@app.route("/api/stats/top-roles", methods=["GET"])
def top_roles():
    """Most frequently selected roles across all simulations."""
    all_roles = []
    for doc in logs_col.find({}, {"selectedRoles": 1}):
        all_roles.extend(doc.get("selectedRoles", []))

    counts = Counter(all_roles)
    top = [
        {"role": ROLE_LABELS.get(r, r), "id": r, "count": c}
        for r, c in counts.most_common(8)
    ]
    return jsonify(top)


@app.route("/api/stats/top-tasks", methods=["GET"])
def top_tasks():
    """Most frequently selected tasks across all simulations."""
    all_tasks = []
    for doc in logs_col.find({}, {"selectedTasks": 1}):
        all_tasks.extend(doc.get("selectedTasks", []))

    counts = Counter(all_tasks)
    top = [
        {"task": TASK_LABELS.get(t, t), "id": t, "count": c}
        for t, c in counts.most_common(10)
    ]
    return jsonify(top)


@app.route("/api/stats/daily", methods=["GET"])
def daily_trend():
    """Number of simulations per day (last 7 days)."""
    pipeline = [
        {
            "$group": {
                "_id": {
                    "$dateToString": {"format": "%Y-%m-%d", "date": "$completedAt"}
                },
                "count": {"$sum": 1},
            }
        },
        {"$sort": {"_id": -1}},
        {"$limit": 7},
    ]
    result = list(logs_col.aggregate(pipeline))
    result.reverse()
    return jsonify([{"date": r["_id"], "count": r["count"]} for r in result])


@app.route("/api/stats/impact-distribution", methods=["GET"])
def impact_distribution():
    """Distribution of simulation sizes (how many tasks selected)."""
    pipeline = [
        {"$group": {"_id": "$impactCount", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}},
    ]
    result = list(logs_col.aggregate(pipeline))
    return jsonify([{"taskCount": r["_id"], "simulations": r["count"]} for r in result])


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "If She Stopped — Python Stats API"})


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    print(f"Python stats service running on http://localhost:{port}")
    app.run(port=port, debug=True)
