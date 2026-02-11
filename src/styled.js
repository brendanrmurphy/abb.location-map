import styled from "styled-components";
import Select from "react-select";
import Map from "react-map-gl";

export const MapContainer = styled.div`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  > * {
    box-sizing: border-box;
  }
  .mapboxgl-canvas {
    height: inherit !important;
  }
  .mapboxgl-popup-close-button {
    padding: 0 0.5rem;
    font-size: 1.5rem;
  }
`;

export const LocationsMap = styled(Map)`
  height: calc(100vh - 4rem) !important;
  width: 100%;
`;

export const ResetButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  color: #262626;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
  border-radius: 8px;
  border: none;
  font-size: 1em;
  font-weight: 500;

  img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
`;

export const Filters = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

export const FilterLabel = styled.span`
  color: #262626;
  font-weight: 700;
  margin-right: 1rem;
  display: block;
`;

export const BusinessAreas = styled(Select)`
  flex-grow: 1;

  @media (min-width: 768px) {
    flex-grow: 1;
  }
`;
