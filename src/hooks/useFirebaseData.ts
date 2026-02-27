import { useState, useEffect, useRef } from "react";
import { database, ref, onValue } from "@/lib/firebase";

interface VibrationDataPoint {
  value: number;
  time: string;
  timestamp: number;
}

export function useFirebaseData() {
  const [vibration, setVibration] = useState<number>(0);
  const [status, setStatus] = useState<string>("TRACK SAFE");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [history, setHistory] = useState<VibrationDataPoint[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const vibrationRef = ref(database, "/vibration");
    const statusRef = ref(database, "/status");

    const unsubVibration = onValue(vibrationRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) {
        const now = new Date();
        setVibration(Number(val));
        setLastUpdate(now);
        setConnected(true);
        setHistory((prev) => {
          const point: VibrationDataPoint = {
            value: Number(val),
            time: now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
            timestamp: now.getTime(),
          };
          const updated = [...prev, point];
          return updated.slice(-30);
        });
      }
    });

    const unsubStatus = onValue(statusRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) {
        setStatus(String(val));
        setConnected(true);
      }
    });

    return () => {
      unsubVibration();
      unsubStatus();
    };
  }, []);

  const isSafe = status === "TRACK SAFE";

  return { vibration, status, lastUpdate, history, connected, isSafe };
}
