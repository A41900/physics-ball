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
- Flow controllers coordinate global state and side effects
- Themes define visual configuration

---

## Core Components

### Game

**Role:** Orchestrator

Responsibilities:

- Owns the main game loop
- Coordinates input, simulation, rendering, and state transitions
- Owns global state and flow controllers
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

## Entities

Entities represent **gameplay state and behavior only**.
Entities are modeled as classes, as they represent
things that exist in the game world and may have multiple instances.

### Player

- Movement and physics
- Input-driven logical state (`state`, `facing`)
- Collision response

### Platform

- Position and collision surface
- No visual responsibility

### Obstacle

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

## Flow Controllers

Flow controllers coordinate **global game flow and side effects**.
They exist once per game lifecycle and do not represent entities.

They are implemented as **closure-based modules** to:

- encapsulate internal state
- prevent invalid external mutation
- make ownership explicit
- avoid unnecessary class semantics

### GameState

**Role:** Game flow control

Responsibilities:

- Track the current game state (`playing`, `paused`, `gameover`, `levelover`)
- Control valid state transitions
- Notify interested systems of state changes

GameState does not represent an entity and is not instantiable as a class.

---

### MusicManager

**Role:** Side-effect management (audio)

Responsibilities:

- Centralize all audio playback
- Respect browser autoplay restrictions
- React to explicit game state transitions
- Prevent unintended audio side effects

MusicManager owns audio state and exposes a minimal, explicit API.

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
- Make ownership explicit
- Favor clarity over abstraction
- Migrate incrementally, not via rewrites

---

## Current Status

The project has completed its initial transition to a
**data + systems architecture**:

- Rendering is fully decoupled from entities
- Flow controllers are isolated from gameplay logic
- Themes centralize all visual configuration

Some areas are still intentionally evolving.

---

## Open Architectural Questions

- Should rendering remain DOM-based long-term?
- How far should systems be generalized?
- When does abstraction stop serving learning goals?
- Which future features justify additional complexity?

These questions remain open and are revisited as the project evolves.
