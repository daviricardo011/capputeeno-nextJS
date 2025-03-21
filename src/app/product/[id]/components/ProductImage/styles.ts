import styled from "styled-components";

export const ImageContainer = styled.div`
  width: 40rem;
  height: 36.25rem;
  position: relative;

  @media (max-width: 1200px) {
    height: auto;
  }
  @media (max-width: 768px) {
    width: 16rem;
  }
`;
