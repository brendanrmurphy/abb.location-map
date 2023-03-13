import { useState, useRef, useCallback } from "react";
import Map, {
  MapProvider,
  Source,
  Layer,
  NavigationControl,
  Marker,
} from "react-map-gl";
import { mapConfig, mapStyle, mapboxToken } from "./config";
import locations from "./data/locations";
import LocationPopup from "./LocationPopup";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./App.css";

function App() {
  const [mapViewState, setMapViewState] = useState(mapConfig);
  const [location, setLocation] = useState(null);
  const mapRef = useRef();

  const locationLayer = {
    id: "locations",
    type: "circle",
    paint: {
      "circle-radius": 4,
      "circle-color": "#ff000f",
      "circle-opacity": 1,
      "circle-stroke-width": 3,
      "circle-stroke-color": "#ff000f",
    },
  };

  const onClick = useCallback((event) => {
    const feature = event.features && event.features[0];
    if (feature) {
      setLocation(feature.properties);
      mapRef.current.flyTo({
        center: [feature.properties.longitude, feature.properties.latitude],
        duration: 1000,
      });
    }
  }, []);

  return (
    <MapProvider>
      <Map
        {...mapViewState}
        id="locationsMap"
        ref={mapRef}
        onMove={(evt) => setMapViewState(evt.viewState)}
        width="100%"
        height="100%"
        mapStyle={mapStyle}
        mapboxAccessToken={mapboxToken}
        interactiveLayerIds={["locations"]}
        onClick={onClick}
      >
        <NavigationControl showCompass={false} />
        <Source
          id="locations"
          type="geojson"
          data={{ type: "FeatureCollection", features: locations }}
        >
          <Layer {...locationLayer} />
        </Source>
        {location && (
          <LocationPopup
            anchor="bottom"
            longitude={Number(location.longitude)}
            latitude={Number(location.latitude)}
            onClose={() => setLocation(null)}
            closeOnClick={false}
            data={location}
          ></LocationPopup>
        )}
      </Map>
    </MapProvider>
  );
}

export default App;
