import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
