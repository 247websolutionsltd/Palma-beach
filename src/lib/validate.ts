import { ADULT_AGE, categoryById, CategoryId } from "@/constants/competition";

export type RegisterValues = {
  name: string;
  email: string;
  phone: string;
  age: string;
  category: CategoryId | "";
  guardianName: string;
  guardianPhone: string;
  consent: boolean;
};

export type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

export const emptyRegister: RegisterValues = {
  name: "",
  email: "",
  phone: "",
  age: "",
  category: "",
  guardianName: "",
  guardianPhone: "",
  consent: false,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneDigits = (s: string) => s.replace(/[^\d]/g, "");
export const validPhone = (s: string) => {
  const n = phoneDigits(s).length;
  return n >= 7 && n <= 15;
};

export const isMinor = (age: string) => {
  const n = Number(age);
  return Number.isInteger(n) && n > 0 && n < ADULT_AGE;
};

export function validateRegistration(v: RegisterValues): RegisterErrors {
  const e: RegisterErrors = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!validPhone(v.phone)) e.phone = "Enter a valid phone number.";

  const age = Number(v.age);
  if (!v.age.trim() || !Number.isInteger(age) || age < 1 || age > 99) e.age = "Enter your age as a whole number.";

  if (!v.category) e.category = "Choose a category.";
  else if (!e.age) {
    const c = categoryById(v.category)!;
    if (age < c.min || age > c.max) e.category = `${c.label} is for ${c.blurb.toLowerCase()}. Pick the category that matches the age.`;
  }

  if (isMinor(v.age)) {
    if (v.guardianName.trim().length < 2) e.guardianName = "A parent or guardian's name is required under 18.";
    if (!validPhone(v.guardianPhone)) e.guardianPhone = "Enter the parent or guardian's phone number.";
  }
  if (!v.consent) e.consent = isMinor(v.age) ? "A parent or guardian must agree to take part." : "Please agree to take part.";
  return e;
}
