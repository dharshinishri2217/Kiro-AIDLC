# Testing Document

## If She Stopped — Impact Simulator

---

## 1. Introduction

### Purpose of Testing

The purpose of this document is to define the testing approach, test cases, and success criteria for the If She Stopped — Impact Simulator application. Testing ensures that all core features function correctly, the user experience is smooth and emotionally coherent, and the application performs reliably across devices.

### Scope of Testing

- Role selection and task selection functionality
- Simulation trigger and state progression
- UI visual transitions (calm → disruption → chaos → reflection)
- Impact message display and final insight message
- Responsiveness across mobile and desktop
- Edge cases and error handling
- Basic performance validation

---

## 2. Testing Strategy

- All testing is manual and browser-based
- Testing focuses on three areas: UI correctness, functional behavior, and user flow completeness
- Each test case is executed in both desktop (1280px+) and mobile (375px) viewports
- Visual transitions are verified by observation
- Edge cases are tested by deliberately providing invalid or incomplete input
- Bugs are logged in the Bug Tracking section with status

---

## 3. Test Scenarios

The following key scenarios are covered in this document:

- Role selection (single and multiple)
- Task selection (single and multiple, filtered by role)
- Simulation trigger (with valid input and without)
- UI transition from calm state to chaos state
- Progressive display of impact messages
- Final insight message appearance
- Restart flow after simulation completes
- Responsiveness on mobile and desktop
- Edge cases (no selection, repeated clicks)

---

## 4. Test Cases

| Test ID | Feature | Test Description | Steps | Expected Result | Actual Result |
|---------|---------|-----------------|-------|----------------|---------------|
| TC-01 | Role Selection | User selects a single role | 1. Open application 2. Click one role card | Role card shows selected state (highlighted border or background) | |
| TC-02 | Role Selection | User selects multiple roles | 1. Open application 2. Click two or more role cards | All clicked roles show selected state simultaneously | |
| TC-03 | Role Selection | User attempts to proceed with no role selected | 1. Open application 2. Click proceed without selecting a role | Inline validation message appears: "Please select at least one role" | |
| TC-04 | Task Selection | Tasks appear after role selection | 1. Select one or more roles 2. Observe task list | Only tasks belonging to selected roles are displayed | |
| TC-05 | Task Selection | User selects multiple tasks | 1. Select a role 2. Click two or more task cards | All clicked tasks show selected state | |
| TC-06 | Task Selection | User attempts to simulate with no task selected | 1. Select a role 2. Click simulate without selecting a task | Inline validation message appears: "Please select at least one task" | |
| TC-07 | Simulation Trigger | Simulation starts on button click | 1. Select roles and tasks 2. Click simulation button | UI begins transitioning, simulation state changes from calm | |
| TC-08 | UI Transition | UI progresses through all visual states | 1. Trigger simulation 2. Observe UI over time | UI transitions through calm → disruption → chaos → reflection in sequence | |
| TC-09 | Impact Messages | Impact messages appear progressively | 1. Trigger simulation 2. Observe message display | One impact message per selected task appears with staggered delay | |
| TC-10 | Final Insight | Final insight message appears after all impacts | 1. Trigger simulation 2. Wait for all impact messages to display | Final insight message appears only after all impact cards are shown | |
| TC-11 | Restart | Restart button resets the application | 1. Complete a simulation 2. Click restart | Application returns to calm state with no roles or tasks selected | |
| TC-12 | Responsiveness | Application renders correctly on mobile | 1. Open application on 375px viewport 2. Complete full flow | All components are visible, usable, and correctly laid out on mobile | |

---

## 5. Sample Test Cases

---

Test ID: TC-01
Feature: Role Selection
Description: User selects one or more roles
Steps:
1. Open the application in a browser
2. Observe the role selection grid
3. Click on one role card

Expected Result: The selected role card displays a highlighted or active visual state (e.g., colored border, background change)
Actual Result: ___

---

Test ID: TC-07
Feature: Simulation Trigger
Description: Simulation starts when the button is clicked with valid selections
Steps:
1. Open the application
2. Select at least one role
3. Select at least one task
4. Click the simulation button

Expected Result: The UI begins transitioning away from the calm state; a loading or transition animation is visible
Actual Result: ___

---

Test ID: TC-09
Feature: Impact Messages
Description: Impact messages appear one by one after simulation is triggered
Steps:
1. Select roles and tasks
2. Click the simulation button
3. Observe the impact display area

Expected Result: Impact messages fade in one at a time with a visible delay between each message; total messages equal the number of selected tasks
Actual Result: ___

---

Test ID: TC-10
Feature: Final Insight
Description: Final insight message appears only after all impact messages are shown
Steps:
1. Trigger simulation with multiple tasks selected
2. Wait for all impact messages to appear
3. Observe whether the final insight message is visible before all impacts are shown

Expected Result: Final insight message is not visible until the last impact message has appeared; it then displays prominently
Actual Result: ___

---

## 6. Edge Cases

| Edge Case | Input Condition | Expected Behavior |
|-----------|----------------|-------------------|
| No role selected | User clicks proceed with zero roles selected | Inline validation message shown; simulation does not start |
| No task selected | User clicks simulate with zero tasks selected | Inline validation message shown; simulation does not start |
| Simulate without any input | User clicks simulate immediately on page load | Both validation messages shown; no state change occurs |
| Repeated clicks on simulate | User clicks simulate button multiple times rapidly | Simulation runs only once; button is disabled or debounced after first click |
| All roles selected | User selects every available role | All associated tasks are shown; simulation runs correctly |
| Single task selected | User selects only one task | Simulation runs with one impact message and one final insight |

---

## 7. UI/UX Testing

### Responsiveness

- [ ] Application renders correctly at 375px (mobile)
- [ ] Application renders correctly at 768px (tablet)
- [ ] Application renders correctly at 1280px (desktop)
- [ ] No horizontal scroll on any viewport
- [ ] All interactive elements are tappable on mobile (minimum 44px touch target)

### Visual Transitions

- [ ] Calm → Disruption transition is smooth and visible
- [ ] Disruption → Chaos transition includes color shift and intensity change
- [ ] Chaos → Reflection transition stabilizes the layout
- [ ] No abrupt or jarring visual jumps between states

### Visual Changes

- [ ] Background color changes are visible at each simulation stage
- [ ] Typography weight or size increases during chaos state
- [ ] Impact cards use appropriate visual styling per simulation state
- [ ] Final insight message is visually distinct from impact cards

### Readability

- [ ] All text is legible against its background at every simulation state
- [ ] Impact messages are readable during chaos state (sufficient contrast)
- [ ] Final insight message is clearly readable in reflection state

---

## 8. Performance Testing

| Test | Condition | Expected Result |
|------|-----------|----------------|
| Initial page load | Standard broadband connection | Page fully loaded and interactive within 3 seconds |
| Simulation trigger response | User clicks simulate button | UI begins responding within 300 milliseconds |
| Animation smoothness | During state transitions | Animations run at a consistent frame rate with no visible stutter |
| Mobile performance | Simulation run on a mid-range mobile device | No lag or dropped frames during transitions or message display |
| Large task selection | All available tasks selected | Simulation handles all impact messages without performance degradation |

---

## 9. Bug Tracking

| Bug ID | Description | Steps to Reproduce | Status |
|--------|-------------|-------------------|--------|
| BUG-01 | | | Open |
| BUG-02 | | | Open |

### Bug Report Format

Bug ID: BUG-XX
Description: Brief description of the issue
Steps to Reproduce:
1. Step one
2. Step two
3. Step three
Observed Result: What actually happened
Expected Result: What should have happened
Status: Open / In Progress / Fixed

---

## 10. Success Criteria

The application is considered ready when all of the following are true:

- All core features (role selection, task selection, simulation, impact display, final insight) work correctly without errors
- No major UI issues are present on mobile or desktop viewports
- All visual state transitions (calm → disruption → chaos → reflection) occur in the correct sequence
- Impact messages display progressively and the final insight appears only after all impacts are shown
- The restart flow returns the application to its initial state cleanly
- No edge case causes the application to crash or enter an unrecoverable state
- The simulation completes successfully with any valid combination of roles and tasks
- The overall experience feels emotionally engaging and visually intentional
