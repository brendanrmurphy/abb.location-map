import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import Map, {
  MapProvider,
  Source,
  Layer,
  NavigationControl,
  Marker,
} from "react-map-gl";
import Select from "react-select";
import { mapConfig, mapStyle, mapboxToken, initialBounds } from "./config";
import locationsData from "./data/locations";
import LocationPopup from "./LocationPopup";
import Pin from "./Pin";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const [mapViewState, setMapViewState] = useState(mapConfig);
  const [location, setLocation] = useState(null);
  const [filters, setFilters] = useState({
    businessAreas: [],
  });
  const [pins, setPins] = useState([]);
  const mapRef = useRef();

  const selectStyles = {
    valueContainer: (styles) => ({
      ...styles,
      paddingLeft: "0.25rem"
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: "#000",
        ":hover": {
          ...styles[":hover"],
          color: "#fff",
          backgroundColor: "#ff000f"
        },
      };
    },
    multiValue: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#ff000f" : null,
        color: "#fff",
        backgroundColor: "#ff000f",
        borderRadius: 4,
      };
    },
    multiValueLabel: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: "#fff",
        fontSize: "0.875rem",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        backgroundColor: "#0f0f0f",
        borderRadius: "0.25rem 0 0 0.25rem"
      };
    },
    multiValueRemove:(styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: "#0f0f0f",
        color: "#fff",
        borderRadius: " 0 0.25rem 0.25rem 0",
        color: '#fff',
        backgroundColor: "#ff000f",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        ":hover": {
          ...styles[":hover"],
          color: '#fff',
          backgroundColor: "#ff000f"
        },
      };
    },
  };

  const businessAreas = [
    ...new Set(locationsData.map((item) => item.properties.businessArea)),
  ]
    .map((x) => {
      return {
        label: x,
        value: x,
      };
    })
    .sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });

  const buildPins = (locations) =>
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
    });

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

  const handleFilters = (options) => {
    if(!Array.isArray(options)){
      options = [options];
    }
    const businessAreas = options.map((x) => x.value);
    setFilters({
      ...filters,
      businessAreas,
    });
  };

  const handleMapReset = () => {
    setMapViewState(mapConfig);
  };

  useEffect(() => {
    let filteredLocations;
    if (filters?.businessAreas.length > 0) {
      filteredLocations = locationsData.filter((x) => {
        return filters.businessAreas.includes(x.properties.businessArea);
      });
    } else {
      filteredLocations = locationsData;
    }
    setPins(buildPins(filteredLocations));
  }, [filters]);

  return (
    <div className="map-container">
      <button className="reset-button" onClick={handleMapReset}><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTIwMHB0IiBoZWlnaHQ9IjEyMDBwdCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPGc+CiAgPHBhdGggZD0ibTc0Ny42IDYwMGMwIDgxLjUxNi02Ni4wODYgMTQ3LjYtMTQ3LjYgMTQ3LjZzLTE0Ny42LTY2LjA4Ni0xNDcuNi0xNDcuNiA2Ni4wODYtMTQ3LjYgMTQ3LjYtMTQ3LjYgMTQ3LjYgNjYuMDg2IDE0Ny42IDE0Ny42Ii8+CiAgPHBhdGggZD0ibTEwNC40IDQ3NGM0MC44MDEgMCA3NC4zOTgtMzMuNjAyIDc0LjM5OC03NC4zOThsMC4wMDM5MDYtMjIwLjhoMjIyYzQwLjgwMSAwIDc0LjM5OC0zMy42MDIgNzQuMzk4LTc0LjM5OCAwLTQwLjgwMS0zMy42MDItNzQuMzk4LTc0LjM5OC03NC4zOThsLTI5Ni40LTAuMDAzOTA2Yy00MC44MDEgMC03NC4zOTggMzMuNjAyLTc0LjM5OCA3NC4zOTh2Mjk2LjRjMCA0MC44MDUgMzMuNjAyIDczLjIwMyA3NC4zOTggNzMuMjAzeiIvPgogIDxwYXRoIGQ9Im0xMDk1LjYgNzI2Yy00MC44MDEgMC03NC4zOTggMzMuNjAyLTc0LjM5OCA3NC4zOTh2MjIyaC0yMjJjLTQwLjgwMSAwLTc0LjM5OCAzMy42MDItNzQuMzk4IDc0LjM5OCAwIDQwLjgwMSAzMy42MDIgNzQuMzk4IDc0LjM5OCA3NC4zOThoMjk2LjRjNDAuODAxIDAgNzQuMzk4LTMzLjYwMiA3NC4zOTgtNzQuMzk4bDAuMDAzOTA2LTI5Ny42YzAtNDAuODAxLTMzLjYwMi03My4xOTktNzQuMzk4LTczLjE5OXoiLz4KICA8cGF0aCBkPSJtNDAwLjggMTAyMS4yaC0yMjJ2LTIyMmMwLTQwLjgwMS0zMy42MDItNzQuMzk4LTc0LjM5OC03NC4zOTgtNDAuODAxIDAtNzQuMzk4IDMzLjYwMi03NC4zOTggNzQuMzk4djI5Ni40YzAgNDAuODAxIDMzLjYwMiA3NC4zOTggNzQuMzk4IDc0LjM5OGgyOTYuNGM0MC44MDEgMCA3NC4zOTgtMzMuNjAyIDc0LjM5OC03NC4zOTgtMS4xOTkyLTQwLjc5Ny0zMy41OTgtNzQuMzk4LTc0LjM5OC03NC4zOTh6Ii8+CiAgPHBhdGggZD0ibTEwOTUuNiAzMGgtMjk2LjRjLTQwLjgwMSAwLTc0LjM5OCAzMy42MDItNzQuMzk4IDc0LjM5OCAwIDQwLjgwMSAzMy42MDIgNzQuMzk4IDc0LjM5OCA3NC4zOThoMjIydjIyMmMwIDQwLjgwMSAzMy42MDIgNzQuMzk4IDc0LjM5OCA3NC4zOTggNDAuODAxIDAgNzQuMzk4LTMzLjYwMiA3NC4zOTgtNzQuMzk4bDAuMDAzOTA2LTI5Ni40YzAtNDAuNzk3LTMzLjYwMi03NC4zOTgtNzQuMzk4LTc0LjM5OHoiLz4KIDwvZz4KPC9zdmc+Cg==" />Re-center</button>
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
        >
          <NavigationControl showCompass={false} />
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
        <div className="filters">
          <span className="filter-label">Business Area</span>
          <Select
            className="business-areas"
            // isSearchable
            isMulti
            styles={selectStyles}
            options={businessAreas}
            onChange={handleFilters}
            menuPlacement="top"
            isClearable={true}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#eee',
                primary50: '#efefef',
                primary: '#ff000f',
              },
            })}
            // controlShouldRenderValue = { false }
            // components={{
            //   MultiValueContainer: multiValueContainer,
            //   // Option: CustomOption,
            // }}
          />
        </div>
      </MapProvider>
    </div>
  );
}

export default App;
