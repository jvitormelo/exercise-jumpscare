import { existsSync } from "fs";
import type { Category } from "./exercises";

export type Response = "done" | "skip" | "timeout";

type LogEntry = {
  timestamp: string;
  exercise: string;
  category: Category;
  response: Response;
};

const LOG_FILE = "exercise-log.json";

async function readLog(): Promise<LogEntry[]> {
  if (!existsSync(LOG_FILE)) {
    return [];
  }
  const content = await Bun.file(LOG_FILE).text();
  return JSON.parse(content);
}

async function writeLog(entries: LogEntry[]): Promise<void> {
  await Bun.write(LOG_FILE, JSON.stringify(entries, null, 2));
}

export async function logResponse(
  exercise: string,
  category: Category,
  response: Response
): Promise<void> {
  const entries = await readLog();
  entries.push({
    timestamp: new Date().toISOString(),
    exercise,
    category,
    response,
  });
  await writeLog(entries);
}

export async function getSessionStats(): Promise<{ completed: number; skipped: number }> {
  const entries = await readLog();
  const today = new Date().toISOString().split("T")[0];
  const todayEntries = entries.filter((e) => e.timestamp.startsWith(today));

  return {
    completed: todayEntries.filter((e) => e.response === "done").length,
    skipped: todayEntries.filter((e) => e.response === "skip").length,
  };
}
