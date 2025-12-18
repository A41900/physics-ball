# 🌸 Physics Ball — Movement, Physics & Game Logic Experiment

**Live Demo**  
https://a41900.github.io/physics-ball/

---

## Overview

**Physics Ball** is a solo project built to explore **player movement, physics, and game logic** using **vanilla JavaScript only**.

What started as a small experiment focused on gravity and movement gradually evolved into a **simple level-based game prototype**, featuring platforms, obstacles, camera scrolling, and a defined level goal.

The project prioritizes **understanding how systems work**, rather than visual polish or production features.

---

## Technical Focus

This project explores:

- Physics-based player movement (gravity, acceleration, jumping)
- Delta time–based updates for consistent behavior
- Collision detection and resolution
- Camera scrolling independent from player movement
- Modular architecture using ES modules

The codebase is intentionally kept readable and easy to reason about.

---

## Architecture Snapshot

- Game logic and rendering are **decoupled**
- Rendering is handled by a dedicated **RenderSystem**
- Visual configuration is centralized in **Theme objects**
- Game entities focus on gameplay state and behavior only

The architecture is being evolved incrementally to maintain a playable game at all times.

---

## Current Features

- Physics-based player movement
- Platform-based level layout
- Obstacles and visible level goal
- Camera scrolling system
- Pause, game-over, and level-over states
- Theme-driven visuals

---

## Project Status

This is an **ongoing learning project**, not a finished game.

Planned next steps include:

- Restart and next-level flow
- Completing the rendering migration for remaining entities
- Continued small, intentional refactors

---

## Notes

Built solo as a personal learning project.

This codebase favors:

- clarity over optimization
- experimentation over polish
- understanding _why_ systems work, not just _that_ they work
