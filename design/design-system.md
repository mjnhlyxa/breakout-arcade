# Breakout Arcade — Design System

## Colors

### Primary Palette
- **Background (page)**: `#0f0f23` — deep space blue-black
- **Surface (cards, panels)**: `#1a1a3e` — slightly lighter surface
- **Primary accent**: `#00d4ff` — electric cyan (neon arcade feel)
- **Secondary accent**: `#ff6b35` — warm orange (for lives, warnings)
- **Success**: `#00ff88` — neon green (new high score)
- **Error/Danger**: `#ff3366` — hot pink-red (game over)

### Game-Specific Colors
- **Canvas background**: `#0a0a1a` — near-black for contrast
- **Paddle**: `#00d4ff` — matches primary accent
- **Ball**: `#ffffff` — white with subtle glow
- **Brick colors by level**:
  - Level 1-2: `#ef4444` (red), `#f97316` (orange)
  - Level 3-4: `#eab308` (yellow), `#22c55e` (green)
  - Level 5-6: `#3b82f6` (blue), `#a855f7` (purple)
  - Level 7-8: `#ec4899` (pink), `#06b6d4` (cyan)
  - Level 9+: `#ffd700` (gold), multi-color special

### Text Colors
- **Text primary**: `#ffffff`
- **Text secondary**: `#8888aa`
- **Text on dark**: `#e0e0ff`

## Typography

- **Heading font**: `'Orbitron', sans-serif` — futuristic, arcade-appropriate
- **Body font**: `'Inter', sans-serif` — clean, readable
- **Monospace (scores, numbers)**: `'JetBrains Mono', monospace`

### Size Scale
| Name | Size | Usage |
|------|------|-------|
| xs | 12px | Badges, captions |
| sm | 14px | Secondary text |
| base | 16px | Body text |
| lg | 18px | Emphasis |
| xl | 24px | Subheadings |
| 2xl | 32px | Section titles |
| 3xl | 48px | Game title |
| 4xl | 64px | Score numbers |

## Spacing

- **Base unit**: 4px
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64, 96px

## Border Radius

| Name | Value | Usage |
|------|-------|-------|
| sm | 4px | Chips, small badges |
| md | 8px | Cards, buttons |
| lg | 12px | Modals, large cards |
| full | 9999px | Circular elements (ball) |

## Shadows

- **Card**: `0 4px 16px rgba(0, 212, 255, 0.15)`
- **Glow (neon effect)**: `0 0 20px rgba(0, 212, 255, 0.5)`
- **Button hover**: `0 0 30px rgba(0, 212, 255, 0.7)`

## Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| mobile | < 480px | Primary target for touch |
| tablet | 480–768px | Small enhancement |
| desktop | > 768px | Full experience |

## Component Tokens

### Button
- **Primary**: cyan bg, dark text, glow on hover
- **Secondary**: transparent, cyan border, cyan text
- **Ghost**: transparent, white text, subtle hover

### Card
- Dark surface background
- Subtle cyan border glow
- Rounded corners (8px)

### Badge
- Small, rounded pill shape
- Color-coded by type (lives: orange, level: cyan)

## Motion

- **Button hover**: scale 1.05, glow intensify (150ms ease)
- **Score increment**: brief pulse animation
- **Brick break**: scale down + fade out (100ms)
- **Ball**: smooth 60fps movement, no easing
- **Screen transitions**: fade (200ms)
