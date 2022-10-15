import "leaflet/dist/leaflet.css";
import "./patients-map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useObserver } from "mobx-react";
import L from "leaflet";
import { useStores } from "../../../../../app/root.store";
import { useEffect } from "react";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const zoom = 2;

export function PatientsMap() {
  const { logsStore } = useStores();

  useEffect(() => {
    logsStore.getLogsStats();
  }, [logsStore]);

  return useObserver(() => (
    <div className="my-8">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Map</h3>
      <div className="h-96 bg-white overflow-hidden rounded-lg border-gray-200 border-2">
        <MapContainer center={[51.5, -0.09]} className="h-96" zoom={zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {logsStore.logsStats.length > 0 &&
            logsStore.logsStats.map((entry, index) => (
              <Marker
                key={`${index}`}
                position={[entry.location.lat, entry.location.long]}
                icon={icon}
              >
                <Popup>{entry.symptoms}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  ));
}
