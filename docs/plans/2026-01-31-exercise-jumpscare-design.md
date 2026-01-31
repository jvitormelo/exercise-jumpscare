# Exercise Jumpscare - Design Document

A Linux desktop app that reminds you to do quick exercises at random intervals.

## Overview

- **Platform**: Linux desktop (native notifications)
- **Stack**: Bun + TypeScript
- **Notifications**: `notify-send` with Done/Skip actions + `paplay` for sound
- **Interval**: Random between configurable min/max (default 20-40 minutes)
- **Logging**: Tracks responses (done/skip/timeout) to JSON file

## Project Structure

```
exercise-jumpscare/
├── src/
│   ├── index.ts          # Entry point, main loop
│   ├── exercises.ts      # Hardcoded exercise list
│   ├── notifier.ts       # notify-send + paplay wrapper
│   ├── logger.ts         # Writes Done/Skip responses to file
│   └── config.ts         # Interval range constants
├── sounds/
│   └── alert.wav         # Notification sound (optional, falls back to system sound)
├── exercise-log.json     # Created at runtime, logs responses
├── package.json
└── tsconfig.json
```

## Exercise List

```typescript
type Exercise = {
  name: string;
  category: "cardio" | "lower-body" | "upper-body" | "core";
};
```

### Cardio
- Jumping Jacks
- High Knees
- Mountain Climbers

### Lower Body
- Bodyweight Squats
- Lunges
- Glute Bridges

### Upper Body
- Push-Ups
- Plank Shoulder Taps

### Core
- Plank
- Bicycle Crunches

## Configuration

Constants in `config.ts`:

| Constant | Default | Description |
|----------|---------|-------------|
| `MIN_INTERVAL_MINUTES` | 20 | Minimum wait between notifications |
| `MAX_INTERVAL_MINUTES` | 40 | Maximum wait between notifications |
| `NOTIFICATION_TIMEOUT_SECONDS` | 60 | Auto-dismiss after this duration |

## Main Loop

1. Pick random delay between `MIN_INTERVAL` and `MAX_INTERVAL`
2. Sleep for that duration
3. Pick random exercise from list
4. Play sound + show notification with Done/Skip actions
5. Wait for user response (with timeout)
6. Log response to `exercise-log.json`
7. Repeat

## Notification Flow

```bash
# Play sound (non-blocking)
paplay ./sounds/alert.wav &

# Show notification with actions, wait for response
notify-send "Exercise Time!" "Do Push-Ups" \
  --action="done=Done" \
  --action="skip=Skip" \
  --wait
# Returns "done" or "skip" on stdout, or empty if dismissed/timed out
```

## Log File Format

`exercise-log.json`:

```json
[
  {
    "timestamp": "2026-01-31T14:32:15.000Z",
    "exercise": "Push-Ups",
    "category": "upper-body",
    "response": "done"
  }
]
```

Response values: `"done"`, `"skip"`, `"timeout"`

## Terminal Output

```
Exercise Jumpscare started
   Interval: 20-40 minutes
   Press Ctrl+C to stop

Next exercise in 27 minutes...
Push-Ups (upper-body) - waiting for response...
Done! Logged.

Next exercise in 34 minutes...
^C
Goodbye! You completed 1 exercise today.
```

## Startup Checks

Before entering main loop:

1. Verify `notify-send` exists and supports `--action` flag
2. Check for `paplay` (PulseAudio) or `pw-play` (PipeWire)
3. Warn if sound player not found (continue without sound)

## Sound

- Primary: `./sounds/alert.wav` (user-provided)
- Fallback: `/usr/share/sounds/freedesktop/stereo/complete.oga`
- If neither exists: silent notifications with warning

## Graceful Shutdown

On `SIGINT` (Ctrl+C):
- Cancel pending timer
- Print session summary (exercises completed)
- Exit cleanly
