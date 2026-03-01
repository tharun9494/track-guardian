# 🚂 Railway Vibration Monitoring System

A real-time railway structural monitoring system that detects cracks and tracks vibration patterns using ESP32 sensors and Firebase backend.

## 📋 Features

### 🎯 Core Monitoring
- **Real-time Vibration Tracking**: Live sensor data from ESP32 devices
- **Automatic Crack Detection**: Alerts when vibration exceeds 500 units
- **Historical Data Visualization**: Interactive charts showing last 30 data points
- **Connection Status Monitoring**: Firebase Realtime Database connectivity indicator

### 📊 Advanced Analytics
- **Maximum Vibration Tracking**: Records highest vibration value during session
- **Event Logging System**: Automatic logging of crack detection events
- **Data Buffer Management**: Maintains 30-point rolling buffer for performance

### 🚨 Alert System
- **Visual Status Indicators**: Color-coded safety status (Safe/Danger)
- **Red Blinking Effects**: Animated alerts when crack is detected
- **Real-time Status Updates**: Instant status changes from Firebase

### 📄 Reporting
- **PDF Report Generation**: One-click downloadable monitoring reports
- **Comprehensive Event History**: Detailed log of all crack events
- **Summary Statistics**: Max vibration, event counts, timestamps

## 🏗️ Architecture

### Frontend Technology Stack
- **React 18.3.1** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast development and build tool
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/ui** - Professional UI component library

### Backend & Data
- **Firebase Realtime Database** - Real-time data synchronization
- **ESP32 Microcontroller** - Hardware sensor interface
- **Chart.js (Recharts)** - Data visualization library
- **jsPDF** - PDF generation for reports

### UI Components
- **StatusCard** - Main status display with animations
- **VibrationChart** - Real-time waveform visualization
- **InfoPanel** - Metrics dashboard (5-panel grid)
- **EventLogTable** - Crack events history table
- **PDFReportGenerator** - Report export functionality

## 📁 Project Structure

```
track-guardian/
├── src/
│   ├── components/
│   │   ├── StatusCard.tsx          # Main status display
│   │   ├── VibrationChart.tsx      # Real-time chart
│   │   ├── InfoPanel.tsx           # Metrics dashboard
│   │   ├── EventLogTable.tsx       # Event history
│   │   ├── PDFReportGenerator.tsx  # PDF export
│   │   └── ui/                     # Shadcn/ui components
│   ├── hooks/
│   │   └── useFirebaseData.ts      # Firebase data hook
│   ├── lib/
│   │   └── firebase.ts             # Firebase configuration
│   ├── pages/
│   │   └── Index.tsx               # Main dashboard page
│   ├── App.tsx                     # Root application
│   ├── main.tsx                    # Application entry
│   └── index.css                   # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Firebase project with Realtime Database
- ESP32 device with vibration sensor

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd track-guardian
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Realtime Database
   - Copy your Firebase configuration
   - Update `src/lib/firebase.ts` with your credentials

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## ⚙️ Configuration

### Firebase Setup
1. Enable Realtime Database in Firebase Console
2. Set up security rules for read/write access
3. Configure database structure:
   ```
   /vibration: number
   /status: string ("TRACK SAFE" or "CRACK DETECTED")
   ```

### ESP32 Integration
```cpp
// Example ESP32 code structure
void setup() {
  // Initialize WiFi
  // Initialize Firebase
  // Initialize vibration sensor
}

void loop() {
  // Read vibration sensor
  // Send data to Firebase
  // Check threshold (500)
  // Update status accordingly
}
```

## 📊 Data Models

### VibrationDataPoint
```typescript
interface VibrationDataPoint {
  value: number;        // Vibration reading
  time: string;         // Timestamp (HH:MM:SS)
  timestamp: number;    // Unix timestamp
}
```

### CrackEvent
```typescript
interface CrackEvent {
  id: string;           // Unique event ID
  vibration: number;    // Vibration value when detected
  dateTime: string;     // Full date and time
  status: string;        // "CRACK DETECTED"
  timestamp: number;    // Unix timestamp
}
```

### FirebaseData Hook
```typescript
interface FirebaseDataReturn {
  vibration: number;        // Current vibration value
  status: string;           // Current status
  lastUpdate: Date;         // Last data update time
  history: VibrationDataPoint[]; // Historical data (30 points)
  connected: boolean;       // Firebase connection status
  isSafe: boolean;          // Safety status boolean
  maxVibration: number;     // Maximum vibration recorded
  crackEvents: CrackEvent[]; // Array of crack events
}
```

## 🎨 UI Features

### Status Indicators
- **Green Glow**: Track safe status
- **Red Blinking**: Crack detected animation
- **Scan Line Effect**: Animated monitoring indicator

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interfaces

### Animations
- `safe-pulse`: Green pulsing for safe status
- `danger-pulse`: Red pulsing for danger status
- `red-blink`: Rapid blinking for crack detection
- `scan`: Scanning line effect

## 📈 Monitoring Thresholds

| Parameter | Safe Range | Alert Threshold |
|-----------|------------|-----------------|
| Vibration | 0-499 | > 500 |
| Status | "TRACK SAFE" | "CRACK DETECTED" |

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:watch   # Watch mode testing

# Code Quality
npm run lint         # ESLint checking
```

## 📝 API Reference

### Firebase Realtime Database Structure
```
{
  "vibration": 250,
  "status": "TRACK SAFE"
}
```

### Component Props

#### StatusCard
```typescript
interface StatusCardProps {
  status: string;
  isSafe: boolean;
}
```

#### VibrationChart
```typescript
interface VibrationChartProps {
  data: VibrationDataPoint[];
  isSafe: boolean;
}
```

#### InfoPanel
```typescript
interface InfoPanelProps {
  vibration: number;
  maxVibration: number;
  lastUpdate: Date;
  connected: boolean;
  dataPoints: number;
}
```

## 🚨 Alert System

### Visual Alerts
- **Status Card**: Changes color and animation based on status
- **Event Table**: Highlights recent crack events
- **Red Blinking**: Activates when crack detected

### Event Logging
- Automatic logging when vibration > 500
- Stores last 50 events in memory
- Includes timestamp and vibration value

## 📄 PDF Reports

Generated reports include:
- Report generation date and time
- Maximum vibration value recorded
- Total number of crack events
- Detailed event table (first 10 events)
- System information footer

## 🔒 Security Considerations

- Firebase security rules for database access
- Input validation for sensor data
- Rate limiting for data updates
- Secure API key management

## 🐛 Troubleshooting

### Common Issues
1. **Firebase Connection**: Check configuration and network
2. **Data Not Updating**: Verify ESP32 connectivity
3. **Chart Not Displaying**: Check data format and array length
4. **PDF Generation**: Ensure jsPDF is properly installed

### Debug Mode
Enable console logging in `useFirebaseData.ts` for debugging data flow.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with proper TypeScript types
4. Test thoroughly
5. Submit pull request

## 📄 License

© 2026 Railway Structural Monitoring System
Powered by ESP32 + Firebase

## 📞 Support

For technical support and questions:
- Check the troubleshooting section
- Review component documentation
- Verify Firebase configuration
- Test ESP32 connectivity

---

**Last Updated**: March 2026
**Version**: 1.0.0
**Framework**: React + TypeScript + Firebase
