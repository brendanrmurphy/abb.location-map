import styled from "styled-components";
export const StyledPopup = styled.div`
  color: #262626;
  top: -10px;
  width: 300px;
  max-width: 300px !important;
  font-size: 0.875rem;
  .mapboxgl-popup-content {
    padding: 0;
  }
`;
export const PopupHeader = styled.div`
  padding: 0.75rem 2.5rem 0.5rem 0.75rem;

  span {
    color: #262626;
  }
`;

export const PopupTitle = styled.div`
  font-weight: 500;
  font-size: 1rem;
  margin: 0;
`;

export const PopupSubtitle = styled.p`
  margin: 0;
  line-height: 1.2;
`;

export const PopupContent = styled.div`
  padding: 0 0.75rem 0.75rem 0.75rem;
  overflow-y: auto;
  color: #262626;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  address {
    margin: 0 0 0.5rem 0;
  }
  p {
    font-size: 0.875rem;
    margin: 0 0 0.5rem 0 !important;
  }
  a {
    color: #262626;
    text-decoration: underline;
  }
`;
