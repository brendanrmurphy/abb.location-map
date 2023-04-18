

export const mapStyle =
  "mapbox://styles/mapbox/light-v9";

export const mapboxToken =
  "pk.eyJ1IjoiYnJlbmRhbm11cnBoeSIsImEiOiJjbGY3NXk1MDAweGJkNDNtdmswYnVyNjB1In0.ZHOLTE-zg9NJUXPOcBpmcw";

export const initialBounds = [
  [-96, 35],
  [-62, 50],
];

export const mapConfig = {
  longitude: -96,
  latitude: 35,
  zoom: 2.8,
  // maxZoom: 5,
  // center: [-96.0, 40.0],
  // padding: {top: 50, bottom: 40, left: 20, right: 20},
  bounds: initialBounds,
  // maxBounds: initialBounds,
  pitchWithRotate: false,
  dragRotate: false,
  touchZoomRotate: false,
  touchRotate: false,
  zoomAnimation: false,
  style: {
    glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  },
};
