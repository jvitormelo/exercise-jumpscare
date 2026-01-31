import { existsSync } from "fs";
import { CONFIG } from "./config";
import type { Response } from "./logger";

const CUSTOM_SOUND = "./sounds/alert.wav";
const FALLBACK_SOUNDS = [
  "/usr/share/sounds/freedesktop/stereo/complete.oga",
  "/usr/share/sounds/freedesktop/stereo/message.oga",
  "/usr/share/sounds/freedesktop/stereo/bell.oga",
];

let soundPlayer: string | null = null;
let soundFile: string | null = null;

export async function checkDependencies(): Promise<{ hasNotifySend: boolean; hasSound: boolean }> {
  // Check notify-send
  const notifyProc = Bun.spawn(["which", "notify-send"], { stdout: "pipe", stderr: "pipe" });
  await notifyProc.exited;
  const hasNotifySend = notifyProc.exitCode === 0;

  // Check for sound player
  for (const player of ["paplay", "pw-play", "aplay"]) {
    const proc = Bun.spawn(["which", player], { stdout: "pipe", stderr: "pipe" });
    await proc.exited;
    if (proc.exitCode === 0) {
      soundPlayer = player;
      break;
    }
  }

  // Check for sound file
  if (existsSync(CUSTOM_SOUND)) {
    soundFile = CUSTOM_SOUND;
  } else {
    for (const path of FALLBACK_SOUNDS) {
      if (existsSync(path)) {
        soundFile = path;
        break;
      }
    }
  }

  const hasSound = soundPlayer !== null && soundFile !== null;
  return { hasNotifySend, hasSound };
}

export function playSound(): void {
  if (soundPlayer && soundFile) {
    Bun.spawn([soundPlayer, soundFile], { stdout: "ignore", stderr: "ignore" });
  }
}

export async function showNotification(exerciseName: string): Promise<Response> {
  playSound();

  const proc = Bun.spawn(
    [
      "notify-send",
      "Exercise Time!",
      exerciseName,
      "--action=done=Done",
      "--action=skip=Skip",
      `--wait`,
      `--expire-time=${CONFIG.NOTIFICATION_TIMEOUT_SECONDS * 1000}`,
    ],
    { stdout: "pipe", stderr: "pipe" }
  );

  const output = await new Response(proc.stdout).text();
  await proc.exited;

  const trimmed = output.trim();
  if (trimmed === "done") return "done";
  if (trimmed === "skip") return "skip";
  return "timeout";
}
