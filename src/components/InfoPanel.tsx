import { Activity, Clock, Wifi, WifiOff, Gauge, ThermometerSun, TrendingUp } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  highlight?: boolean;
}

const MetricCard = ({ label, value, icon, subtitle, highlight }: MetricCardProps) => (
  <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="text-muted-foreground/50">{icon}</span>
    </div>
    <p
      className={`text-2xl md:text-3xl font-bold font-mono tracking-tight ${
        highlight ? "text-primary" : "text-foreground"
      }`}
    >
      {value}
    </p>
    {subtitle && (
      <p className="text-xs text-muted-foreground/60">{subtitle}</p>
    )}
  </div>
);

interface InfoPanelProps {
  vibration: number;
  maxVibration: number;
  lastUpdate: Date;
  connected: boolean;
  dataPoints: number;
}

const InfoPanel = ({ vibration, maxVibration, lastUpdate, connected, dataPoints }: InfoPanelProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard
        label="Vibration"
        value={vibration}
        icon={<Activity className="h-4 w-4" />}
        subtitle="Current sensor reading"
        highlight
      />
      <MetricCard
        label="Max Vibration"
        value={maxVibration}
        icon={<TrendingUp className="h-4 w-4 text-primary" />}
        subtitle="Highest recorded"
      />
      <MetricCard
        label="Last Update"
        value={lastUpdate.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
        icon={<Clock className="h-4 w-4" />}
        subtitle={lastUpdate.toLocaleDateString()}
      />
      <MetricCard
        label="Connection"
        value={connected ? "Online" : "Offline"}
        icon={
          connected ? (
            <Wifi className="h-4 w-4 text-safe" />
          ) : (
            <WifiOff className="h-4 w-4 text-danger" />
          )
        }
        subtitle="Firebase Realtime DB"
      />
      <MetricCard
        label="Data Points"
        value={`${dataPoints}/30`}
        icon={<Gauge className="h-4 w-4" />}
        subtitle="Buffer capacity"
      />
    </div>
  );
};

export default InfoPanel;
