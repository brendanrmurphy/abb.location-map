import styled from "styled-components";
export const StyledPopup = styled.div`
  color: #000;
  top: -10px;
  width: 275px;
  max-width: 275px !important;
  font-size: 0.875rem;
  .mapboxgl-popup-content {
    padding: 0;
  }
`;
export const PopupHeader = styled.div`
  padding: 0.75rem 1.5rem 0.5rem 0.75rem;
  background: var(--color-secondary);

  span {
    color: var(--color-primary);
  }
`;

export const PopupTitle = styled.h3`
  font-family: var(--font-primary);
  font-weight: 500;
  margin: 0;
`;

export const PopupSubtitle = styled.p`
  margin: 0;
  line-height: 1.2;
`;

export const PopupContent = styled.div`
  padding: 0 0.75rem 0.75rem 0.75rem;
  overflow-y: auto;
  color: var(--color-primary);
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    font-family: var(--font-primary);
  }

  a {
    margin-top: 10px;
    color: var(--color-accent);
    text-decoration: underline;
  }
`;
