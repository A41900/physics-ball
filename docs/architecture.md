# Architecture Overview

This document describes the current architecture of _Physics Ball_.
It is intended as a **structural map of the codebase**, not as a tutorial
or historical record.

For architectural reasoning and evolution, see `docs/devlog.md`.

---

## High-Level Structure

The project follows a **Game Loop + Systems** model, with a clear separation
between gameplay logic, rendering, and side effects.

At a high level:

- `Game` orchestrates the loop and state transitions
- Entities hold gameplay state and behavior
- Systems operate on entities and world data
- Themes define visual configuration

---

## Core Components

### Game

**Role:** Orchestrator

Responsibilities:

- Owns the main game loop
- Coordinates input, simulation, rendering, and state transitions
- Holds references to world state and entities
- Does not perform rendering directly

The `Game` class delegates work to systems instead of implementing logic itself.

---

### World

**Role:** Global simulation context

Responsibilities:

- Tracks camera position (`world.x`)
- Defines scrolling behavior
- Acts as a reference frame for rendering

Stopping the camera is handled by freezing `world.x`,
while the simulation can continue running.

---

### Entities

Entities represent **gameplay state and behavior only**.

They do **not**:

- manipulate the DOM
- select sprites
- apply visual styles

#### Player

- Movement and physics
- Input-driven state (`state`, `facing`)
- Collision response

#### Platform

- Position and collision surface
- No visual responsibility (migration ongoing)

#### Obstacle

- Collision behavior
- Type-based interaction (hazard / goal)

---

## Systems

Systems operate on entities and world data.
They are stateless and do not own game data.

### RenderSystem

**Role:** Visual output

Responsibilities:

- Create and manage DOM elements
- Select sprites based on entity state
- Apply positioning and transforms
- Read visual data from Theme objects

Rendering is fully decoupled from gameplay logic.

---

### CollisionSystem

**Role:** Physics interaction

Responsibilities:

- Resolve collisions between player and platforms
- Detect obstacle interactions
- Enforce gameplay rules related to collisions

---

### InputSystem

**Role:** Input normalization

Responsibilities:

- Capture raw keyboard input
- Expose a simplified input state to the game loop
- Prevent direct DOM/input coupling in entities

---

### MusicManager

**Role:** Side-effect management (audio)

Responsibilities:

- Centralize all audio playback
- Respect browser autoplay restrictions
- React to explicit game state transitions
- Prevent unintended audio side effects

---

## Game State

Game flow is controlled via an explicit finite state model.

Current states:

- `playing`
- `paused`
- `gameover`
- `levelover`

State transitions are handled centrally and explicitly,
preventing invalid state combinations.

---

## Themes

Themes act as the **single source of visual configuration**.

They define:

- Backgrounds
- Sprites
- Visual offsets and scaling
- Asset references

Themes allow visual changes without touching gameplay logic.

---

## Architectural Principles

The architecture follows these guiding principles:

- Separate logic from presentation
- Prefer composition over inheritance
- Keep entities small and focused
- Centralize side effects
- Favor clarity over abstraction
- Migrate incrementally, not via rewrites

---

## Current Status

The project is in a **hybrid state**:

- Player rendering is fully migrated to RenderSystem
- Platform and obstacle rendering are in progress
- Some legacy rendering paths still exist intentionally

This state is temporary and controlled.

---

## Open Architectural Questions

- Should `RenderableEntity` be removed entirely?
- Should all rendering remain DOM-based?
- How far should systems be generalized?
- When to stop abstracting and ship features?

These questions are intentionally left open and revisited as the project evolves.
