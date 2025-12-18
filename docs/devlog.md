# Development Log

This document records architectural decisions, challenges, and learning
milestones during the development of _Physics Ball_.

It is not a changelog or a commit history.
Instead, it captures **why decisions were made**, **what problems emerged**,
and **what questions remain open** at different stages of development.

This log is intentionally ongoing.

---

## Phase 1 — Movement, Physics, and Game Feel

The project began as a small experiment to understand how player movement
actually works, beyond simply making something move on screen.

Early focus areas included:

- gravity and acceleration
- jump behavior and responsiveness
- delta time–based updates
- collision detection and resolution

At this stage, a classic OOP-style structure worked well, allowing rapid
iteration and experimentation.

---

## Phase 2 — Game Flow and State Management

As gameplay features expanded, managing game flow became increasingly complex.

Initial approaches to game state mixed:

- rules
- transitions
- side effects (such as audio)
- and state representation

This led to fragile logic, unexpected freezes, and difficulty reasoning about
what the game was actually doing at any given moment.

A key realization during this phase was that **game state is harder than it
looks**, and that overengineering it early can slow progress instead of helping.

---

## Phase 3 — Camera Control and Level Completion

One important conceptual breakthrough was understanding that stopping the game
does not always mean stopping everything.

For level completion:

- freezing the camera by stopping world scrolling
- while allowing the player and world simulation to continue

proved to be a simpler and more expressive solution than pausing the entire game.

This resulted in a dedicated _level-over_ state that communicates progression
clearly without introducing unnecessary complexity.

---

## Phase 4 — Audio Lifecycle and Side Effects

Audio handling exposed another layer of complexity.

Early implementations attempted to start or unlock audio too early, leading to:

- aborted playback
- inconsistent pause/resume behavior
- tight coupling between audio and unrelated game logic

The solution was to centralize audio responsibility into a dedicated
**MusicManager**, explicitly tying playback to:

- user interaction
- game state transitions

This clarified ownership of side effects and made audio behavior predictable.

---

## Phase 5 — Rethinking an OOP-Centered Mental Model

The initial approach to the project was strongly influenced by a class-heavy,
object-oriented mindset.

While this worked well for early gameplay logic, it became clear over time that
treating every concept as a class with responsibilities led to rigid structures
and unnecessary coupling.

Rather than abandoning OOP, this phase became an opportunity to explore where
object-oriented design helps and where more data-driven, systems-based approaches
are a better fit — particularly in JavaScript.

This shift in perspective influenced decisions such as:

- reducing entity responsibilities
- favoring composition over inheritance
- moving rendering logic into dedicated systems
- using plain objects for configuration and state where appropriate

---

## Phase 6 — Architectural Impasse and RenderSystem Migration

As features accumulated, entities began handling multiple responsibilities:

- gameplay logic
- DOM manipulation
- sprite selection
- visual state

While functional, this approach made experimentation with visuals and themes
increasingly difficult and tightly coupled logic to presentation.

Rather than rewriting the project, an **incremental migration** strategy was
chosen:

- Introduced **Theme objects** as the single source of visual configuration
- Moved DOM manipulation and sprite selection into a dedicated **RenderSystem**
- Reduced entities (starting with Player) to gameplay logic and state only
- Kept legacy rendering paths temporarily to preserve a playable game

This migration is ongoing.

---

## Phase 8 — Finalizing RenderSystem Migration

Rendering responsibilities were fully migrated into the RenderSystem.
RenderableEntity was removed and Level no longer handles DOM or rendering logic.

## This marks the completion of the transition to a data + systems architecture.
