import { Activity, Shield, ShieldAlert } from "lucide-react";

interface StatusCardProps {
  status: string;
  isSafe: boolean;
}

const StatusCard = ({ status, isSafe }: StatusCardProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-8 transition-all duration-500 ${
        isSafe
          ? "border-safe/30 bg-safe/5 glow-safe glow-safe-pulse"
          : "border-danger/30 bg-danger/5 glow-danger glow-danger-pulse"
      }`}
    >
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-x-0 h-px scan-line ${
            isSafe ? "bg-safe/20" : "bg-danger/20"
          }`}
        />
      </div>

      <div className="flex flex-col items-center gap-4 relative z-10">
        <div
          className={`rounded-full p-4 ${
            isSafe ? "bg-safe/10" : "bg-danger/10"
          }`}
        >
          {isSafe ? (
            <Shield className="h-12 w-12 text-safe" />
          ) : (
            <ShieldAlert className="h-12 w-12 text-danger animate-pulse" />
          )}
        </div>

        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">
            Track Status
          </p>
          <h2
            className={`text-3xl md:text-4xl font-bold tracking-tight font-mono ${
              isSafe ? "text-safe" : "text-danger"
            }`}
          >
            {status}
          </h2>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isSafe ? "bg-safe animate-pulse" : "bg-danger animate-pulse"
            }`}
          />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {isSafe ? "System Normal" : "Alert Active"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
