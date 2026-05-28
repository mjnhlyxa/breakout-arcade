# Breakout Arcade — Real-time Communication Design

> **C4 Level**: 3 — Real-time Component Design

## 1. Real-time Requirements Analysis

Breakout Arcade is a **single-player local game** — no real-time multiplayer synchronization is required.

- All game physics run locally in the browser at 60fps
- No need for SSE, WebSockets, or polling during gameplay
- Leaderboard updates are **submit-after** (not live updates)

## 2. Leaderboard Communication Pattern

### 2.1 Score Submission Flow
```
User finishes game → POST /api/scores → Save to MongoDB → Return rank
```

This is a single fire-and-forget request — no streaming needed.

### 2.2 Leaderboard Retrieval Flow
```
User opens leaderboard → GET /api/scores → Return top 100 scores
```

Simple request/response — no streaming needed.

## 3. Future: Multiplayer Considerations

If multiplayer is added in the future:

### Option A: WebSockets (Socket.io)
- Pros: True bidirectional, low latency
- Cons: Requires WebSocket server, connection management

### Option B: SSE (Server-Sent Events)
- Pros: Simple, HTTP-compatible
- Cons: One-way only (server to client)

### Option C: Polling (5s interval)
- Pros: Simple, stateless
- Cons: Higher latency, more server load

For now, this design document recommends **no real-time layer** for MVP.
