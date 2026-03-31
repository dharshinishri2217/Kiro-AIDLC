# Requirements Document

## Introduction

If She Stopped — Impact Simulator is an interactive web application that lets users explore the invisible labor performed by women in households, workplaces, and communities. Users select roles and associated responsibilities, then trigger a simulation that reveals what happens when those tasks suddenly stop. The system responds with visual changes and contextual impact messages to create an emotional and informational experience.

The purpose of the system is to make invisible work visible — to surface the emotional, mental, and domestic labor that often goes unacknowledged, and to help users develop empathy and awareness around it.

Target users include general web users, educators, students, advocates, and anyone interested in understanding gender equity and the distribution of unpaid labor.

---

## Problem Statement

Women disproportionately carry the burden of invisible work — tasks that are rarely counted, rarely credited, and rarely noticed until they stop. This includes domestic responsibilities like cooking, cleaning, and childcare, as well as emotional labor like managing relationships, anticipating needs, and providing mental support to others.

Because this work is invisible by nature, it is easy to underestimate or dismiss. There is no paycheck, no performance review, and no recognition. When it disappears, the consequences ripple across families, workplaces, and communities — yet the connection is rarely made.

This problem matters because awareness is the first step toward change. By simulating the absence of this labor, the application creates a moment of recognition that data and arguments alone often cannot achieve.

---

## Objectives

- Allow users to select one or more roles that represent real-world identities (e.g., Mother, Partner, Employee, Caregiver)
- Allow users to select specific tasks and responsibilities associated with those roles
- Simulate what happens when those selected tasks stop being performed
- Show the impact through dynamic UI changes and contextual impact messages
- Deliver a final insight message that ties the experience together
- Create awareness and emotional understanding of invisible labor

---

## Scope

### In Scope

- Role selection interface
- Task selection interface based on chosen roles
- Simulation trigger (a button or action that starts the simulation)
- UI transformation after simulation (visual shift from calm/ordered to chaotic/neglected)
- Per-task impact messages shown after simulation
- A final insight message summarizing the overall impact

### Out of Scope

- External API integrations or third-party data sources
- Complex AI-generated content or machine learning features
- Real-time tracking systems or persistent user accounts
- Backend databases or server-side processing

---

## User Personas

### Persona 1 — The Curious Student

Name: Amara, 22, university student studying sociology

Description: Amara is researching gender roles and unpaid labor for a class project. She wants to understand the scope of invisible work in a way that goes beyond statistics.

Needs: An engaging, easy-to-use tool that illustrates the concept clearly without requiring prior knowledge.

Goals: To experience the simulation, understand the impact, and use the insight as supporting material for her research.

### Persona 2 — The Reflective Partner

Name: Daniel, 35, working professional in a two-income household

Description: Daniel has heard conversations about invisible labor but has never fully internalized what it means in practice. He wants to understand his partner's experience better.

Needs: A non-judgmental, visually clear experience that helps him connect emotionally with the concept.

Goals: To complete the simulation, feel the weight of what stops when invisible work stops, and walk away with a new perspective.

---

## User Stories

1. As a user, I want to see a list of available roles, so that I can choose the ones that feel relevant to me or someone I know.
2. As a user, I want to select multiple roles at once, so that I can represent the full complexity of a person's responsibilities.
3. As a user, I want to see tasks associated with my selected roles, so that I can understand what specific work is being performed.
4. As a user, I want to select individual tasks from the list, so that I can customize which responsibilities are included in the simulation.
5. As a user, I want to trigger the simulation with a clear action, so that I know when the experience begins.
6. As a user, I want to see the UI change visually after the simulation starts, so that I can feel the difference between order and chaos.
7. As a user, I want to read impact messages for each stopped task, so that I understand the specific consequences of each responsibility disappearing.
8. As a user, I want to see a final insight message at the end of the simulation, so that I leave with a clear understanding of the overall impact.
9. As a user, I want the application to work on my phone, so that I can use it anywhere without needing a desktop.
10. As a user, I want the transitions and animations to feel smooth, so that the experience feels intentional and emotionally resonant.

---

## Functional Requirements

### Role Selection

- THE Simulator SHALL display a list of predefined roles on the initial screen
- THE Simulator SHALL allow the user to select one or more roles before proceeding
- WHEN a role is selected, THE Simulator SHALL visually indicate the selected state
- WHEN no role is selected and the user attempts to proceed, THE Simulator SHALL display a prompt asking the user to select at least one role

### Task Selection

- WHEN one or more roles are selected, THE Simulator SHALL display a list of tasks associated with those roles
- THE Simulator SHALL allow the user to select multiple tasks from the list
- WHEN a task is selected, THE Simulator SHALL visually indicate the selected state
- WHEN no task is selected and the user attempts to run the simulation, THE Simulator SHALL display a prompt asking the user to select at least one task

### Simulation

- WHEN the user triggers the simulation, THE Simulator SHALL process all selected tasks
- WHEN the simulation runs, THE Simulator SHALL generate an impact message for each selected task
- THE Simulator SHALL display all impact messages after the simulation completes
- IF the simulation encounters an error, THEN THE Simulator SHALL display a fallback message and allow the user to retry

### Visualization

- WHEN the simulation is triggered, THE Simulator SHALL transition the UI from a calm, ordered visual state to a chaotic or neglected visual state
- THE Simulator SHALL use visual cues such as color shifts, layout changes, or iconography to represent the impact
- WHILE the simulation is running, THE Simulator SHALL display a loading or transition state to indicate progress

### Insight

- WHEN all impact messages have been displayed, THE Simulator SHALL show a final insight message summarizing the overall impact of the stopped tasks
- THE Simulator SHALL present the final insight message in a visually distinct and prominent format

---

## Engagement Features

- THE Simulator SHALL display a motivational or reflective closing message after the final insight, encouraging the user to share or reflect
- WHERE the user has completed a simulation, THE Simulator SHALL offer a simple way to restart and explore a different set of roles or tasks
- THE Simulator SHALL include a brief prompt or question at the end to invite the user to consider their own relationship to the tasks shown

---

## Non-Functional Requirements

- WHEN a user interaction occurs, THE Simulator SHALL respond within 300 milliseconds to maintain a feeling of responsiveness
- THE Simulator SHALL render correctly on screen widths from 320px to 2560px to support mobile, tablet, and desktop devices
- THE Simulator SHALL use a clean, uncluttered visual design that does not distract from the emotional content
- WHEN UI transitions occur, THE Simulator SHALL animate them smoothly at a minimum of 30 frames per second

---

## Constraints

- The implementation must be achievable within a limited development timeline, favoring simplicity over complexity
- The system must use a straightforward front-end implementation without requiring a backend server or database
- All role and task data must be defined statically within the application

---

## Assumptions

- Users are assumed to have basic familiarity with web UI interactions such as clicking, selecting, and scrolling
- The tasks and roles defined in the application are assumed to represent real-world activities that users can relate to
- Users are assumed to have access to a modern web browser with JavaScript enabled
- The application does not need to support offline use

---

## Success Criteria

- A user can complete the full simulation flow from role selection to final insight without confusion or errors
- A user reports or demonstrates understanding of the impact shown by the simulation
- The UI transitions and impact messages create an emotionally engaging experience that feels intentional
- The application loads and runs without performance issues on a standard mobile device

---

## Future Scope

- AI-generated impact messages personalized to the user's selected roles and tasks
- User personalization features allowing custom roles and tasks to be added
- Anonymous data tracking to surface aggregate insights about which roles and tasks resonate most
- Shareable simulation results that users can post to social media
- Localization and translation support for non-English speaking audiences

---

## System Architecture (High-Level)

```
If She Stopped — Impact Simulator
├── Frontend (React + Tailwind CSS)
│   ├── RoleSelector Component
│   ├── TaskSelector Component
│   ├── SimulationButton Component
│   ├── ImpactDisplay Component
│   │   └── ImpactCard (per task)
│   └── FinalInsight Component
│
├── Backend (Node.js + Express) [Optional / Future]
│   ├── API Routes
│   ├── Controllers
│   └── Services
│
└── Database (MongoDB) [Optional / Future]
    ├── Roles & Tasks Collection
    └── User Logs Collection
```
