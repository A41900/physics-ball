# Development Log

This document is a development log for _Physics Ball_.

It records architectural decisions, mistakes, dead ends, and lessons learned
while the project evolved.
It is not a changelog or a detailed commit history.

The goal of this log is to capture:

- why certain decisions were made
- what problems appeared along the way
- how the structure of the project changed over time

This document is intentionally informal and ongoing.
It exists mainly as a thinking tool — for reflection, learning,
and for future reference when revisiting the project.

---

## Phase 1 — Movement, Physics, and Game Feel

The initial goal was simple: practice JavaScript after finishing the
freeCodeCamp bootcamp.
I wanted a small app where I could freely experiment with HTML, CSS, and JS.
Because I’m interested in games and physics, I started with a ball and focused
on movement.

This phase was about experimenting:

- basic input handling
- acceleration and deceleration
- gravity and friction
- mass (making the ball feel heavier or lighter)
- collision detection

The goal wasn’t realism, but _feel_ — trying to make movement look and feel
natural, even if the math wasn’t perfect.

At this stage, a simple OOP-style structure worked well and allowed fast,
messy experimentation.

---

## Phase 2 — Game Flow Is Harder Than Physics

This phase was frustrating.

At first, I didn’t properly understand delta time.
The game behaved fine on one machine, but ran too fast or broke completely
on another.
Only later did it become clear that updates were frame-dependent.

Once delta time was introduced, another problem appeared:
game flow.

Creating a reasonable game loop turned out to be harder than the physics itself.
Small changes would fix one issue and break something else.
It felt like a domino effect — nothing was isolated, everything affected
everything.

During this phase, I managed to stabilize the game minimally,
but the structure was still fragile.
This was the first sign that architecture would matter as much as mechanics.

---

## Phase 3 — Camera Control and Level Completion

At this stage, the goal was to make the game constantly move forward.
The world would scroll endlessly, giving the feeling that everything
was in motion, not just the player.

At the same time, I already knew I wanted a `levelover` state where:

- the world would stop moving
- but the player would still be able to move and interact

Conceptually this was clear, but implementing it was not.

Making the game move was easier than making it stop.
World movement, camera behavior, and game state were all mixed together,
so it was hard to isolate what should freeze and what should continue.

Through trial and error, it became clear that `world.x` was the key variable.
It effectively acted as the camera.
Stopping the world meant freezing `world.x`, while letting the rest of the
simulation continue normally.

This phase also exposed how unstable the existing state handling was.
States existed, but there was no clear or consistent way to store,
transition, or reason about them.

What made this phase difficult wasn’t a lack of ideas,
but the lack of a structure that allowed those ideas to exist cleanly.

---

## Phase 4 — Audio Lifecycle and Side Effects

Audio problems surfaced as a direct consequence of unstable game states.

Sounds would restart every frame, play too fast to hear, loop unintentionally,
or fail to trigger altogether.
Pause and resume behavior was especially fragile.

Initially, only the start music was easy to implement.
Everything else depended on state transitions that were either unclear,
too short-lived, or happening every frame.

As state handling slowly became more explicit, audio behavior also stabilized.
Game over and level over sounds finally triggered correctly,
and pause/resume became manageable.

However, this revealed another issue:
the initial `playing` state was never explicitly entered.
To avoid breaking audio again, the start music ended up being guarded
by a simple boolean.

This phase reinforced how tightly audio behavior is coupled to
state clarity, and how fragile side effects become when state flow
is poorly defined.

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

This phase started with a concrete goal: visual themes.
I wanted a fast way to change the entire look of the game at once.

While themes naturally fit as plain data objects, integrating them into
the existing codebase exposed a deeper issue.
Entities were handling too many responsibilities at once:
gameplay logic, DOM manipulation, sprite selection, and rendering.

This structure made sense early on.
My initial approach was strongly influenced by Java and classical OOP,
so most logic lived inside classes, often with inheritance.
Entities even knew how to render themselves.

When trying to plug theme data into this model, it became clear that
the architecture was fighting the idea.
Visual configuration didn’t fit cleanly into self-rendering entities.

Instead of rewriting everything, I started an incremental migration:

- themes became plain data objects
- rendering moved into a dedicated `RenderSystem`
- entities were reduced to gameplay logic and state

This marked a shift away from an OOP-heavy structure toward a
data + systems approach that fits JavaScript better.

---

## Phase 7 — Finalizing RenderSystem Migration

Rendering responsibilities were fully migrated into the RenderSystem.
RenderableEntity was removed and Level no longer handles DOM or rendering logic.

---

## Phase 8 — Flow Controllers as Closure Modules

After the RenderSystem migration, an architectural mismatch became clear
around flow-oriented components like `GameState` and `MusicManager`.

They were implemented as classes, even though they only exist once,
coordinate flow and side effects, and don’t represent entities.
This wasn’t breaking anything, but it didn’t match their role.

To reflect their purpose more clearly, both were refactored into
closure-based modules.
State is now encapsulated, transitions happen through explicit APIs,
and concepts like `new`, constructors, and `this` were removed.

This change didn’t add features, but made ownership and responsibility
of global flow much clearer.

---

## Phase 9 — Rethinking Gameplay Rules (Context-Bound Rules)

At this stage, the problem wasn’t functionality, but readability.
The `Game` class was doing too much and became hard to read linearly.

Gameplay rules, state transitions, UI concerns, and orchestration logic
were all mixed together.
The code worked, but understanding _why_ things happened required jumping
around constantly.

I explored a few ways to organize rules.
Keeping them inside `Game` was simple but quickly led to large conditionals.
Rule tables and rule classes technically worked, but added noise and ceremony
without making the flow easier to follow.

The solution was to treat rules as a context-bound module.
By creating them through a closure — createRules({ player, world, level });

---

## Phase 10 — Separating State Decisions from State Reactions

At this point, `Game` was doing two different things at once:
deciding when the state changes, and reacting to those changes
through music and UI updates.

This worked, but made the class harder to read and reason about.
Every new state added more side effects into the main game flow.

To clean this up, reactions to `GameState` changes were moved into a
separate setup module.
This module only listens to state events and coordinates side effects
like audio and UI.

As a result, `Game` is now more focused on orchestration and the game loop,
while side effects live in one predictable place.
No new features were added — this refactor was about reducing cognitive load
before continuing development.

---

## Phase 11 - RenderSystem Unification

As rendering evolved, the project accumulated several small render functions
(player, platforms, obstacles) with a lot of duplicated logic.

I decided to unify them into a single `renderEntity` pipeline to:

- reduce duplication
- centralize rendering flow
- simplify the RenderSystem surface

This refactor worked functionally, but introduced subtle visual bugs
(layering, positioning, sizing) that revealed hidden dependencies on CSS
selectors, DOM order, and implicit z-index behavior.

This highlighted a gap in my understanding of how much the previous rendering
relied on implicit CSS behavior rather than explicit rules.

The unified RenderSystem is kept for now, but this decision remains open.
The main value of this step was making rendering assumptions visible.
