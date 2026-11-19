import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";

type ThemeContextType = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const KEY = "themeMode";

export function AppThemeProvider({ children, initialTheme = "light" }: { children: ReactNode; initialTheme?: ThemeMode }) {
  const [themeMode, setMode] = useState<ThemeMode>(initialTheme);

  // Restore the saved choice (best effort; the app works fine without storage).
  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((v) => (v === "light" || v === "dark") && setMode(v))
      .catch(() => {});
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setMode(mode);
    AsyncStorage.setItem(KEY, mode).catch(() => {});
  }, []);

  const value = useMemo<ThemeContextType>(
    () => ({
      themeMode,
      setThemeMode,
      toggleThemeMode: () => setThemeMode(themeMode === "light" ? "dark" : "light"),
    }),
    [themeMode, setThemeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useAppTheme must be used inside an AppThemeProvider");
  return context;
}
