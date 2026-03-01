import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
import { soundAlert } from "@/utils/soundAlert";

const SoundToggle = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    // Initialize sound state
    soundAlert.setEnabled(isSoundEnabled);
  }, [isSoundEnabled]);

  const toggleSound = () => {
    const newState = !isSoundEnabled;
    setIsSoundEnabled(newState);
    soundAlert.setEnabled(newState);
    
    // Resume audio context on first interaction
    if (newState) {
      soundAlert.resumeAudioContext();
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg border border-border bg-card/50">
      <button
        onClick={toggleSound}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-muted/80 transition-colors text-sm"
        title={isSoundEnabled ? "Disable sound alerts" : "Enable sound alerts"}
      >
        {isSoundEnabled ? (
          <Volume2 className="h-4 w-4 text-primary" />
        ) : (
          <VolumeX className="h-4 w-4 text-muted-foreground" />
        )}
        <span className={`text-xs font-medium ${isSoundEnabled ? "text-primary" : "text-muted-foreground"}`}>
          Sound {isSoundEnabled ? "On" : "Off"}
        </span>
      </button>
    </div>
  );
};

export default SoundToggle;
