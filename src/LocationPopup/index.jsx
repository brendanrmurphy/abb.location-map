import React from "react";
import { Popup } from "react-map-gl";
import {
  StyledPopup,
  PopupHeader,
  PopupTitle,
  PopupContent,
} from "./styled";

function LocationPopup({ className, data, view, children, ...props }) {
  console.log(data);
  return (
    <StyledPopup className={className} {...props} as={Popup}>
      <PopupHeader>
        <PopupTitle>{data.address}</PopupTitle>
      </PopupHeader>
      <PopupContent>
        <a href={data.state_resources} target="_blank" rel="noreferrer">
          State Resources
        </a>
      </PopupContent>
    </StyledPopup>
  );
}

export default LocationPopup;
