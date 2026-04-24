# 🌍 Air Quality Tracker

An interactive 3D globe web application that visualizes real-time air quality data worldwide using the IQAir API.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.184-black?style=flat&logo=three.js)
![IQAir](https://img.shields.io/badge/API-IQAir-4CAF50?style=flat)

## ✨ Features

- **3D Interactive Globe** — Powered by `react-globe.gl` and Three.js. Rotate, zoom, and explore the world.
- **Real-Time Air Quality** — Fetches live AQI data from the [IQAir API](https://www.iqair.com/air-pollution-data-api).
- **Location Detection** — On load, the app requests permission to use your location and automatically shows local air quality if granted.
- **City Search** — Search any city, state, and country to pin its AQI on the globe.
- **AQI Legend** — Color-coded legend (Good → Hazardous) rendered as a glassmorphic overlay.
- **Glassmorphism UI** — Sleek dark-mode interface with frosted glass panels and smooth animations.

## 🛠️ Tech Stack

| Tool              | Purpose                     |
| ----------------- | --------------------------- |
| React 19          | UI framework                |
| react-globe.gl    | 3D globe renderer           |
| Three.js          | WebGL layer under the globe |
| Lucide React      | Icon library                |
| IQAir API         | Air quality data source     |
| CSS (Vanilla)     | Styling & animations        |
| ESLint + Prettier | Code quality                |

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- An [IQAir API key](https://www.iqair.com/air-pollution-data-api) (free tier available)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MarioArmas/air-quality-tracker.git
cd air-quality-tracker

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env   # then add your API key (see below)

# 4. Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the project root with the following:

```env
REACT_APP_IQAIR_API_KEY=your_iqair_api_key_here
```

## 📁 Project Structure

```
src/
├── components/
│   ├── GlobeMap.jsx              # 3D globe with AQI markers
│   ├── Header.jsx                # App title panel
│   ├── Legend.jsx                # AQI color legend
│   ├── LocationPermissionModal.jsx  # Location consent modal
│   ├── OverlayUI.jsx             # Main glassmorphic overlay
│   └── SearchForm.jsx            # City search form
├── services/
│   └── iqairService.js           # IQAir API integration
├── App.js                        # Root component & state
├── App.css                       # Component & layout styles
└── index.css                     # Global design tokens
```

## 🎨 AQI Color Scale

| Category                       | AQI Range | Color     |
| ------------------------------ | --------- | --------- |
| Good                           | 0 – 50    | 🟢 Green  |
| Moderate                       | 51 – 100  | 🟡 Yellow |
| Unhealthy for Sensitive Groups | 101 – 150 | 🟠 Orange |
| Unhealthy                      | 151 – 200 | 🔴 Red    |
| Very Unhealthy                 | 201 – 300 | 🟣 Purple |
| Hazardous                      | 301+      | 🟤 Maroon |

## 📜 Available Scripts

| Script           | Description                                |
| ---------------- | ------------------------------------------ |
| `npm start`      | Run development server at `localhost:3000` |
| `npm run build`  | Build optimized production bundle          |
| `npm test`       | Run test suite                             |
| `npm run lint`   | Lint source files with ESLint              |
| `npm run format` | Format source files with Prettier          |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
