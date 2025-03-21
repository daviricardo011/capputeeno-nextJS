import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 736px;

  @media (max-width: 1200px) {
    min-width: 100%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 24px;
`;

export const TotalTitle = styled.h5`
  font-weight: 300;
  font-size: 16px;
`;

export const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
