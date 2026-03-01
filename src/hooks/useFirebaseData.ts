import { useState, useEffect, useRef } from "react";
import { database, ref, onValue } from "@/lib/firebase";
import { soundAlert } from "@/utils/soundAlert";

interface VibrationDataPoint {
  value: number;
  time: string;
  timestamp: number;
}

interface CrackEvent {
  id: string;
  vibration: number;
  dateTime: string;
  status: string;
  timestamp: number;
}

export function useFirebaseData() {
  const [vibration, setVibration] = useState<number>(0);
  const [status, setStatus] = useState<string>("TRACK SAFE");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [history, setHistory] = useState<VibrationDataPoint[]>([]);
  const [connected, setConnected] = useState(false);
  const [maxVibration, setMaxVibration] = useState<number>(0);
  const [crackEvents, setCrackEvents] = useState<CrackEvent[]>([]);

  useEffect(() => {
    const vibrationRef = ref(database, "/vibration");
    const statusRef = ref(database, "/status");

    const unsubVibration = onValue(vibrationRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) {
        const now = new Date();
        const vibrationValue = Number(val);
        setVibration(vibrationValue);
        setLastUpdate(now);
        setConnected(true);
        
        // Track maximum vibration
        setMaxVibration(prev => Math.max(prev, vibrationValue));
        
        // Log crack events if vibration > 500
        if (vibrationValue > 500) {
          // Play sound alert for crack detection
          soundAlert.playCrackAlert();
          
          const newEvent: CrackEvent = {
            id: `event-${now.getTime()}`,
            vibration: vibrationValue,
            dateTime: now.toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false
            }),
            status: "CRACK DETECTED",
            timestamp: now.getTime()
          };
          setCrackEvents(prev => [newEvent, ...prev].slice(0, 50)); // Keep last 50 events
        }
        
        setHistory((prev) => {
          const point: VibrationDataPoint = {
            value: vibrationValue,
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

  return { vibration, status, lastUpdate, history, connected, isSafe, maxVibration, crackEvents };
}
