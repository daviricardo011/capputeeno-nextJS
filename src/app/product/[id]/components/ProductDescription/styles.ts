import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 28rem;
  height: 40rem;

  @media (max-width: 1200px) {
    height: auto;
  }
`;
export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 28rem;
  margin-bottom: 3rem;
`;
export const ProductCategory = styled.span`
  font-size: 16px;
  color: #41414d;
  margin-bottom: 0.75rem;
`;
export const ProductTitle = styled.h1`
  font-weight: 300;
  font-size: 32px;
  color: #41414d;
  margin-bottom: 0.25rem;
`;
export const ProductPrice = styled.h2`
  font-weight: 600;
  font-size: 20px;
  color: #09090a;
  margin-bottom: 1.5rem;
`;
export const ProductWarning = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #41414d;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const DescriptionTitle = styled.h3`
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;
  color: #737380;
`;
export const DescriptionText = styled.p`
  font-size: 14px;
  color: #41414d;
`;
