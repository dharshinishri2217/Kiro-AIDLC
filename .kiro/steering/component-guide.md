---
inclusion: fileMatch
fileMatchPattern: "frontend/src/components/**"
---

# Component Development Guide

## Existing Components
| Component | Purpose |
|-----------|---------|
| `LoginPage` | User registration/login with validation |
| `StreakBar` | Shows streak, sim count, motivational message |
| `RoleSelector` | Multi-select role grid |
| `TaskSelector` | Category-grouped task selection |
| `SimulationButton` | CTA to trigger simulation |
| `ImpactMeter` | Animated circular gauge for load score |
| `ImpactDisplay` | Typewriter impact messages with progress bar |
| `FinalInsight` | Reflection message after simulation |
| `BadgeUnlock` | 8-badge achievement system |
| `ShareCard` | Gradient quote card with copy/share |
| `StatsDashboard` | Modal with Python-powered analytics |
| `TimeCalculator` | Weekly hours + unpaid wage estimate |
| `DailyChallenge` | Daily rotating role/task prompt |
| `ReflectionJournal` | Private notes after simulation |
| `DayTracker` | Daily task logging with weekly view |
| `WeeklyCelebration` | Full-screen animated celebration |

## Component Rules
- Every component must have a single clear responsibility
- Props should be minimal — pass only what the component needs
- Use `fade-in-up` CSS class for entrance animations
- Emotional/reflection components use indigo/purple palette
- Chaos/impact components use red/amber palette
- Always handle empty/loading states gracefully
- No component should directly access localStorage — pass data via props from App.jsx (exception: DayTracker and ReflectionJournal which own their own storage)
