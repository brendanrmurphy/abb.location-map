

export const mapStyle =
  "mapbox://styles/mapbox/light-v9";

export const mapboxToken =
  "pk.eyJ1IjoiYnJlbmRhbm11cnBoeSIsImEiOiJjbGY3NXk1MDAweGJkNDNtdmswYnVyNjB1In0.ZHOLTE-zg9NJUXPOcBpmcw";

export const initialBounds = [
  [-132, 24],
  [-62, 51],
];

export const mapConfig = {
  longitude: -96,
  latitude: 40,
  zoom: 3.5,
  maxZoom: 5,
  center: [-97.0, 38.0],
  padding: {top: 50, bottom: 40, left: 20, right: 20},
  initialBounds,
  maxBounds: [
    [-200, -20], //Southwest
    [-28, 78], //Northeast
  ],
  pitchWithRotate: false,
  dragRotate: false,
  touchZoomRotate: false,
  touchRotate: false,
  zoomAnimation: false,
  style: {
    glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  },
};
