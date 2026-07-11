# FIFA World Cup 2026 — IST Tracker

A live match tracker for the 2026 FIFA World Cup, showing kickoff times in
India Standard Time (IST). Tracks all 104 matches from the group stage
through the Final, with live score syncing and a knockout bracket that
resolves team names automatically as results come in (group winners/
runners-up, the 8 best third-place teams, and every round up to the Final).

Runs entirely client-side — no backend, no build step.

## Quick start

The whole app is a single static HTML file. Pick whichever way you want to run it:

### 1. Just open it

Double-click [`wc2026_tracker.html`](wc2026_tracker.html), or open it directly
in a browser via `File > Open`. Works immediately, no install required.

> Live score syncing and "Add to Home Screen" / PWA install require the page
> to be served over `http://` or `https://` (browsers block those features on
> `file://`). Use one of the options below if you want those.

### 2. Serve it locally

```bash
npm install
npm run serve
```

Then open the URL it prints (defaults to `http://localhost:3000/wc2026_tracker.html`).

### 3. Run as an always-on-top desktop app (Electron)

```bash
./start-float.sh
```

This installs Electron on first run (via `npm install`) and launches a small
always-on-top window that keeps the tracker visible over other apps, with a
menu-bar/tray icon to show or quit. Equivalent to running `npm start` directly.

## Requirements

- Node.js + npm (only needed for the local server or the Electron app — not
  needed if you just open the HTML file in a browser)

## Project structure

| File | Purpose |
|---|---|
| `wc2026_tracker.html` | The entire app — fixtures data, live sync, standings/bracket logic, UI |
| `wc2026_float.html` | Redirects into the tracker's compact "float" view (`?view=float`) |
| `manifest.json` / `sw.js` | PWA manifest + service worker, for "Add to Home Screen" installs |
| `electron-main.js` | Electron entry point for the always-on-top desktop window |
| `start-float.sh` | One-command launcher for the Electron app |
| `Fifa world cup 2026 fixtures.pdf` | Official group-stage schedule used as the source of truth for fixture data |

## Data & live updates

- Group-stage fixtures (dates, kickoff times, venues) are verified against
  the official fixtures PDF in this repo.
- Scores sync automatically from public score APIs on a timer (faster while
  a match is live), and are cached in `localStorage` so the page works
  offline between syncs.
- You can also tap any completed match to manually enter or correct a score.
  For knockout matches that end level, you'll be asked who advanced on
  penalties/extra time.
- Knockout rounds (Round of 32 → Final) start out showing placeholders like
  "Winner Group A" or "Best 3rd" and automatically resolve to real team names
  as group tables and earlier rounds are decided — including the official
  FIFA table for assigning the 8 qualifying third-place teams.

## Notes

- All times are displayed in IST regardless of where you are.
- Nothing is sent to a server you control — match data lives in your
  browser's `localStorage` only.
