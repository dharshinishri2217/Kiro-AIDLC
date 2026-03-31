# Design Document — If She Stopped: Impact Simulator

## Overview

The If She Stopped — Impact Simulator is a front-end web application that makes invisible labor visible through emotional storytelling and visual transformation. Users select roles and tasks representing real-world responsibilities, trigger a simulation, and experience a guided UI journey from calm order to disruption and chaos — ending with a reflective insight message.

The core idea is simulation through absence: by showing what stops when invisible work stops, the application creates empathy and awareness that statistics alone cannot achieve.

- Users interact entirely through a browser with no login or backend required
- All data (roles, tasks, impact messages) is defined statically in the application
- The experience is linear: select roles → select tasks → simulate → reflect
- The UI itself is a storytelling medium — visual state changes are part of the narrative


## Architecture

### Frontend Architecture

The application is built as a single-page React application with no backend dependency.

- Framework: React.js (component-based, functional components with hooks)
- State management: React Context API or useState/useReducer at the app level
- Styling: CSS Modules or Tailwind CSS for scoped, responsive styles
- Animations: CSS transitions + Framer Motion for smooth state-driven animations
- Data: Static JSON/JS files co-located with the app

Component tree:

```
App
├── RoleSelector
├── TaskSelector
├── SimulationButton
├── ImpactDisplay
│   └── ImpactCard (per task)
└── FinalInsight
```

### Backend Architecture

No backend is required. All data is bundled with the frontend. If future extensibility is needed, a lightweight Node.js + Express API could serve role/task data and log anonymous usage — but this is out of scope for the current implementation.

### Data Handling

- Roles, tasks, and impact messages are stored as static JavaScript objects
- No network requests are made during normal operation
- No user data is persisted between sessions
- All simulation logic runs client-side


## Components and Interfaces

### RoleSelector

Displays a grid of available roles. Supports multi-selection with clear visual feedback.

Props:
- `roles: Role[]` — list of available roles
- `selectedRoles: string[]` — currently selected role IDs
- `onToggle: (roleId: string) => void` — callback when a role is toggled

Behavior:
- Selected roles show a highlighted/active state
- Attempting to proceed with no roles selected triggers an inline validation message

### TaskSelector

Displays tasks filtered by selected roles. Supports multi-selection.

Props:
- `tasks: Task[]` — tasks derived from selected roles
- `selectedTasks: string[]` — currently selected task IDs
- `onToggle: (taskId: string) => void` — callback when a task is toggled

Behavior:
- Only shows tasks belonging to at least one selected role
- Attempting to simulate with no tasks selected triggers an inline validation message

### SimulationButton

A prominent call-to-action button that triggers the simulation.

Props:
- `disabled: boolean` — disabled when no tasks are selected
- `onClick: () => void` — starts the simulation

Behavior:
- Visually distinct (size, color, label)
- Shows a loading/transition state while simulation processes

### ImpactDisplay

Renders impact messages for each selected task, revealed progressively.

Props:
- `impacts: ImpactMessage[]` — list of impact messages to display
- `simulationState: SimulationState` — current visual state of the UI

Behavior:
- Messages fade in one by one with a staggered delay
- Visual container reflects the current simulation state (calm → disruption → chaos)

### FinalInsight

Displays the concluding emotional message after all impact cards are shown.

Props:
- `message: string` — the final insight text
- `onRestart: () => void` — resets the simulation

Behavior:
- Appears only after all impact messages have been displayed
- Visually prominent — centered, large typography, reflection-state styling
- Includes a restart prompt and a reflective closing question


## Data Models

### Role

```
{
  id: string,
  label: string,           // e.g. "Mother", "Partner", "Caregiver"
  description: string,     // short description of the role
  taskIds: string[]        // IDs of tasks associated with this role
}
```

### Task

```
{
  id: string,
  label: string,           // e.g. "Preparing meals", "Managing appointments"
  roleIds: string[],       // roles this task belongs to
  impactMessage: string    // what happens when this task stops
}
```

### SimulationState

```
type SimulationState = "calm" | "disruption" | "chaos" | "reflection"
```

### AppState

```
{
  selectedRoles: string[],
  selectedTasks: string[],
  simulationState: SimulationState,
  displayedImpacts: string[],   // task IDs whose impact messages have been shown
  simulationComplete: boolean
}
```

### ImpactMessage

```
{
  taskId: string,
  message: string
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Role selection reflects toggle state

*For any* role in the role list, toggling it on then off should return the selected roles list to its original state (round-trip invariant).

**Validates: Requirements — Role Selection (visual indication of selected state)**

### Property 2: Task list is always a subset of selected roles

*For any* combination of selected roles, every task displayed in the TaskSelector must belong to at least one of the selected roles — no tasks from unselected roles should appear.

**Validates: Requirements — Task Selection (tasks associated with selected roles)**

### Property 3: Task selection reflects toggle state

*For any* task in the task list, toggling it on then off should return the selected tasks list to its original state (round-trip invariant).

**Validates: Requirements — Task Selection (visual indication of selected state)**

### Property 4: Simulation produces one impact message per selected task

*For any* non-empty set of selected tasks, running the simulation should produce exactly one impact message for each selected task — no more, no fewer.

**Validates: Requirements — Simulation (impact message for each selected task)**

### Property 5: Empty selection blocks simulation

*For any* application state where no tasks are selected, triggering the simulation should not advance the simulation state and should produce a validation prompt.

**Validates: Requirements — Task Selection (no task selected prompt) and Role Selection (no role selected prompt)**

### Property 6: Simulation state progression is monotonic

*For any* simulation run, the UI state must progress only forward through the sequence calm → disruption → chaos → reflection and never skip or reverse a stage.

**Validates: Requirements — Visualization (UI transition from calm to chaotic state)**

### Property 7: Final insight appears only after all impacts are displayed

*For any* simulation run with N selected tasks, the FinalInsight component must not be visible until all N impact messages have been displayed.

**Validates: Requirements — Insight (final insight shown after all impact messages)**

### Property 8: Restart resets all state

*For any* completed simulation, triggering restart should return the application to its initial state — empty role selection, empty task selection, simulation state "calm", and no displayed impacts.

**Validates: Requirements — Engagement Features (offer to restart)**


## Error Handling

- If no roles are selected and the user attempts to proceed: display an inline prompt "Please select at least one role to continue."
- If no tasks are selected and the user attempts to simulate: display an inline prompt "Please select at least one task to simulate."
- If the simulation encounters an unexpected runtime error: display a fallback message "Something went wrong. Please try again." with a retry button that resets to the task selection step.
- All error states are recoverable — no dead ends in the user flow.


## Testing Strategy

### Unit Tests

Unit tests cover specific examples, edge cases, and component behavior:

- RoleSelector renders all roles and reflects selected state correctly
- TaskSelector filters tasks correctly based on selected roles
- Selecting zero roles shows no tasks in TaskSelector
- SimulationButton is disabled when no tasks are selected
- ImpactDisplay renders the correct number of impact cards for a given task set
- FinalInsight does not render before simulation is complete
- Restart action resets all AppState fields to initial values
- Validation messages appear when proceeding without selections

### Property-Based Tests

Property tests use a property-based testing library (e.g., `fast-check` for JavaScript/TypeScript) to verify universal properties across randomly generated inputs. Each test runs a minimum of 100 iterations.

Each test is tagged with a comment in the format:
**Feature: if-she-stopped-simulator, Property {N}: {property_text}**

- Property 1 — Role toggle round-trip: for any role, toggle on then off → selected list unchanged
- Property 2 — Task list subset: for any role selection, all displayed tasks belong to a selected role
- Property 3 — Task toggle round-trip: for any task, toggle on then off → selected list unchanged
- Property 4 — Impact message count: for any N selected tasks, simulation produces exactly N impact messages
- Property 5 — Empty selection guard: for any state with no tasks selected, simulation does not advance
- Property 6 — State progression monotonicity: simulation state never goes backward or skips a stage
- Property 7 — Final insight ordering: FinalInsight is not visible until all N impacts are shown
- Property 8 — Restart completeness: after restart, all state fields equal their initial values

### Dual Testing Rationale

Unit tests catch concrete bugs in specific scenarios and integration points. Property tests verify that the general rules hold across the full input space. Together they provide comprehensive coverage — unit tests for the "what" and property tests for the "always."
