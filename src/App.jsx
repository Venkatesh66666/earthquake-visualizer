import { useEffect, useState } from "react"
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

function App() {
  const [earthquakes, setEarthquakes] = useState([])
  const [minMag, setMinMag] = useState(0)
  const [timeWindow, setTimeWindow] = useState("day")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchEarthquakes = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${timeWindow}.geojson`
      const response = await fetch(url)
      const data = await response.json()
      setEarthquakes(data.features || [])
    } catch (err) {
      setError("Failed to fetch earthquake data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEarthquakes()
  }, [timeWindow])

  const getColor = (depth) => {
    if (depth > 300) return "red"
    if (depth > 100) return "orange"
    return "green"
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-3 text-center font-semibold text-lg">
        🌍 Earthquake Visualizer | Candidate ID: Naukri1025
      </header>

      <div className="p-3 flex justify-center gap-4 bg-gray-100">
        <div>
          <label className="font-medium">Minimum Magnitude: </label>
          <input
            type="number"
            value={minMag}
            min="0"
            max="10"
            step="0.1"
            onChange={(e) => setMinMag(Number(e.target.value))}
            className="border rounded p-1 w-16 text-center"
          />
        </div>
        <div>
          <label className="font-medium">Time Window: </label>
          <select
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value)}
            className="border rounded p-1"
          >
            <option value="hour">Past Hour</option>
            <option value="day">Past Day</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading data...</p>
      ) : error ? (
        <p className="text-center mt-4 text-red-500">{error}</p>
      ) : (
        <MapContainer
  center={[20, 0]}
  zoom={2}
  style={{ height: "calc(100vh - 120px)", width: "100%" }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; OpenStreetMap contributors"
  />
  {earthquakes
    .filter((eq) => eq.properties.mag >= minMag)
    .map((eq) => {
      const [lon, lat, depth] = eq.geometry.coordinates
      const mag = eq.properties.mag
      return (
        <CircleMarker
          key={eq.id}
          center={[lat, lon]}
          radius={4 + mag * 2}
          color={getColor(depth)}
          fillOpacity={0.7}
        >
          <Popup>
            <strong>{eq.properties.place}</strong>
            <br />
            Magnitude: {mag}
            <br />
            Depth: {depth} km
            <br />
            Time: {new Date(eq.properties.time).toLocaleString()}
            <br />
            <a
              href={eq.properties.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on USGS
            </a>
          </Popup>
        </CircleMarker>
      )
    })}
</MapContainer>
      )}
    </div>
  )
}

export default App
