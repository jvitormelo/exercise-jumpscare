import { PROFILES, DEFAULT_PROFILE, NOTIFICATION_TIMEOUT_SECONDS, type ProfileName } from "./config";
import { getRandomExercise } from "./exercises";
import { logResponse, getSessionStats } from "./logger";
import { checkDependencies, showNotification } from "./notifier";

let running = true;
let currentTimeout: Timer | null = null;

const profileArg = process.argv[2] as ProfileName | undefined;
const profileNames = Object.keys(PROFILES) as ProfileName[];

if (profileArg && !profileNames.includes(profileArg)) {
  console.error(`Unknown profile: ${profileArg}`);
  console.error(`Available: ${profileNames.join(", ")}`);
  process.exit(1);
}

const profile = PROFILES[profileArg ?? DEFAULT_PROFILE];

function getRandomInterval(): number {
  return Math.floor(Math.random() * (profile.max - profile.min + 1) + profile.min);
}

function sleep(minutes: number): Promise<void> {
  return new Promise((resolve) => {
    currentTimeout = setTimeout(resolve, minutes * 60 * 1000);
  });
}

async function main() {
  console.log("Exercise Jumpscare started");
  console.log(`   Profile: ${profileArg ?? DEFAULT_PROFILE} (${profile.min}-${profile.max} min)`);

  const { hasNotifySend, hasSound } = await checkDependencies();

  if (!hasNotifySend) {
    console.error("Error: notify-send not found. Please install libnotify.");
    process.exit(1);
  }

  if (!hasSound) {
    console.log("   Warning: No sound player or sound file found, notifications will be silent");
  }

  console.log("   Press Ctrl+C to stop\n");

  while (running) {
    const interval = getRandomInterval();
    console.log(`Next exercise in ${interval} minutes...`);

    await sleep(interval);

    if (!running) break;

    const exercise = getRandomExercise();
    console.log(`${exercise.name} (${exercise.category})`);
    if (exercise.url) console.log(`   How to: ${exercise.url}`);
    console.log(`   Waiting for response...`);

    const response = await showNotification(exercise.name);
    await logResponse(exercise.name, exercise.category, response);

    switch (response) {
      case "done":
        console.log("Done! Logged.\n");
        break;
      case "skip":
        console.log("Skipped. Logged.\n");
        break;
      case "timeout":
        console.log("No response. Logged.\n");
        break;
    }
  }
}

async function shutdown() {
  console.log("\n");
  running = false;

  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }

  const stats = await getSessionStats();
  console.log(`Goodbye! You completed ${stats.completed} exercise${stats.completed !== 1 ? "s" : ""} today.`);
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
