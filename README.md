# Exercise Jumpscare

> Because your body doesn't care about your "flow state"

You know that feeling when you've been coding for 4 hours straight, your spine has fused into a question mark, and your legs have forgotten they exist? Yeah, this app fixes that.

**Exercise Jumpscare** is a desktop terrorist that randomly interrupts your day to make you do push-ups. You're welcome.

## How It Works

1. You start the app
2. You forget about it
3. 20-40 minutes later: **BAM** - notification + sound
4. "Do some Jumping Jacks" it says
5. You click "Done" (or "Skip" if you're weak)
6. It logs your shame/glory
7. Repeat until your body thanks you (it won't, but your future self will)

## Installation

```bash
bun install
```

That's it. No 47 peer dependencies. No webpack config. Just vibes.

## Usage

```bash
bun run start
```

Then forget about it. That's the point.

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

Press `Ctrl+C` when you're done being healthy (or when your meeting starts).

## The Exercises

Your new enemies:

| Category | Exercises |
|----------|-----------|
| Cardio | Jumping Jacks, High Knees, Mountain Climbers |
| Lower Body | Bodyweight Squats, Lunges, Glute Bridges |
| Upper Body | Push-Ups, Plank Shoulder Taps |
| Core | Plank, Bicycle Crunches |

Want different exercises? Edit `src/exercises.ts`. It's just an array. You got this.

## Configuration

Edit `src/config.ts` if you want to suffer more (or less):

```typescript
export const CONFIG = {
  MIN_INTERVAL_MINUTES: 20,  // minimum peace before chaos
  MAX_INTERVAL_MINUTES: 40,  // maximum peace before chaos
  NOTIFICATION_TIMEOUT_SECONDS: 60,  // how long until it gives up on you
};
```

## Custom Sound

Drop your own `alert.wav` in the `sounds/` folder to customize your jumpscare. May I suggest:

- An air horn
- Your mom yelling your full name
- The Windows XP error sound
- Literally anything that triggers your fight-or-flight response

If you don't add one, it uses boring system sounds. Your call.

## The Log

Your exercise history is saved to `exercise-log.json`:

```json
[
  {
    "timestamp": "2026-01-31T14:32:15.000Z",
    "exercise": "Push-Ups",
    "category": "upper-body",
    "response": "done"
  },
  {
    "timestamp": "2026-01-31T15:05:42.000Z",
    "exercise": "High Knees",
    "category": "cardio",
    "response": "skip"
  }
]
```

Use this data to:
- Feel good about yourself
- Feel bad about yourself
- Build a dashboard (overengineering encouraged)
- Prove to your doctor you're "active"

## Requirements

- Linux (sorry Mac/Windows folks)
- Bun
- `notify-send` (you probably have it)
- `paplay` or `pw-play` (for sound, optional but recommended for the full jumpscare experience)

## FAQ

**Q: Can I disable the sound?**
A: Just don't put a sound file there and don't have system sounds. But then it's not really a jumpscare, is it?

**Q: What if I'm in a meeting?**
A: Click "Skip" and feel the guilt. Or better yet, unmute and do jumping jacks to assert dominance.

**Q: This is annoying.**
A: That's not a question. Also, yes. That's the point.

**Q: Can I make it run on startup?**
A: You *can*, but should you? Search your feelings.

## License

Do whatever you want. Your body is your own. Allegedly.

---

*Built with Bun, TypeScript, and the burning desire to not die at a desk.*
