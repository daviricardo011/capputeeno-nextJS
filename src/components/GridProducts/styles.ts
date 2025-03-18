import styled from "styled-components";

export const Container = styled.header`
  display: grid;
  grid-template-columns: repeat(auto-fit, 256px);
  column-gap: 2rem;
  row-gap: 1.5rem;
  padding-bottom: 2rem;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;
