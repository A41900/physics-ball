# 🌸 Physics Ball — Movement, Physics & Game Logic Experiment

**Live Demo**  
https://a41900.github.io/physics-ball/

---

## Overview

Physics Ball started as a small experiment focused on understanding **player movement, gravity, and input handling** using **vanilla JavaScript only**.

The project was never meant to begin as a full game. The initial goal was to understand _how movement actually works_ and how physics parameters affect game feel.

As the codebase evolved, the experiment naturally grew into a **simple level-based game prototype**, introducing platforms, obstacles, a scrolling camera, and a defined end-of-level goal.

---

## Design & Technical Focus

Key areas explored so far:

- Player movement with gravity, acceleration, deceleration, and jumping
- Delta time–based updates to ensure consistent behavior across machines
- Collision detection and resolution
- Camera scrolling independent from player movement
- Modular architecture using ES modules (Player, Level, Collision, Input, Game Loop)

A major part of development involved learning where **simplicity beats overengineering**, especially around game state and flow.

---

## Game Flow & State Handling

Managing game flow turned out to be one of the most challenging aspects of the project so far.

Through multiple iterations, I learned to:

- Distinguish between stopping the **camera** and stopping the **world**
- Avoid overcomplicating state management early
- Keep game state explicit and readable

The current implementation includes:

- Playing, paused, and game-over states
- A **level-over state** where the camera stops scrolling while the player and world simulation continue running

This approach stabilized gameplay while keeping the logic understandable.

---

## Current Features

- Physics-based player movement
- Platform-based level layout
- Obstacles and a visible level goal (castle)
- Camera scrolling system
- Pause and game-over handling
- Level-over state with stopped camera
- Modular, readable code structure

---

## Project Status & Next Steps

This is an **ongoing learning project**, not a finished game.

Current focus moving forward:

- Restart and next-level flow
- Small, intentional refactors
- Further improving code organization without breaking working behavior

The goal is to continue expanding the game while keeping the logic simple and understandable.

---

## Notes

Built solo as a personal learning project.

This codebase favors:

- clarity over optimization
- experimentation over polish
- understanding _why_ systems work, not just _that_ they work
