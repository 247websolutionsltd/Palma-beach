import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { cloudEnabled, db } from "../config/firebase";

export type ContactMessage = { name: string; email: string; message: string };

/** Returns "sent" when stored in the cloud, or "offline" when no cloud is configured. Throws on failure. */
export async function sendContactMessage(m: ContactMessage): Promise<"sent" | "offline"> {
  if (!cloudEnabled || !db) return "offline";
  await Promise.race([
    addDoc(collection(db, "messages"), { ...m, createdAt: serverTimestamp() }),
    new Promise((_, rej) => setTimeout(() => rej(new Error("The request timed out. Check your connection.")), 10000)),
  ]);
  return "sent";
}
