import { loadRegistrations, makeReference, pushRegistration, Registration, saveRegistrations } from "@/services/registrations";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

type NewRegistration = Omit<Registration, "id" | "createdAt" | "synced">;

type Ctx = {
  ready: boolean;
  registrations: Registration[];
  register: (r: NewRegistration) => Promise<Registration>;
};

const RegistrationContext = createContext<Ctx | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [ready, setReady] = useState(false);
  const ref = useRef<Registration[]>([]);

  const commit = useCallback(async (next: Registration[]) => {
    ref.current = next;
    setRegistrations(next);
    try {
      await saveRegistrations(next);
    } catch (e) {
      console.error("[registrations] could not save locally", e);
    }
  }, []);

  const syncOne = useCallback(
    async (r: Registration) => {
      const ok = await pushRegistration(r);
      if (ok) await commit(ref.current.map((x) => (x.id === r.id ? { ...x, synced: true } : x)));
      return ok;
    },
    [commit],
  );

  // Load saved entries, then retry any that never reached the cloud.
  useEffect(() => {
    let alive = true;
    (async () => {
      const saved = await loadRegistrations();
      if (!alive) return;
      ref.current = saved;
      setRegistrations(saved);
      setReady(true);
      for (const r of saved.filter((x) => !x.synced)) await syncOne(r);
    })();
    return () => {
      alive = false;
    };
  }, [syncOne]);

  const register = useCallback<Ctx["register"]>(
    async (input) => {
      const entry: Registration = { ...input, id: makeReference(), createdAt: Date.now(), synced: false };
      await commit([entry, ...ref.current]);
      const ok = await pushRegistration(entry);
      const final = { ...entry, synced: ok };
      if (ok) await commit(ref.current.map((x) => (x.id === entry.id ? final : x)));
      return final;
    },
    [commit],
  );

  return <RegistrationContext.Provider value={{ ready, registrations, register }}>{children}</RegistrationContext.Provider>;
}

export function useRegistrations() {
  const c = useContext(RegistrationContext);
  if (!c) throw new Error("useRegistrations must be used inside a RegistrationProvider");
  return c;
}
