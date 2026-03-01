import { AlertTriangle, Clock, Activity } from "lucide-react";

interface CrackEvent {
  id: string;
  vibration: number;
  dateTime: string;
  status: string;
  timestamp: number;
}

interface EventLogTableProps {
  events: CrackEvent[];
}

const EventLogTable = ({ events }: EventLogTableProps) => {
  // Filter events to show only those from the last 1 minute
  const oneMinuteAgo = Date.now() - 60000; // 60 seconds in milliseconds
  const recentEvents = events.filter(event => event.timestamp > oneMinuteAgo);
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Crack Event Log
          </h3>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Events with vibration &gt; 500 · Last 1 minute
          </p>
        </div>
        {recentEvents.length > 0 && (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-danger animate-pulse" />
            <span className="text-xs text-danger font-medium">
              {recentEvents.length} Events
            </span>
          </div>
        )}
      </div>

      {recentEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mb-4 opacity-20" />
          <p className="text-sm">No crack events in last minute</p>
          <p className="text-xs mt-1">Events will appear when vibration &gt; 500</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Date & Time
                </th>
                <th className="text-left py-3 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Vibration
                </th>
                <th className="text-left py-3 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((event, index) => (
                <tr
                  key={event.id}
                  className={`border-b border-border/50 ${
                    index === 0 ? "bg-danger/5 animate-pulse" : ""
                  }`}
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-mono">{event.dateTime}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Activity className="h-3.5 w-3.5 text-danger" />
                      <span className="text-sm font-mono font-bold text-danger">
                        {event.vibration}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-danger/10 text-danger border border-danger/20">
                      <AlertTriangle className="h-3 w-3.5" />
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventLogTable;
