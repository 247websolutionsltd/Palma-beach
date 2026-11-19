import { CategoryId } from "@/constants/competition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export type Registration = {
  /** Human-friendly reference, also the Firestore document id. */
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  category: CategoryId;
  guardianName?: string;
  guardianPhone?: string;
  createdAt: number;
  /** true once the entry has reached the cloud database (or there is no cloud configured) */
  synced: boolean;
};

const KEY = "registrations.v1";
const CLOUD_TIMEOUT_MS = 8000;

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
export function makeReference() {
  const part = Array.from({ length: 6 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join("");
  return `PB-${part}`;
}

export async function loadRegistrations(): Promise<Registration[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as Registration[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export async function saveRegistrations(list: Registration[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

/** Resolves true on success, false when there is no cloud or the write failed / timed out. */
export async function pushRegistration(r: Registration): Promise<boolean> {
  if (!db) return true; // nothing to sync to
  try {
    const { synced: _s, ...data } = r;
    await Promise.race([
      setDoc(doc(db, "registrations", r.id), { ...data, syncedAt: serverTimestamp() }),
      new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), CLOUD_TIMEOUT_MS)),
    ]);
    return true;
  } catch (e) {
    console.warn("[registrations] cloud sync failed, will retry later", e);
    return false;
  }
}
