# 🔴 Physics Ball – JavaScript Movement & Physics Demo

> TL;DR: Vanilla JavaScript game experiment focused on movement physics and clean architecture.

A small **vanilla JavaScript** game experiment exploring player movement, gravity, input handling, and overall game feel.
This project focuses on **clean state management, separation of concerns, and responsive controls**
rather than visual complexity or frameworks.

---
## 🌐 Live Demo

https://a41900.github.io/physics-ball/

---

## 🎯 Purpose

The goal of this mini-project was to practice **core JavaScript fundamentals**
through a non-trivial interactive system.

Specifically, it explores:
- How keyboard input translates into motion
- Separation between **input**, **game logic**, and **rendering**
- Gravity, jumping, momentum, and movement tuning
- Debugging behavior-based issues (not just syntax errors)
- Designing a small but **scalable game architecture**

---

## 🕹️ Controls

- **← / →** — Move horizontally  
- **↑** — Jump (single press)

---

## 🧠 Technical Highlights

- `requestAnimationFrame`-based game loop with delta time
- State-driven player movement (`position`, `velocity`)
- Event-based jump handling (prevents repeated jumping)
- Smooth acceleration and deceleration
- Physics-inspired tuning for responsive movement
- Clear separation between world coordinates and screen rendering
- Modular structure:
  - `Game`
  - `Player`
  - `Collision`
  - `Input`
  - `Time`

> No frameworks were used — the goal was to strengthen core JavaScript and architectural understanding.

---

## 🛠️ Technologies

- JavaScript (Vanilla)
- HTML5
- CSS3

---

## 📌 Notes

This project was developed iteratively, with multiple refactors focused on
movement feel, architecture, and code clarity.

It is intended as a **learning and experimentation project**, not a finished game.

---

## 🚀 Possible Improvements

- Improve platform collision handling (edges and sides)
- Add moving platforms and obstacles
- Camera smoothing and easing
- Visual feedback (squash/stretch)
- Difficulty progression across levels

---

## 👩‍💻 Author

Developed independently as part of my learning journey in JavaScript and front-end development.
