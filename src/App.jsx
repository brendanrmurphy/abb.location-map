import { useState, useRef, useCallback, useMemo } from "react";
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
import Pin from "./Pin";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./App.css";

function App() {
  const [mapViewState, setMapViewState] = useState(mapConfig);
  const [location, setLocation] = useState(null);
  const mapRef = useRef();

  const pins = useMemo(
    () =>
      locations.map((location, index) => {
          return (
            <Marker
              key={`marker-${index}`}
              longitude={location.properties.longitude}
              latitude={location.properties.latitude}
              anchor="bottom"
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                onClick(location);
              }}
            >
              <Pin />
            </Marker>
          );
        
      }),
    []
  );

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

  const onClick = useCallback((location) => {
    const feature = event.features && event.features[0];
    if (location) {
      setLocation(location.properties);
      mapRef.current.flyTo({
        center: [location.properties.longitude, location.properties.latitude],
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
        // onClick={onClick}
      >
        <NavigationControl showCompass={false} />
        {/* <Source
          id="locations"
          type="geojson"
          data={{ type: "FeatureCollection", features: locations }}
        >
          <Layer {...locationLayer} />
        </Source> */}
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
        {pins}
      </Map>
    </MapProvider>
  );
}

export default App;
