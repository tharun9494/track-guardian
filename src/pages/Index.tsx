import { Train, Radio } from "lucide-react";
import StatusCard from "@/components/StatusCard";
import VibrationChart from "@/components/VibrationChart";
import InfoPanel from "@/components/InfoPanel";
import EventLogTable from "@/components/EventLogTable";
import PDFReportGenerator from "@/components/PDFReportGenerator";
import SoundToggle from "@/components/SoundToggle";
import { useFirebaseData } from "@/hooks/useFirebaseData";

const Index = () => {
  const { vibration, status, lastUpdate, history, connected, isSafe, maxVibration, crackEvents } = useFirebaseData();

  return (
    <div className="min-h-screen bg-background grid-bg flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Train className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                AI Railway Structural Monitoring System
              </h1>
              <p className="text-xs text-muted-foreground tracking-wide">
                Real-time crack detection & vibration analysis
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Radio className={`h-3.5 w-3.5 ${connected ? "text-safe animate-pulse" : "text-danger"}`} />
              <span>{connected ? "Connected" : "Disconnected"}</span>
            </div>
            <SoundToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Status Card */}
        <StatusCard status={status} isSafe={isSafe} />

        {/* Metrics */}
        <InfoPanel
          vibration={vibration}
          maxVibration={maxVibration}
          lastUpdate={lastUpdate}
          connected={connected}
          dataPoints={history.length}
        />

        {/* Chart */}
        <VibrationChart data={history} isSafe={isSafe} />

        {/* Event Log Table */}
        <EventLogTable events={crackEvents} />

        {/* PDF Report Generator */}
        <PDFReportGenerator
          maxVibration={maxVibration}
          crackEvents={crackEvents}
          currentDate={new Date()}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/60">
          <span>Powered by ESP32 + Firebase</span>
          <span>© 2026 Railway Structural Monitoring</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
