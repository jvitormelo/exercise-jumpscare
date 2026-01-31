export type Category = "cardio" | "lower-body" | "upper-body" | "core";

export type Exercise = {
  name: string;
  category: Category;
};

export const exercises: Exercise[] = [
  // Cardio
  { name: "Jumping Jacks", category: "cardio" },
  { name: "High Knees", category: "cardio" },
  { name: "Mountain Climbers", category: "cardio" },
  // Lower Body
  { name: "Bodyweight Squats", category: "lower-body" },
  { name: "Lunges", category: "lower-body" },
  { name: "Glute Bridges", category: "lower-body" },
  // Upper Body
  { name: "Push-Ups", category: "upper-body" },
  { name: "Plank Shoulder Taps", category: "upper-body" },
  // Core
  { name: "Plank", category: "core" },
  { name: "Bicycle Crunches", category: "core" },
];

export function getRandomExercise(): Exercise {
  const index = Math.floor(Math.random() * exercises.length);
  return exercises[index];
}
