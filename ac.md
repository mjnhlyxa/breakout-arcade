# Acceptance Criteria — Breakout Arcade

> **Status**: Draft | Created: 2026-05-29 | Based on: plan/ + design/
> **Format**: Given-When-Then (BDD)
> **Total ACs**: 45

---

## Table of Contents
1. [Anonymous Identity](#1-anonymous-identity)
2. [Landing Page](#2-landing-page)
3. [Game Engine & Physics](#3-game-engine--physics)
4. [Paddle Controls](#4-paddle-controls)
5. [Ball Physics](#5-ball-physics)
6. [Bricks & Collision](#6-bricks--collision)
7. [Scoring & Lives](#7-scoring--lives)
8. [Level Progression](#8-level-progression)
9. [Game Over & Restart](#9-game-over--restart)
10. [Score Submission (API)](#10-score-submission-api)
11. [Leaderboard](#11-leaderboard)
12. [Mobile Experience](#12-mobile-experience)
13. [Error Handling](#13-error-handling)
14. [High Score Persistence](#14-high-score-persistence)

---

## 1. Anonymous Identity

### AC-ID-001: Anonymous player ID is generated on first visit
**Given**: Player opens the game for the first time (no localStorage data)
**When**: The game page loads
**Then**: A unique UUID (v4) is generated and stored in localStorage as `playerId`

### AC-ID-002: Player ID persists across page reloads
**Given**: Player has a `playerId` in localStorage
**When**: Player reloads the page or opens a new browser tab
**Then**: The same `playerId` is retrieved from localStorage and used

### AC-ID-003: High score persists in localStorage
**Given**: Player achieved a score of 15,000 in a previous session
**When**: Player returns to the game
**Then**: The high score display shows 15,000

---

## 2. Landing Page

### AC-LANDING-001: Landing page shows game title and start button
**Given**: Player opens the game URL
**When**: The landing page loads
**Then**: The title "BREAKOUT ARCADE" is displayed with a "START GAME" button

### AC-LANDING-002: High score is displayed on landing page
**Given**: Player has a high score of 25,000 stored in localStorage
**When**: Landing page loads
**Then**: "HIGH SCORE: 25,000" is displayed

### AC-LANDING-003: No high score shows placeholder
**Given**: Player has no high score in localStorage
**When**: Landing page loads
**Then**: "HIGH SCORE: ---" is displayed

### AC-LANDING-004: Controls hint is shown on landing page
**Given**: Player is on the landing page
**When**: Page loads
**Then**: Instructions "← → or Mouse to move paddle | SPACE to launch ball" are displayed

### AC-LANDING-005: Clicking START GAME navigates to game
**Given**: Player is on the landing page
**When**: Player clicks "START GAME"
**Then**: Browser navigates to /game route

### AC-LANDING-006: Leaderboard button navigates to leaderboard
**Given**: Player is on the landing page
**When**: Player clicks "LEADERBOARD"
**Then**: Browser navigates to /leaderboard route

---

## 3. Game Engine & Physics

### AC-ENGINE-001: Game initializes in idle state
**Given**: Player navigates to /game
**When**: The game page loads
**Then**: The game starts in "idle" state with ball resting on paddle

### AC-ENGINE-002: Game runs at 60fps
**Given**: Game is in playing state
**When**: requestAnimationFrame is called
**Then**: The game loop executes at approximately 60 frames per second

### AC-ENGINE-003: Canvas renders game elements
**Given**: Game is in idle or playing state
**When**: The game loop runs
**Then**: The canvas shows the paddle, ball, and brick grid

### AC-ENGINE-004: Ball launches on SPACE press
**Given**: Game is in idle state (ball on paddle)
**When**: Player presses SPACE
**Then**: Ball launches upward at initial velocity

### AC-ENGINE-005: Game pauses on ESC or pause button
**Given**: Game is in playing state
**When**: Player presses ESC or clicks PAUSE
**Then**: Game state changes to "paused", game loop stops

### AC-ENGINE-006: Game resumes on RESUME action
**Given**: Game is in paused state
**When**: Player clicks RESUME
**Then**: Game state changes to "playing", game loop resumes

---

## 4. Paddle Controls

### AC-PADDLE-001: Arrow keys move paddle left and right
**Given**: Game is in idle or playing state
**When**: Player presses and holds Arrow Left
**Then**: Paddle moves left at constant speed while key is held

### AC-PADDLE-002: Arrow key release stops paddle movement
**Given**: Paddle is moving left (Arrow Left held)
**When**: Player releases Arrow Left
**Then**: Paddle stops moving immediately

### AC-PADDLE-003: Mouse movement controls paddle
**Given**: Game is in idle or playing state and mouse is over canvas
**When**: Player moves mouse left
**Then**: Paddle moves left following cursor X position

### AC-PADDLE-004: Touch drag controls paddle
**Given**: Game is on a mobile device in idle or playing state
**When**: Player touches and drags left on canvas
**Then**: Paddle moves left following touch X position

### AC-PADDLE-005: Paddle stays within canvas bounds
**Given**: Paddle is at left edge of canvas
**When**: Player moves paddle further left
**Then**: Paddle stays at left edge, does not exit canvas

### AC-PADDLE-006: Paddle stays within canvas bounds (right)
**Given**: Paddle is at right edge of canvas
**When**: Player moves paddle further right
**Then**: Paddle stays at right edge, does not exit canvas

---

## 5. Ball Physics

### AC-BALL-001: Ball bounces off left wall
**Given**: Ball is moving left and hits left wall
**When**: Ball X position equals wall boundary
**Then**: Ball X velocity reverses, ball bounces right

### AC-BALL-002: Ball bounces off right wall
**Given**: Ball is moving right and hits right wall
**When**: Ball X position equals wall boundary
**Then**: Ball X velocity reverses, ball bounces left

### AC-BALL-003: Ball bounces off top wall
**Given**: Ball is moving up and hits top wall
**When**: Ball Y position equals wall boundary
**Then**: Ball Y velocity reverses, ball bounces down

### AC-BALL-004: Ball angle varies by paddle hit position
**Given**: Ball hits paddle at left edge
**When**: Collision is detected
**Then**: Ball reflects at a sharper left angle

### AC-BALL-005: Ball angle varies by paddle hit position (center)
**Given**: Ball hits paddle at center
**When**: Collision is detected
**Then**: Ball reflects nearly vertically upward

### AC-BALL-006: Ball angle varies by paddle hit position (right)
**Given**: Ball hits paddle at right edge
**When**: Collision is detected
**Then**: Ball reflects at a sharper right angle

---

## 6. Bricks & Collision

### AC-BRICK-001: Ball destroys brick on collision
**Given**: Ball is moving and hits a brick
**When**: Ball bounding circle intersects brick rectangle
**Then**: Brick is marked as destroyed, score increases, ball bounces

### AC-BRICK-002: Different brick colors per level
**Given**: Player is on level 1
**When**: Bricks are rendered
**Then**: Bricks are colored red and orange

### AC-BRICK-003: Level 3 bricks include yellow and green
**Given**: Player is on level 3
**When**: Bricks are rendered
**Then**: Bricks are colored yellow and green

### AC-BRICK-004: Level 5+ bricks include purple and blue
**Given**: Player is on level 5
**When**: Bricks are rendered
**Then**: Bricks are colored blue and purple

### AC-BRICK-005: Brick grid matches level layout
**Given**: Player is on level 2
**When**: Level 2 bricks are rendered
**Then**: Grid has correct number of rows and columns per level design

### AC-BRICK-006: Ball bounces off brick surface
**Given**: Ball hits left side of brick
**When**: Collision is detected
**Then**: Ball X velocity reverses

### AC-BRICK-007: Ball bounces off brick surface (top/bottom)
**Given**: Ball hits top of brick
**When**: Collision is detected
**Then**: Ball Y velocity reverses

---

## 7. Scoring & Lives

### AC-SCORE-001: Score increases when brick is destroyed
**Given**: Player has score of 1,000 and destroys a brick worth 10 points
**When**: Brick is destroyed
**Then**: Score increases to 1,010

### AC-SCORE-002: Score display updates in HUD
**Given**: Player's score increases from 0 to 100
**When**: Score updates
**Then**: HUD score display shows 100

### AC-SCORE-003: Life is lost when ball falls below paddle
**Given**: Player has 3 lives and ball falls below paddle
**When**: Ball Y position goes below canvas
**Then**: Lives decrease to 2, ball resets to paddle

### AC-SCORE-004: Game over when last life is lost
**Given**: Player has 1 life and ball falls below paddle
**When**: Ball Y position goes below canvas
**Then**: Lives decrease to 0, game state changes to "game_over"

### AC-SCORE-005: Hearts display matches remaining lives
**Given**: Player has 2 lives
**When**: HUD renders
**Then**: Two filled hearts and one empty heart are displayed

---

## 8. Level Progression

### AC-LEVEL-001: Level increases when all bricks destroyed
**Given**: Player destroys the last brick of level 1
**When**: Brick count reaches 0
**Then**: Level increases to 2, new brick formation appears, ball resets

### AC-LEVEL-002: Ball speed increases per level
**Given**: Player advances to level 2
**When**: Level 2 starts
**Then**: Ball moves 10% faster than level 1

### AC-LEVEL-003: Level display updates in HUD
**Given**: Player completes level 1
**When**: Level 2 starts
**Then**: HUD shows "LEVEL 2"

### AC-LEVEL-004: New brick layout per level
**Given**: Player is on level 3
**When**: Level starts
**Then**: Brick layout matches level 3 design (different from level 1 and 2)

---

## 9. Game Over & Restart

### AC-GAMEOVER-001: Game over screen appears when lives reach 0
**Given**: Player loses their last life
**When**: Game state changes to "game_over"
**Then**: Game over overlay appears with final score and options

### AC-GAMEOVER-002: Final score displayed on game over screen
**Given**: Player scored 12,500 and game is over
**When**: Game over screen appears
**Then**: "SCORE: 12,500" is displayed

### AC-GAMEOVER-003: Level reached displayed on game over screen
**Given**: Player reached level 5
**When**: Game over screen appears
**Then**: "LEVEL: 5" is displayed

### AC-GAMEOVER-004: "NEW HIGH SCORE" shown when applicable
**Given**: Player's score of 30,000 exceeds previous high score of 25,000
**When**: Game over screen appears
**Then**: "NEW HIGH SCORE!" badge is displayed

### AC-GAMEOVER-005: PLAY AGAIN restarts the game
**Given**: Player is on game over screen
**When**: Player clicks "PLAY AGAIN"
**Then**: Game resets to idle state with score 0, lives 3, level 1

### AC-GAMEOVER-006: LEADERBOARD button navigates to leaderboard
**Given**: Player is on game over screen
**When**: Player clicks "LEADERBOARD"
**Then**: Browser navigates to /leaderboard

---

## 10. Score Submission (API)

### AC-API-001: Score can be submitted with valid data
**Given**: Player has score 12,500 and is on game over screen
**When**: Player clicks "SUBMIT TO LEADERBOARD"
**Then**: POST request sent to /api/scores with playerId, score, level

### AC-API-002: Submit button shows loading state
**Given**: Player clicks "SUBMIT TO LEADERBOARD"
**When**: Request is in flight
**Then**: Button text changes to "SUBMITTING..." and is disabled

### AC-API-003: Submit success shows rank
**Given**: Score submission is successful with rank 42
**When**: API responds with success
**Then**: Button changes to "SUBMITTED ✓" with rank displayed

### AC-API-004: Submit failure shows error message
**Given**: Score submission fails due to network error
**When**: API responds with error
**Then**: Error message appears, retry button is shown

### AC-API-005: Score submission uses correct UUID format
**Given**: Player has UUID "550e8400-e29b-41d4-a716-446655440000" in localStorage
**When**: Score is submitted
**Then**: The playerId field in the request matches this UUID format

---

## 11. Leaderboard

### AC-LEADER-001: Leaderboard page shows top 100 scores
**Given**: There are more than 100 scores in database
**When**: Player opens /leaderboard
**Then**: Top 100 scores are displayed with rank, score, and level

### AC-LEADER-002: Player's rank is highlighted
**Given**: Player's best score is ranked #42
**When**: Leaderboard loads
**Then**: The #42 row is highlighted with "YOU" badge

### AC-LEADER-003: Player's best score is shown
**Given**: Player has a personal best of 12,500
**When**: Leaderboard loads
**Then**: "YOUR BEST: 12,500" is displayed with rank

### AC-LEADER-004: Loading state shown while fetching
**Given**: Player navigates to /leaderboard
**When**: API request is in flight
**Then**: Loading skeleton or spinner is displayed

### AC-LEADER-005: Empty state when no scores exist
**Given**: No scores have been submitted yet
**When**: Player opens /leaderboard
**Then**: Message "No scores yet — be the first!" is displayed

### AC-LEADER-006: Error state shows retry option
**Given**: Leaderboard fetch fails
**When**: API returns error
**Then**: "Failed to load leaderboard" message with retry button appears

### AC-LEADER-007: PLAY button navigates to game
**Given**: Player is on leaderboard page
**When**: Player clicks "PLAY NOW"
**Then**: Browser navigates to /game

### AC-LEADER-008: BACK button returns to landing
**Given**: Player is on leaderboard page
**When**: Player clicks "BACK"
**Then**: Browser navigates to / (landing)

---

## 12. Mobile Experience

### AC-MOBILE-001: Game playable at 375px viewport width
**Given**: Player opens game on a 375px wide device
**When**: Player plays through full game flow
**Then**: No horizontal scrolling required, all elements fit on screen

### AC-MOBILE-002: Canvas scales proportionally
**Given**: Game is on a 375px wide mobile device
**When**: Canvas renders
**Then**: Canvas width is approximately 320px (80% of viewport), maintaining 2:3 aspect ratio

### AC-MOBILE-003: Touch controls work on mobile
**Given**: Player is on a mobile device
**When**: Player touches and drags on canvas
**Then**: Paddle follows touch position smoothly

### AC-MOBILE-004: Buttons have adequate touch targets
**Given**: Player is on a mobile device
**When**: Player taps any button
**Then**: Touch target is at least 44x44px

### AC-MOBILE-005: HUD is readable on mobile
**Given**: Player is on a 375px wide device
**When**: HUD renders
**Then**: Level, score, and lives text are legible without zooming

---

## 13. Error Handling

### AC-ERROR-001: Network error shows message on score submit
**Given**: Player submits score but network is offline
**When**: API request fails
**Then**: Message "Network error. Please try again." appears

### AC-ERROR-002: Invalid score is rejected
**Given**: Score submission payload has score > 9999999
**When**: API receives request
**Then**: HTTP 400 returned with "INVALID_SCORE" error

### AC-ERROR-003: Invalid player ID format is rejected
**Given**: Score submission has malformed playerId
**When**: API receives request
**Then**: HTTP 400 returned with "INVALID_PLAYER_ID" error

### AC-ERROR-004: Page loads gracefully without localStorage
**Given**: Browser has localStorage disabled
**When**: Game page loads
**Then**: Game functions normally using ephemeral player ID (no crash)

---

## 14. High Score Persistence

### AC-HIGHSCORE-001: New high score is saved
**Given**: Player's new score of 30,000 exceeds previous high score of 25,000
**When**: Player completes a game
**Then**: localStorage highScore is updated to 30,000

### AC-HIGHSCORE-002: High score not updated if lower
**Given**: Player's previous high score is 25,000 and new score is 15,000
**When**: Game ends
**Then**: localStorage highScore remains 25,000

### AC-HIGHSCORE-003: High score displays on landing page
**Given**: localStorage has highScore = 30,000
**When**: Landing page loads
**Then**: "HIGH SCORE: 30,000" is displayed

---

## AC Summary

| AC ID | Feature | Priority | Tested |
|-------|---------|----------|--------|
| AC-ID-001 | Anonymous ID generation | Must Have | ❌ |
| AC-ID-002 | Player ID persistence | Must Have | ❌ |
| AC-ID-003 | High score persistence | Must Have | ❌ |
| AC-LANDING-001 | Game title and start button | Must Have | ❌ |
| AC-LANDING-002 | High score display | Must Have | ❌ |
| AC-LANDING-003 | No high score placeholder | Must Have | ❌ |
| AC-LANDING-004 | Controls hint | Must Have | ❌ |
| AC-LANDING-005 | START GAME navigation | Must Have | ❌ |
| AC-LANDING-006 | Leaderboard navigation | Must Have | ❌ |
| AC-ENGINE-001 | Game initializes idle | Must Have | ❌ |
| AC-ENGINE-002 | 60fps game loop | Must Have | ❌ |
| AC-ENGINE-003 | Canvas renders elements | Must Have | ❌ |
| AC-ENGINE-004 | Ball launches on SPACE | Must Have | ❌ |
| AC-ENGINE-005 | Pause on ESC/button | Must Have | ❌ |
| AC-ENGINE-006 | Resume game | Must Have | ❌ |
| AC-PADDLE-001 | Arrow key paddle movement | Must Have | ❌ |
| AC-PADDLE-002 | Arrow key release stops | Must Have | ❌ |
| AC-PADDLE-003 | Mouse paddle control | Must Have | ❌ |
| AC-PADDLE-004 | Touch paddle control | Must Have | ❌ |
| AC-PADDLE-005 | Paddle left boundary | Must Have | ❌ |
| AC-PADDLE-006 | Paddle right boundary | Must Have | ❌ |
| AC-BALL-001 | Ball bounces left wall | Must Have | ❌ |
| AC-BALL-002 | Ball bounces right wall | Must Have | ❌ |
| AC-BALL-003 | Ball bounces top wall | Must Have | ❌ |
| AC-BALL-004 | Paddle hit angle (left) | Must Have | ❌ |
| AC-BALL-005 | Paddle hit angle (center) | Must Have | ❌ |
| AC-BALL-006 | Paddle hit angle (right) | Must Have | ❌ |
| AC-BRICK-001 | Brick destruction | Must Have | ❌ |
| AC-BRICK-002 | Level 1 brick colors | Must Have | ❌ |
| AC-BRICK-003 | Level 3 brick colors | Must Have | ❌ |
| AC-BRICK-004 | Level 5+ brick colors | Must Have | ❌ |
| AC-BRICK-005 | Level brick layouts | Must Have | ❌ |
| AC-BRICK-006 | Brick bounce horizontal | Must Have | ❌ |
| AC-BRICK-007 | Brick bounce vertical | Must Have | ❌ |
| AC-SCORE-001 | Score increases on brick | Must Have | ❌ |
| AC-SCORE-002 | Score HUD updates | Must Have | ❌ |
| AC-SCORE-003 | Life lost on ball drop | Must Have | ❌ |
| AC-SCORE-004 | Game over on last life | Must Have | ❌ |
| AC-SCORE-005 | Hearts display lives | Must Have | ❌ |
| AC-LEVEL-001 | Level on brick clear | Must Have | ❌ |
| AC-LEVEL-002 | Ball speed per level | Must Have | ❌ |
| AC-LEVEL-003 | Level HUD updates | Must Have | ❌ |
| AC-LEVEL-004 | Per-level brick layouts | Must Have | ❌ |
| AC-GAMEOVER-001 | Game over screen | Must Have | ❌ |
| AC-GAMEOVER-002 | Final score display | Must Have | ❌ |
| AC-GAMEOVER-003 | Level reached display | Must Have | ❌ |
| AC-GAMEOVER-004 | New high score badge | Must Have | ❌ |
| AC-GAMEOVER-005 | Play again restart | Must Have | ❌ |
| AC-GAMEOVER-006 | Leaderboard from game over | Must Have | ❌ |
| AC-API-001 | Score submission | Must Have | ❌ |
| AC-API-002 | Submit loading state | Must Have | ❌ |
| AC-API-003 | Submit success | Must Have | ❌ |
| AC-API-004 | Submit error handling | Must Have | ❌ |
| AC-API-005 | UUID format in submit | Must Have | ❌ |
| AC-LEADER-001 | Top 100 scores | Must Have | ❌ |
| AC-LEADER-002 | Player rank highlighted | Must Have | ❌ |
| AC-LEADER-003 | Player best display | Must Have | ❌ |
| AC-LEADER-004 | Loading state | Must Have | ❌ |
| AC-LEADER-005 | Empty state | Must Have | ❌ |
| AC-LEADER-006 | Error state | Must Have | ❌ |
| AC-LEADER-007 | Play button | Must Have | ❌ |
| AC-LEADER-008 | Back button | Must Have | ❌ |
| AC-MOBILE-001 | 375px playable | Must Have | ❌ |
| AC-MOBILE-002 | Canvas scaling | Must Have | ❌ |
| AC-MOBILE-003 | Touch controls | Must Have | ❌ |
| AC-MOBILE-004 | Touch target size | Must Have | ❌ |
| AC-MOBILE-005 | HUD readability | Must Have | ❌ |
| AC-ERROR-001 | Network error message | Must Have | ❌ |
| AC-ERROR-002 | Invalid score rejected | Must Have | ❌ |
| AC-ERROR-003 | Invalid playerId rejected | Must Have | ❌ |
| AC-ERROR-004 | Graceful without localStorage | Should Have | ❌ |
| AC-HIGHSCORE-001 | New high score saved | Must Have | ❌ |
| AC-HIGHSCORE-002 | Lower score not saved | Must Have | ❌ |
| AC-HIGHSCORE-003 | High score on landing | Must Have | ❌ |

## Notes

- All ACs are derived from brainstorm.md, plan/architecture.md, plan/api-design.md, and design/screens/
- Game is single-player local — no multiplayer real-time sync required
- No authentication required — anonymous UUID-based identity
- MVP has 5 levels with increasing difficulty
