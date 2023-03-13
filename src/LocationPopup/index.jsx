import React from "react";
import { Popup } from "react-map-gl";
import { StyledPopup, PopupHeader, PopupTitle, PopupContent } from "./styled";

function LocationPopup({ className, data, view, children, ...props }) {
  console.log(data);
  return (
    <StyledPopup className={className} {...props} as={Popup}>
      <PopupHeader>
        <PopupTitle>{`ABB ${data.businessArea}`}</PopupTitle>
      </PopupHeader>
      <PopupContent>
        <address>
          {data.address}
          <br />
          {data.address2 && (
            <>
              {data.address2}
              <br />
            </>
          )}
          {data.city}, {data.state} {data.zipcode}
        </address>
        {data.phone && <p>Phone: {data.phone}</p>}
        <a href={data.facilitySummary} target="_blank" rel="noreferrer">
          Facility Summary
        </a>
      </PopupContent>
    </StyledPopup>
  );
}

export default LocationPopup;
