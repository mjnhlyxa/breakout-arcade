# Breakout Arcade — Brainstorm

> Status: Draft | Created: 2026-05-29

## Overview

A modern web recreation of the classic brick-breaking arcade game with smooth physics, vibrant visuals, power-ups, and a persistent leaderboard. Players control a paddle to bounce a ball and destroy progressively challenging brick formations across multiple levels. Designed for quick sessions (2–5 minutes) with "just one more try" addictiveness.

## Game Concept

- **Genre**: Arcade / Casual
- **Platform**: Web browser — desktop primary, mobile responsive (touch controls)
- **Session length**: Quick 2–5 minute runs, each attempt is a "level run"
- **Multiplayer**: Single-player by default with global leaderboard (future: rooms with spectators)
- **Account required**: No — anonymous play by default, scores linked to anonymous device ID

## Target Audience

- Casual gamers looking for quick, satisfying gameplay
- Fans of classic arcade games (Breakout, Arkanoid)
- Mobile users wanting a pick-up-and-play experience
- Players who enjoy leaderboard competition

## Core Gameplay Loop

1. Player launches the game and immediately sees the paddle, ball, and brick formation
2. Ball bounces off walls, paddle, and bricks — physics feel tight and responsive
3. Each brick destroyed awards points; special bricks drop power-ups
4. If ball falls below paddle, life is lost (3 lives per game)
5. Clear all bricks to advance to next level with harder formations
6. Game ends when all lives lost — score submitted to leaderboard
7. Player can restart instantly for "one more try"

## Features

### Must-Have (MVP)
- Smooth paddle movement (keyboard arrows / mouse / touch)
- Ball physics: bounce off walls, paddle, bricks with angle variation based on hit position
- Brick grid with multiple hit points (some bricks take 2–3 hits)
- 3 lives per game, visual life counter
- Score system: points per brick, multiplier for combos
- 5 pre-designed levels with increasing difficulty
- Game over screen with score and restart option
- Mobile touch controls (swipe to move paddle)

### Nice-to-Have (Post-MVP)
- Power-ups: multi-ball, wider paddle, slow ball, laser paddle
- Special bricks: gold (bonus points), rainbow (random effect), indestructible (obstacles)
- Level progression saves to localStorage
- Global leaderboard via API
- Sound effects and visual feedback on brick break
- Particle effects on brick destruction

### Out of Scope
- Real-time multiplayer — too complex for MVP
- User accounts / authentication — anonymous device ID is sufficient
- IAP / monetization — pure casual game

## User Experience Goals

- **Time to first game**: Target < 5 seconds from landing to first move. No signup, no tutorial required.
- **Onboarding**: Brief tooltip on first play: "Move paddle to bounce ball. Break all bricks!"
- **Mobile**: Full touch support, no pinch-zoom, game fills viewport
- **Accessibility**: Keyboard navigable, sufficient color contrast for brick types

## Social & Virality Features

- Share link with score achieved (e.g., `breakout.arcade.io/play?score=12500`)
- Global leaderboard showing top 100 scores
- No friend system for MVP

## Data to Persist

- **Game state**: Not persisted mid-game (arcade philosophy — no save scumming)
- **High score**: Stored in localStorage for personal best
- **Leaderboard**: Top scores stored in MongoDB via API
- **Player identity**: Anonymous device ID generated once, stored in localStorage
- **Level unlock**: Highest level reached stored in localStorage

## Technical Feasibility Assessment

### Straightforward
- Canvas-based rendering with requestAnimationFrame
- Simple 2D physics (reflection angles, velocity)
- Paddle collision detection
- Brick grid management
- Touch and mouse input handling
- localStorage for personal data

### Complex or Risky
- Ball physics with spin / angle variation based on paddle hit position
- Responsive canvas sizing across devices
- Smooth 60fps performance on mobile
- API endpoint for leaderboard (needs FastAPI backend)

### Open Questions
- Should power-ups be implemented in MVP or post-MVP?
- How to handle ball speed increase over time?
- What scoring formula creates best player satisfaction?
- Canvas vs DOM-based rendering for cross-browser consistency?

## Competitive Landscape

- **Original Breakout** (1976) — pure paddle + ball + bricks
- **Arkanoid** (1986) — power-ups, multiple brick types, bosses
- **Zookeeper** (2001) — cute theme, combo chains
- **Bloxorz** — different puzzle mechanic
- **Our differentiator**: Modern web polish, instant load, leaderboard competition, mobile-first with buttery-smooth 60fps touch controls
