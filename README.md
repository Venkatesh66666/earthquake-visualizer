# 🌍 Earthquake Visualizer

An interactive web app that visualizes recent earthquake activity worldwide using the USGS Earthquake API.

## 🚀 Live Demo
[View Deployed App](https://earthquake-visualizer.vercel.app)

## 🧠 Overview
This application fetches live earthquake data from the USGS API and plots it on an interactive world map using **React Leaflet**. It allows users to explore global seismic patterns in real-time.

## 🧩 Tech Stack
- **Frontend:** React + Vite  
- **Styling:** Tailwind CSS  
- **Mapping Library:** React Leaflet  
- **Data Source:** [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson)  
- **Deployment:** Vercel  

## 📸 Features
- Real-time earthquake visualization on a world map  
- Clickable markers showing earthquake magnitude and location  
- Responsive design for desktop and mobile  

## ⚙️ Setup Instructions
1. Clone this repository  
   ```bash
   git clone https://github.com/Venkatesh66666/earthquake-visualizer.git
   cd earthquake-visualizer
2. Install dependencies  
   ```bash
   npm install
3. Start the development server
   ```bash
   npm run dev

Now open [http://localhost:5173](http://localhost:5173) in your browser.
3. Build for production
   ```bash
   npm run build

## Folder Structure

earthquake-visualizer/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   └── assets/
├── public/
├── package.json
├── vite.config.js
└── README.md

