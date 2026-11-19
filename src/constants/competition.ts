import { IconName } from "@/lib/icons";

/**
 * Competition facts shown in the app. The website doesn't publish these yet, so they are
 * `null` and the app shows "To be announced". Fill them in here and every screen updates.
 */
export const Competition = {
  name: "Palmabeach Swimming Competition",
  date: null as string | null, // e.g. "Sat, 13 Dec 2026"
  venue: null as string | null, // e.g. "Palmabeach Resort Pool"
  fee: null as string | null, // e.g. "₦5,000"
  deadline: null as string | null, // e.g. "Fri, 5 Dec 2026"
};

export const TBA = "To be announced";

export type CategoryId = "kids" | "teens" | "adults";

export type SwimCategory = {
  id: CategoryId;
  label: string;
  blurb: string;
  min: number;
  max: number;
  icon: IconName;
};

/** Age bands are a sensible default for "kids, teens and adults". Adjust to your rules. */
export const CATEGORIES: SwimCategory[] = [
  { id: "kids", label: "Kids", blurb: "Ages 6 to 12", min: 6, max: 12, icon: "happy-outline" },
  { id: "teens", label: "Teens", blurb: "Ages 13 to 17", min: 13, max: 17, icon: "fitness-outline" },
  { id: "adults", label: "Adults", blurb: "Ages 18 and over", min: 18, max: 99, icon: "trophy-outline" },
];

export const categoryById = (id: string) => CATEGORIES.find((c) => c.id === id);
export const categoryForAge = (age: number) => CATEGORIES.find((c) => age >= c.min && age <= c.max);

export const ADULT_AGE = 18;

export const HIGHLIGHTS: { icon: IconName; title: string; text: string }[] = [
  { icon: "people-outline", title: "All Age Categories", text: "Competitions for kids, teens, and adults." },
  { icon: "trophy-outline", title: "Exciting Prizes", text: "Win medals, trophies, and gifts." },
  { icon: "calendar-outline", title: "Scheduled Events", text: "Well-organized competitions all year." },
];
