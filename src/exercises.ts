export type Category = "cardio" | "lower-body" | "upper-body" | "core";

export type Exercise = {
  name: string;
  category: Category;
  url?: string;
};

export const exercises: Exercise[] = [
  // Cardio
  { name: "Jumping Jacks", category: "cardio", url: "https://www.youtube.com/watch?v=D8xo_I_TVhk" },
  { name: "High Knees", category: "cardio", url: "https://www.youtube.com/watch?v=tx5rgpDAJRI" },
  { name: "Mountain Climbers", category: "cardio", url: "https://www.youtube.com/watch?v=wQq3ybaLZeA" },
  // Lower Body
  { name: "Bodyweight Squats", category: "lower-body", url: "https://www.youtube.com/watch?v=l83R5PblSMA" },
  { name: "Lunges", category: "lower-body", url: "https://www.youtube.com/shorts/zriYMBKtgbI" },
  { name: "Glute Bridges", category: "lower-body", url: "https://www.youtube.com/watch?v=PhTDzR0TpZs" },
  // Upper Body
  { name: "Push-Ups", category: "upper-body", url: "https://www.youtube.com/watch?v=IODxDxX7oi4" },
  { name: "Plank Shoulder Taps", category: "upper-body", url: "https://www.youtube.com/watch?v=LEZq7QZ8ySQ" },
  { name: "Katana Slashes", category: "upper-body" },
  // Core
  { name: "Plank", category: "core", url: "https://www.youtube.com/watch?v=pvIjsG5Svck" },
  { name: "Bicycle Crunches", category: "core", url: "https://www.youtube.com/watch?v=9FGilxCbdz8" },
];

export function getRandomExercise(): Exercise {
  const index = Math.floor(Math.random() * exercises.length);
  return exercises[index];
}
