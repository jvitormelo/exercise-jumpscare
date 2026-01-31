export const PROFILES = {
  intense: { min: 10, max: 20 },
  normal: { min: 20, max: 30 },
  relaxed: { min: 30, max: 40 },
} as const;

export type ProfileName = keyof typeof PROFILES;

export const DEFAULT_PROFILE: ProfileName = "intense";
export const NOTIFICATION_TIMEOUT_SECONDS = 60;
