import { getApp, getApps, initializeApp } from "firebase/app";
import { Firestore, getFirestore, initializeFirestore } from "firebase/firestore";

// Optional cloud sync. Values come from .env (see .env.example). Expo inlines EXPO_PUBLIC_*
// at build time, so restart with `npx expo start --clear` after changing them.
const cfg = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const cloudEnabled = Boolean(cfg.apiKey && cfg.projectId && cfg.appId);

function createDb(): Firestore | null {
  if (!cloudEnabled) return null;
  const app = getApps().length ? getApp() : initializeApp(cfg);
  try {
    // Auto-detect long polling avoids hanging connections on some mobile networks / proxies.
    return initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
  } catch {
    return getFirestore(app); // already initialised (Fast Refresh)
  }
}

export const db = createDb();
