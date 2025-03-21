import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;
