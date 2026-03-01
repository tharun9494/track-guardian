class SoundAlert {
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor() {
    // Initialize audio context on user interaction
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  playCrackAlert() {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      // Create a simple alert sound using Web Audio API
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Create an alert tone sequence
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime); // High frequency
      oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime + 0.1); // Lower frequency
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.2); // Back to high

      // Set volume envelope
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  getEnabled(): boolean {
    return this.isEnabled;
  }

  // Resume audio context if suspended (required by some browsers)
  resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

export const soundAlert = new SoundAlert();
